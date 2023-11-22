import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line_chart',
  templateUrl: './line_chart.component.html',
  styleUrls: ['./line_chart.component.css']
})
export class Line_chartComponent implements OnInit {

  public chart:Chart;

  constructor() { }

  ngOnInit(): void {

    const data= {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label:'My First Dataset',
        data:[65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor:'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }

    this.chart= new Chart("chart",{
      type: 'line',
      data
    })
  }

}
