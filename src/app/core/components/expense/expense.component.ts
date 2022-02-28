
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { SharedService } from '../../../shared/services/shared.service'

import { capitalizeFirstLetter } from '../../../helper/helper'
@Component({
  selector: 'app-expenses',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  constructor() {
  }
  columns = [
    { columnDef: 'type', header: 'Type' , object : true},
    { columnDef: 'amount', header: 'Amount' },
    { columnDef: 'date', header: 'Date' , date : true},
  ]

  ngOnInit(): void {

  }

}

