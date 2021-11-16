import {Component, OnInit} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'custom-bar-chart',
    templateUrl: './custom-bar-chart.component.html',
    styleUrls: ['./custom-bar-chart.component.scss'],
})
export class CustomBarChartComponent implements OnInit {
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {xAxes: [{}], yAxes: [{}]},
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
        {data: [12, 20, 32, 17, 23, 27, 32], label: 'Orders Sale Num'},
        {data: [28, 49, 40, 56, 86, 27, 90], label: 'Orders Sale Amount'}
    ];

    constructor() {
    }

    ngOnInit() {
    }

    // events
    public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        this.barChartData[0].data = data;
    }
}
