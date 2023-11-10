import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { startOfDay } from 'date-fns';

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

  eventDetails: any;

  constructor() { }

  ngOnInit() {
    // Ajusta las fechas de inicio y fin al principio y final del día
    const newEvent1 = {
      title: 'Nuevo Evento 1',
      start: startOfDay(new Date('2023-11-10')),
      end: startOfDay(new Date('2023-11-16'))
    };
  
    const newEvent2 = {
      title: 'Nuevo Evento 2',
      start: startOfDay(new Date('2023-11-10')),
      end: startOfDay(new Date('2023-11-20'))
    };
  
    this.calendarOptions.events = [newEvent1, newEvent2];
  }

  handleEventClick(info: any) {
    const eventTitle = info.event.title;
    const startDate = info.event.start;
    const endDate = info.event.end;
  
    // Verificar si las fechas son válidas antes de asignarlas
    if (eventTitle && startDate && endDate) {
      this.eventDetails = {
        title: eventTitle,
        start: startDate,
        end: endDate
      };
    }
  }
}
