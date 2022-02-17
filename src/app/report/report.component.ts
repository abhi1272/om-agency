import { Component, OnChanges, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CommonService } from 'app/core/services/common.service'
import { DashboardService } from 'app/dashboard/services/dashboard.service'
import * as moment from 'moment'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dataSource = []
  todayData: any
  totalData: any
  customerData: any
  placeData: any
  query: any
  monthlyData: any
  dateType = 'daily'
  preDefinedDateObj: any
  selectedCustomerData: any
  currentSelectType: any
  transaction_type = 'Sale'
  ranges: any = [
    {
      value: [new Date(), new Date()],
      label: 'Today'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date()],
      label: 'Yesterday'
    },
    {
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: 'Last 7 Days'
  },
  {
    value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
    label: 'Last 30 Days'
  },
  {
    value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1),new Date()],
    label: 'This Month'
  },
  {
    value: [new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),new Date(new Date().getFullYear(), new Date().getMonth(), 0)],
    label: 'Last Month'
  },
  ]
  datepickerMaxDate = new Date(new Date().setDate(new Date().getDate() + 1))
  datepickerConfig = {
    dateInputFormat: 'YYYY-MM-DD', containerClass: 'theme-dark-blue',
    ranges: this.ranges, isAnimated: true, showWeekNumbers: false
  }

  constructor(public dashboardService: DashboardService, public commonService: CommonService,
              public router: Router) { }

  ngOnInit() {
    this.preDefinedDateObj = {
      start_date : moment().subtract(15, 'days').format('YYYY-MM-DD'),
      end_date : moment().format('YYYY-MM-DD')
    }
    this.getDayWiseData()
    // this.getDayTotalData()
    this.getCustomerData()
    this.getPlaceData()
  }

  public datepickerValueChange(dateRange: any): void {
    const dateObj = {
      start_date : moment(dateRange[0]).format('YYYY-MM-DD'),
      end_date : moment(dateRange[1]).format('YYYY-MM-DD')
    }
    this.preDefinedDateObj = dateObj
    this.getDayWiseData()
  }

  public getSelectedDated(event) {
    this.preDefinedDateObj = event
    this.getDayWiseData()
  }

  public getDayWiseData() {
    this.dashboardService.getDayWiseData(this.preDefinedDateObj, this.selectedCustomerData, this.currentSelectType, this.transaction_type
      ).subscribe((data) => {
      this.dateType = 'daily'
      this.dataSource = data.data
      this.todayData = data.data[0]
    })
  }

  public getMonthlyData(event?: any, type?: any) {
    const filter = event ? event.value : null
    this.dashboardService.getMonthlyData(filter, type, this.transaction_type).subscribe((data) => {
      this.monthlyData = data.data
      this.dateType = 'monthly'
    })
  }

  public getDayTotalData() {
    this.dashboardService.getTotalData(this.transaction_type).subscribe((data) => {
      this.totalData = data
    })
  }

  public getCustomerData() {
    this.commonService.getEntityData('customer').subscribe((data) => {
      this.customerData = data.data
    }, (error) => {
      console.log(error)
    })
  }

  public getPlaceData() {
    this.commonService.getEntityData('place').subscribe((data) => {
      this.placeData = data.data
    }, (error) => {
      console.log(error)
    })
  }

  onKey(event: any): void {
    this.query = event.target.value
  }

  public getCustomerMonthlyData(event?: any, type?: string) {
    this.selectedCustomerData = event ? event.value : null
    this.currentSelectType = type
    if (this.dateType === 'monthly') {
      this.getMonthlyData(event, type)
    } else {
      this.getDayWiseData()
    }
  }

  public showFullData(row: any, route: string) {
    if (row.payment_date && row.payment_date !== 'Total') {
      this.router.navigate(
        [route],
        {
          queryParams: { date: moment(row.payment_date).format('YYYY-MM-DD') },
          queryParamsHandling: 'merge'
        })
    }
  }

  public getTransactionData(type) {
    this.transaction_type = type
    if (this.dateType === 'daily') {
      this.getDayWiseData()
    } else {
      this.getMonthlyData()
    }
  }

}
