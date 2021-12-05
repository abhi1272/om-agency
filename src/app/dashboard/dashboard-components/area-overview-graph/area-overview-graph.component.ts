import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'app/dashboard/services/dashboard.service'


@Component({
  selector: 'app-area-overview-graph',
  templateUrl: './area-overview-graph.component.html',
  styleUrls: ['./area-overview-graph.component.css']
})
export class AreaOverviewGraphComponent implements OnInit {

  single: any[]
  view: any[] = [1200, 200]
  areaData
  currentData = 'bill'

  // options
  showLegend = true
  showLabels = true

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  }

  constructor(public dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAreaData()
  }

  public getAreaData() {
    this.dashboardService.getDataByArea().subscribe((data) => {
      this.areaData = data
      const billData = this.areaData.billData
      this.single = billData.filter(item => item.name !== null)
      Object.assign(this, { billData })
    })
  }

  showBills() {
    this.currentData = 'bill'
    const billData = this.areaData.billData
    this.single = billData.filter(item => item.name !== null).sort((a, b) => a - b)
    Object.assign(this, { billData })
  }

  showPayment() {
    this.currentData = 'payment'
    const paymentData = this.areaData.paymentData
    this.single = paymentData.filter(item => item.name !== null).sort((a, b) => a - b)
    Object.assign(this, { paymentData })
  }

  onSelect(event) {
    console.log(event)
  }

}
