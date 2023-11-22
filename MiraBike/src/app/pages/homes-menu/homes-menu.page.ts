import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js/auto';
import type { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homes-menu',
  templateUrl: './homes-menu.page.html',
  styleUrls: ['./homes-menu.page.scss'],
})
export class HomesMenuPage implements OnInit {
  //public barChart: Chart;
  //public doughnutChart: Chart;
  //datosVentas: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  private dataSubscription: Subscription;

  ngOnInit(): void {
    //this.obtenerDatosVentas();
  }

  /*ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.barChart) {
      // Destruye el gráfico solo si se ha completado
      if (this.barChart.ctx) {
        this.barChart.destroy();
      }
    }

    if (this.doughnutChart) {
      // Destruye el gráfico solo si se ha completado
      if (this.doughnutChart.ctx) {
        this.doughnutChart.destroy();
      }
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

  calcularTotalUltimosMeses(): number[] {
    const totalUltimosMeses = Array(6).fill(0);
    const fechaActual = new Date();

    for (let i = 0; i < 6; i++) {
      const mesActual = fechaActual.getMonth() - i;
      const ventasMes = this.datosVentas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha);
        return fechaVenta.getMonth() === mesActual;
      });

      totalUltimosMeses[5 - i] = ventasMes.reduce((total, venta) => total + venta.total, 0);
    }

    return totalUltimosMeses;
  }

  obtenerNombresUltimosMeses(): string[] {
    const fechaActual = new Date();
    const nombresUltimosMeses: string[] = [];

    for (let i = 5; i >= 0; i--) {
      const mesActual = fechaActual.getMonth() - i;
      const nombreMes = this.obtenerNombreMes(mesActual);
      nombresUltimosMeses.push(nombreMes);
    }

    return nombresUltimosMeses;
  }

  obtenerNombreMes(mes: number): string {
    const nombresMeses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return nombresMeses[mes];
  }

  inicializarGraficoBarras() {
    // Esperar un breve momento antes de crear el gráfico
    setTimeout(() => {
      if (this.barChart) {
        this.barChart.destroy();
      }

      const data: ChartDataset[] = [
        {
          label: 'Total de ventas últimos 6 meses',
          data: this.calcularTotalUltimosMeses(),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ];

      const options: ChartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: this.obtenerNombresUltimosMeses(),
          datasets: data,
        },
        options: options,
      });
    }, 100);
  }

  inicializarGraficoTorta() {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    const porcentajes = this.calcularPorcentajeTipoServicio();
    const data: ChartDataset[] = [
      {
        data: porcentajes,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1,
      },
    ];

    const options: ChartOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    };

    this.doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: this.obtenerLabelsConPorcentaje(porcentajes),
        datasets: data,
      },
      options: options,
    });
  }

  calcularPorcentajeTipoServicio(): number[] {
    const talleres = this.datosVentas.filter((venta) => venta.tipo_servicio === 'TALLER').length;
    const productos = this.datosVentas.filter((venta) => venta.tipo_servicio === 'PRODUCTOS').length;
    const total = this.datosVentas.length;

    return [(talleres / total) * 100, (productos / total) * 100];
  }

  obtenerLabelsConPorcentaje(porcentajes: number[]): string[] {
    return porcentajes.map((porcentaje, index) => {
      const tipoServicio = index === 0 ? 'TALLER' : 'PRODUCTO';
      return `${tipoServicio} (${porcentaje.toFixed(2)}%)`;
    });
  }*/

  cerrarSesion() {
    this.router.navigate(['/the-login']);
  }
}



