import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-multi-date-picker',
  templateUrl: './multi-date-picker.component.html',
  styleUrls: ['./multi-date-picker.component.css']
})
export class MultiDatePickerComponent implements OnInit {

  dateType = 'daily'
  preDefinedDateObj

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
  constructor() { }
  @Output() sendSelectedDated = new EventEmitter()

  ngOnInit(): void {
    this.preDefinedDateObj = {
      start_date : moment().subtract(15, 'days').format('YYYY-MM-DD'),
      end_date : moment().format('YYYY-MM-DD')
    }
  }

  public datepickerValueChange(dateRange: any): void {
    const dateObj = {
      start_date : moment(dateRange[0]).format('YYYY-MM-DD'),
      end_date : moment(dateRange[1]).format('YYYY-MM-DD')
    }
    this.preDefinedDateObj = dateObj
    this.sendSelectedDated.emit(dateObj)
  }

}
