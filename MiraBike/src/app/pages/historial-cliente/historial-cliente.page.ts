import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.page.html',
  styleUrls: ['./historial-cliente.page.scss'],
})
export class HistorialClientePage implements OnInit {
  clientes: any[] = []; // Inicializar el arreglo vacío

  constructor(private mysqlService: MysqlService) {}

  ngOnInit() {
    // Llamar al método del servicio para obtener los datos
    this.mysqlService.getClientes().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.clientes = data; // Almacenar los datos en la propiedad "clientes"
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
}
