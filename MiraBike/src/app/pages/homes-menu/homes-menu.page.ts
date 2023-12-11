import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homes-menu',
  templateUrl: './homes-menu.page.html',
  styleUrls: ['./homes-menu.page.scss'],
})
export class HomesMenuPage implements OnInit {
  totalClientes: number = 0;
  totalProductos: number = 0;
  productosPorVencer: number = 0;
  cantidadVentasMesActual: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  private dataSubscription: Subscription;

  ngOnInit(): void {
    this.obtenerDatosAppCliente();
    this.obtenerDatosAppPersona();
    this.obtenerProductosPorVencer();
    this.obtenerCantidadVentasMesActual();
  }

  //Obtener datos de la api cliente
  obtenerDatosAppCliente() {
    const apiUrlClientes = 'https://tnlkxyinql.execute-api.us-east-2.amazonaws.com/cliente';

    this.http.get(apiUrlClientes).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.totalClientes = responseBody.length;
        } else {
          console.error('Error: Los datos de clientes no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de app_cliente:', error);
      }
    );
  }

  //Obtener datos de la api producto
  obtenerDatosAppPersona() {
    const apiUrlProductos = 'https://0pekvv5h38.execute-api.us-east-2.amazonaws.com/producto';

    this.http.get(apiUrlProductos).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.totalProductos = responseBody.length;
        } else {
          console.error('Error: Los datos de productos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de app_producto:', error);
      }
    );
  }

  //Obtener datos de la api de producto y calcular si el stock es mayor a 6 contai como "por vencer"
  obtenerProductosPorVencer() {
    const apiUrlProductos = 'https://0pekvv5h38.execute-api.us-east-2.amazonaws.com/producto';

    this.http.get(apiUrlProductos).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          const productosPorVencer = responseBody.filter((producto) => producto.stock < 6);
          this.productosPorVencer = productosPorVencer.length;
        } else {
          console.error('Error: Los datos de productos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener productos por vencer:', error);
      }
    );
  }

  // Obtener datos de la api venta y calcula la cantidad de ventas en mes actual usando el atributo fecha
  obtenerCantidadVentasMesActual() {
    const apiUrlVentas = 'https://utgtbwb3r5.execute-api.us-east-2.amazonaws.com/venta';

    this.http.get(apiUrlVentas).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          // Filtrar las ventas del mes actual
          const ventasMesActual = responseBody.filter((venta) => {
            const fechaVenta = new Date(venta.fecha);
            const fechaActual = new Date();
            return fechaVenta.getMonth() === fechaActual.getMonth() && fechaVenta.getFullYear() === fechaActual.getFullYear();
          });

          this.cantidadVentasMesActual = ventasMesActual.length;
        } else {
          console.error('Error: Los datos de ventas no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener cantidad de ventas del mes actual:', error);
      }
    );
  }

  //Botón para cerrar sesion 
  cerrarSesion() {
    this.router.navigate(['/the-login']);
  }
}




