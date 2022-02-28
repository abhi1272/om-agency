import { Component, OnInit } from '@angular/core'
import { CommonService } from 'app/core/services/common.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columns = [
    { columnDef: 'firstName', header: 'Name' }
  ]
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
