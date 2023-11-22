import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import type { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar_chart.component.html',
  styleUrls: ['./bar_chart.component.css']
})
export class Bar_chartComponent implements OnInit {
  public barChart: Chart;
  public doughnutChart: Chart;
  datosVentas: any[] = [];

  constructor(private http: HttpClient) {}

  private dataSubscription: Subscription;

  ngOnInit(): void {
    this.obtenerDatosVentas();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.barChart) {
      this.barChart.destroy();
    }

    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }
  }

  obtenerDatosVentas() {
    const apiUrl = 'https://utgtbwb3r5.execute-api.us-east-2.amazonaws.com/venta';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosVentas = responseBody;
          this.inicializarGraficoBarras();
          this.inicializarGraficoTorta();
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de ventas:', error);
      }
    );
  }

  inicializarGraficoBarras() {

    if (this.barChart) {
      this.barChart.destroy();
    }

    const data: ChartDataset[] = [{
      label: 'Total de ventas por mes',
      data: this.calcularTotalPorMes(),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }];

    const options: ChartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.obtenerNombresMeses(),
        datasets: data
      },
      options: options
    });
  }

  inicializarGraficoTorta() {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    const porcentajes = this.calcularPorcentajeTipoServicio();
    const data: ChartDataset[] = [{
      data: porcentajes,
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
      borderWidth: 1
    }];

    const options: ChartOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    };

    this.doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: this.obtenerLabelsConPorcentaje(porcentajes),
        datasets: data
      },
      options: options
    });
  }

  calcularTotalPorMes(): number[] {
    const totalPorMes = Array(12).fill(0);

    this.datosVentas.forEach((venta) => {
      const fecha = new Date(venta.fecha);
      const mes = fecha.getMonth();
      totalPorMes[mes] += venta.total;
    });

    return totalPorMes;
  }

  calcularPorcentajeTipoServicio(): number[] {
    const talleres = this.datosVentas.filter((venta) => venta.tipo_servicio === 'TALLER').length;
    const productos = this.datosVentas.filter((venta) => venta.tipo_servicio === 'PRODUCTOS').length;
    const total = this.datosVentas.length;

    return [(talleres / total) * 100, (productos / total) * 100];
  }

  obtenerNombresMeses(): string[] {
    return [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  }

  obtenerLabelsConPorcentaje(porcentajes: number[]): string[] {
    return porcentajes.map((porcentaje, index) => {
      const tipoServicio = index === 0 ? 'TALLER' : 'PRODUCTO';
      return `${tipoServicio} (${porcentaje.toFixed(2)}%)`;
    });
  }
}










