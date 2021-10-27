import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  fieldTypes = ['String', 'Number', 'UUID', 'Array', 'Boolean']

  constructor() { }

  ngOnInit(): void {
  }

}
