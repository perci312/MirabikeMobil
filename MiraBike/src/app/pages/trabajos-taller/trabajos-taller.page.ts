import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CalendarComponent } from '../../components/calendar/calendar.component';


@Component({
  selector: 'app-trabajos-taller',
  templateUrl: './trabajos-taller.page.html',
  styleUrls: ['./trabajos-taller.page.scss'],
})
export class TrabajosTallerPage implements OnInit {
  
  datosAppTaller: any[] = []; 

  



  constructor(private http: HttpClient) {} 

  ngOnInit() {
    this.obtenerDatosAppTaller();
  }

  //Obtiene los dato de la api taller
  obtenerDatosAppTaller() {
    const apiUrl = 'https://de6yznumid.execute-api.us-east-2.amazonaws.com/taller'; 

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosAppTaller = responseBody; 
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

