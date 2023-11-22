import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CorsInterceptor } from './cors-interceptor';

import { CalendarComponent } from './components/calendar/calendar.component';
import { Line_chartComponent } from './components/line_chart/line_chart.component';
import { Bar_chartComponent } from './components/bar_chart/bar_chart.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';



@NgModule({
  declarations: [AppComponent,CalendarComponent,Line_chartComponent,Bar_chartComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,FullCalendarModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
