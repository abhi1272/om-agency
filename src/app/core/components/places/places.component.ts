import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  columns = [
    { columnDef: 'name', header: 'Name' }
  ]

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
