import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'custom-pie-chart',
    templateUrl: './custom-pie-chart.component.html',
    styleUrls: ['./custom-pie-chart.component.scss'],
})
export class CustomPieChartComponent implements OnInit {
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = [['Apple'], ['Cherry'], 'Mango'];
    public pieChartData: number[] = [300, 500, 200];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
            backgroundColor: ['#0ec254', '#ee568e', '#e9f25a'],
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
