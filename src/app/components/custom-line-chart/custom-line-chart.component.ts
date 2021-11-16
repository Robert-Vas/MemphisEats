import {Component, OnInit} from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
    selector: 'custom-line-chart',
    templateUrl: './custom-line-chart.component.html',
    styleUrls: ['./custom-line-chart.component.scss'],
})
export class CustomLineChartComponent implements OnInit {
    public lineChartData: ChartDataSets[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sale Amount'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Sale Num'},
    ];
    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            xAxes: [{}],
            yAxes: [{}]
        },
        annotation: {
            annotations: [],
        },
    };
    public lineChartColors: Color[] = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [pluginAnnotations];

    constructor() {
    }

    ngOnInit() {
    }

    public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }
}
