import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'app/core/services/common.service';
import { CreateComponent } from 'app/core/shared/modals/create/create.component'

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete']
  dataSource: MatTableDataSource<any>;
  storeData: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild('TABLE') table: ElementRef | any;
  loading: boolean = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getPlaceData();
  }

  public getPlaceData(): void {
    this.loading = true;
    this.commonService.getEntityData('place').subscribe((data) => {
      this.storeData = data.data;
      this.dataSource = new MatTableDataSource(this.storeData);
      this.loading = false;
    }, (error) => {
      console.log(error)
    })
  }

  openPlaceDialog() {
    const createModalObj: any = {
      page: 'place',
      title: `Add Place`,
      pages: 'place',
      action: 'create',
      data: {}
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getPlaceData();
      }
    })
  }

  sortData(ev) {

  }

  edit(data: any) {
    const editModalObj = {
      page: 'place',
      title: `Edit place`,
      pages: 'place',
      action: 'edit',
      data: data
    }
    const value = this.commonService.openDialog(CreateComponent, editModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getPlaceData();
      }
    })
  }

  delete(data: any) {

  }

}
