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
  nombresMeses: string[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  anios: number[] = [2022,2023, 2024, 2025]; 
  mesSeleccionado: string;
  anioSeleccionado: number = 2023; 
  productosMasVendidos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosVentas();
    this.nombresMeses = this.obtenerNombresMeses();
  }

  //Obtiene los datos desde la api de venta
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

  //Calcula los ultimos 10 meses antes de la fecha de ahora
  calcularTotalUltimosMeses(): number[] {
    const totalUltimosMeses = Array(10).fill(0);
    const fechaActual = new Date();

    for (let i = 0; i < 10; i++) {
      const mesActual = fechaActual.getMonth() - i;
      const ventasMes = this.datosVentas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha);
        return fechaVenta.getMonth() === mesActual && fechaVenta.getFullYear() === this.anioSeleccionado;
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

  obtenerNombresMeses(): string[] {
    return [
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
  }


  inicializarGraficoBarras() {
    // Verifica si ya existe un gráfico y lo destuye , esto esta porsiacaso , ya que antes usaba más graficos en distintas page
    if (this.barChart) {
      this.barChart.destroy();
    }

    // Borra el contenido del elemento canvas
    const canvas = <HTMLCanvasElement>document.getElementById('barChart');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const data: ChartDataset[] = [
      {
        label: `Total de ventas últimos 10 meses`,
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

    // Crea un nuevo gráfico después de destruir el existente , esto esta porsiacaso , ya que antes usaba más graficos en distintas page
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.obtenerNombresUltimosMeses(),
        datasets: data,
      },
      options: options,
    });
  }

  seleccionarMes(event: any) {
    // Captura el mes seleccionado desde el evento
    this.mesSeleccionado = event.detail.value;

    // Filtra los productos por el mes y año seleccionados
    const productosMes = this.datosVentas
      .filter((venta) => {
        const fechaVenta = new Date(venta.fecha);
        return (
          fechaVenta.getMonth() === this.nombresMeses.indexOf(this.mesSeleccionado) &&
          fechaVenta.getFullYear() === this.anioSeleccionado
        );
      })
      .map((venta) => venta.nombre_producto);

    // Calcula el conteo de cada producto
    const conteoProductos = productosMes.reduce((conteo, producto) => {
      conteo[producto] = (conteo[producto] || 0) + 1;
      return conteo;
    }, {});

    // Ordena los productos por cantidad vendida de mayor a menor
    this.productosMasVendidos = Object.keys(conteoProductos)
      .map((producto) => ({ nombre: producto, cantidad: conteoProductos[producto] }))
      .sort((a, b) => b.cantidad - a.cantidad);

    // Muestra el Top 3 de productos o un mensaje si no hay productos
    if (this.productosMasVendidos.length > 0) {
      console.log(`Top 3 de productos más vendidos en ${this.mesSeleccionado} (${this.anioSeleccionado}):`);
      console.log(this.productosMasVendidos.slice(0, 3));
    } else {
      console.log(`No se encontraron productos vendidos en ${this.mesSeleccionado} (${this.anioSeleccionado}).`);
    }
  }

  seleccionarAnio(event: any) {
    // Captura el año seleccionado desde el evento
    this.anioSeleccionado = event.detail.value;

    // Actualiza el gráfico de barras con los datos del nuevo año seleccionado
    this.inicializarGraficoBarras();
  }
}









