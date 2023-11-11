import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment';
import 'moment/locale/es';
import { HttpClient } from '@angular/common/http';

interface EventData {
  title: string;
  start: Date;
  end: Date;
  fecha_ingreso: string;
  fecha_termino: string;
  tipo_arreglo?: string;
  valor?: number;
  descripcion?: string;
  estado?: number;
  modelo_bicicleta?: string;
  estado_pago?: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

  eventDetails: EventData | undefined;

  constructor(private http: HttpClient) {
    moment.locale('es');
  }

  ngOnInit() {
    // Cargar eventos de "trabajos-taller" desde la API
    this.obtenerDatosAppTaller();
  }

  obtenerDatosAppTaller() {
    const apiUrl = 'https://de6yznumid.execute-api.us-east-2.amazonaws.com/taller';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          // Transformar los datos antes de asignarlos
          const eventosFullCalendar: EventInput[] = responseBody.map((evento: any) => {
            return {
              title: evento.tipo_arreglo,
              start: moment(evento.fecha_ingreso).toDate(),
              end: moment(evento.fecha_termino).toDate(),
              tipo_arreglo: evento.tipo_arreglo,
              valor: evento.valor,
              descripcion: evento.descripcion,
              estado: evento.estado,
              modelo_bicicleta: evento.modelo_bicicleta,
              estado_pago: evento.estado_pago
              // Agrega más propiedades según sea necesario
            };
          });

          // Actualiza los eventos después de cargarlos
          this.calendarOptions.events = eventosFullCalendar;
          // Puedes guardar los datos transformados si es necesario
          this.eventDetails = eventosFullCalendar[0].extendedProps as EventData;
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de taller:', error);
      }
    );
  }

  handleEventClick(arg: any) {
    const eventData = arg.event.extendedProps as EventData;
    this.eventDetails = {
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      fecha_ingreso: moment(eventData.start).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      fecha_termino: moment(eventData.end).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      tipo_arreglo: eventData.tipo_arreglo !== undefined ? eventData.tipo_arreglo : 'Valor por defecto',
      valor: eventData.valor !== undefined ? eventData.valor : 0,
      descripcion: eventData.descripcion !== undefined ? eventData.descripcion : 'Valor por defecto',
      estado: eventData.estado !== undefined ? eventData.estado : 0,
      modelo_bicicleta: eventData.modelo_bicicleta !== undefined ? eventData.modelo_bicicleta : 'Valor por defecto',
      estado_pago: eventData.estado_pago !== undefined ? eventData.estado_pago : 0
    };
  }
}




