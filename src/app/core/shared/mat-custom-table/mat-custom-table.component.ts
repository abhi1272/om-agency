import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'app/core/services/common.service';
import { CreateComponent } from 'app/core/shared/modals/create/create.component';

@Component({
  selector: 'app-mat-custom-table',
  templateUrl: './mat-custom-table.component.html',
  styleUrls: ['./mat-custom-table.component.css']
})
export class MatCustomTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshData: EventEmitter<any> = new EventEmitter<any>();
  @Input() columns: Array<any>;
  @Input() dataset: Array<any> = [];
  @Input() showCheckBox: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() dialogData: any = {};
  selection = new SelectionModel<any>(true, []);
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [];
  value: string;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    // set checkbox column
    // this.displayedColumns.push("select");

    // set table columns
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));    // pre-fix static

    // add action column
    this.displayedColumns.unshift("id")
    this.displayedColumns.push("action");
    this.dataSource = new MatTableDataSource<any>(this.dataset);
  }

  onTableAction(e: any): void {
    this.action.emit(e)
  }

  onRefreshClick() {
    this.refreshData.emit();
  }

  openDialog() {
    const dialogRef = this.commonService.openDialog(CreateComponent, this.dialogData);
    dialogRef.subscribe((data) => {
      console.log('data', data);
      // this.refreshData.emit();
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
