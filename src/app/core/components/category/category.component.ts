import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  columns = [
    { columnDef: 'name', header: 'Name' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
