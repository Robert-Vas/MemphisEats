import {Component, OnInit} from '@angular/core';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
    selector: 'custom-doughnut-chart',
    templateUrl: './custom-doughnut-chart.component.html',
    styleUrls: ['./custom-doughnut-chart.component.scss'],
})
export class CustomDoughnutChartComponent implements OnInit {
    public doughnutChartLabels: Label[] = ['Kiwifruit', 'Orange', 'MBanana'];
    public doughnutChartData: MultiDataSet = [
        [350, 450, 100],
        [50, 150, 120],
        [250, 130, 70],
    ];
    public doughnutChartType: ChartType = 'doughnut';

    constructor() {
    }

    ngOnInit() {
    }
}
