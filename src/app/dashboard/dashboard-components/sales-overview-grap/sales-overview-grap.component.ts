import { Component, Input, OnInit } from '@angular/core'
import * as Chartist from 'chartist'
import { ChartType, ChartEvent } from 'ng-chartist'
import * as moment from 'moment'
export interface Chart {
  type: ChartType
  data: Chartist.IChartistData
  options?: any
  responsiveOptions?: any
  events?: ChartEvent
}

@Component({
  selector: 'app-sales-overview-grap',
  templateUrl: './sales-overview-grap.component.html',
  styleUrls: ['./sales-overview-grap.component.css']
})
export class SalesOverviewGrapComponent implements OnInit {
  multi: any[]
  view: any[] = [1200, 400]

  @Input() dailyData: any
  modifiedDailyData

  // options
  showXAxis = true
  showYAxis = true
  gradient = true
  showLegend = true
  showXAxisLabel = true
  xAxisLabel = 'Date'
  showYAxisLabel = true
  yAxisLabel = 'Amount'
  legendTitle = 'Years'

  colorScheme = {
    domain: ['#26c6da', '#1e88e5', '#AAAAAA']
  }

  constructor() {
  }

 onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)))
  }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)))
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)))
  // }


  ngOnInit(): void {
    const modifiedData = []
    this.dailyData.map((item) => {
      if (item.payment_date !== 'Total') {
        const obj = {
          'name': moment(item.payment_date).format('DD-MM-YYYY'),
          'series': [
            {
              'name': 'Bill',
              'value': item.totalBillAmount
            },
            {
              'name': 'Payment',
              'value': item.totalPaymentAmount
            }
          ]
        }
        modifiedData.push(obj)
      }
    })
    console.log(modifiedData)
    this.modifiedDailyData = modifiedData
    Object.assign(this, {modifiedData} )
  }

}
