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
  calendarOptions: CalendarOptions;
  eventDetails: EventData | undefined;

  constructor(private http: HttpClient) {
    moment.locale('es');
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: [],
      eventClick: this.handleEventClick.bind(this),
      eventDidMount: this.eventDidMount.bind(this) // Usamos eventDidMount en lugar de eventRender
    };
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
            console.log(evento.tipo_arreglo); // Agrega esta línea
            return {
              title: String(evento.tipo_arreglo),
              start: moment(evento.fecha_ingreso).toDate(),
              end: moment(evento.fecha_termino).toDate(),
              tipo_arreglo: evento.tipo_arreglo,
              valor: evento.valor,
              descripcion: evento.descripcion,
              estado: evento.estado,
              modelo_bicicleta: evento.modelo_bicicleta,
              estado_pago: evento.estado_pago,
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

  eventDidMount(info: any) {
    const eventData = info.event.extendedProps as EventData;

    // Colores predeterminados
    let backgroundColor = 'blue';
    let textColor = 'white';

    // Cambiar colores según el estado
    switch (eventData.estado) {
      case 0:
        backgroundColor = 'green';
        break;
      case 1:
        backgroundColor = 'black';
        break;
      case 2:
        backgroundColor = 'purple';
        break;
    }

    // Cambiar color si la fecha de término es menor al día de hoy
    const today = moment();
    const eventEnd = moment(info.event.end);
    if (eventEnd.isBefore(today, 'day')) {
      backgroundColor = 'red';
    }

    // Aplicar estilos
    info.el.style.backgroundColor = backgroundColor;
    info.el.style.color = textColor;
  }
  getEstadoText(estado: number | undefined): string {
    if (estado !== undefined) {
      switch (estado) {
        case 0:
          return 'Terminado';
        case 1:
          return 'En proceso';
        case 2:
          return 'En espera';
        default:
          return 'Desconocido';
      }
    } else {
      return 'No definido';
    }
  }
}














