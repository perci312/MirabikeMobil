import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient si lo necesitas
import { CalendarComponent } from '../../components/calendar/calendar.component';


@Component({
  selector: 'app-trabajos-taller',
  templateUrl: './trabajos-taller.page.html',
  styleUrls: ['./trabajos-taller.page.scss'],
})
export class TrabajosTallerPage implements OnInit {
  
  datosAppTaller: any[] = []; // Define la propiedad para almacenar los datos

  



  constructor(private http: HttpClient) {} // Asegúrate de inyectar HttpClient si lo necesitas

  ngOnInit() {
    this.obtenerDatosAppTaller();
  }

  obtenerDatosAppTaller() {
    const apiUrl = 'https://de6yznumid.execute-api.us-east-2.amazonaws.com/taller'; // Reemplaza por la URL de tu API de taller

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosAppTaller = responseBody; // Asigna los datos a la propiedad
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de taller:', error);
      }
    );
  }
}

