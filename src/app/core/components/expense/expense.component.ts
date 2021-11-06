
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

  constructor(public sharedService: SharedService, private activatedRoute: ActivatedRoute,
              public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }
  configData: any
  entity

  ngOnInit(): void {
    console.log(this.activatedRoute.params)
    this.activatedRoute.params.subscribe((data) => {
      this.entity = data.name
      this.sharedService.roleName = capitalizeFirstLetter(data.name)
    })
    this.getConfigData()
  }

  getConfigData(): void {
    this.sharedService.getTableConfig(this.entity).subscribe((data) => {
      this.configData = data.data[0]
      console.log(this.configData)
    }, (error) => {
      console.log(error)
    })
  }
}

