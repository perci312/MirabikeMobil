import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import type { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.page.html',
  styleUrls: ['./historial-ventas.page.scss'],
})
export class HistorialVentasPage implements OnInit {
  public barChart: Chart;
  datosVentas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosVentas();
  }

  ngOnDestroy(): void {
    if (this.barChart) {
      this.barChart.destroy();
    }
  }

  obtenerDatosVentas() {
    const apiUrl = 'https://utgtbwb3r5.execute-api.us-east-2.amazonaws.com/venta';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);

        if (Array.isArray(responseBody)) {
          this.datosVentas = responseBody;
          console.log(this.datosVentas);
          this.inicializarGraficoBarras();
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
    const totalUltimosMeses = Array(10).fill(0);
    const fechaActual = new Date();

    for (let i = 0; i < 10; i++) {
      const mesActual = fechaActual.getMonth() - i;
      const ventasMes = this.datosVentas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha);
        return fechaVenta.getMonth() === mesActual;
      });

      totalUltimosMeses[9 - i] = ventasMes.reduce((total, venta) => total + venta.total, 0);
    }

    return totalUltimosMeses;
  }

  obtenerNombresUltimosMeses(): string[] {
    const fechaActual = new Date();
    const nombresUltimosMeses: string[] = [];

    for (let i = 9; i >= 0; i--) {
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
    // Verifica si ya existe un gráfico y destrúyelo
    if (this.barChart) {
      this.barChart.destroy();
    }
  
    // Borra el contenido del elemento canvas
    const canvas = <HTMLCanvasElement>document.getElementById('barChart');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const data: ChartDataset[] = [
      {
        label: 'Total de ventas últimos 10 meses',
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
  
    // Crea un nuevo gráfico después de destruir el existente
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.obtenerNombresUltimosMeses(),
        datasets: data,
      },
      options: options,
    });
  }
}






