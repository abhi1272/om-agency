
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { CreateComponent } from 'app/material-component/shared/modals/create/create.component'
import { ToastrService } from 'ngx-toastr'
import { BillService } from '../../services/bill.service'
import { CommonService } from '../../services/common.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  displayedColumns: string[] = ['id', 'expenses_date', 'type', 'amount', 'notes', 'delete']
  customerUuid: any
  dataSource!: MatTableDataSource<any>
  storeData: any = []
  customerName: any
  placeName: any
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort: MatSort | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private billService: BillService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.customerName = data.name
      this.placeName = data.place
    })
    this.customerUuid = this.activatedRoute.snapshot.paramMap.get('id')
    this.getCustomerData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCustomerData() {
      this.commonService.getEntityData('expense').subscribe((data) => {
        this.storeData = data.data
        this.dataSource = new MatTableDataSource(this.storeData)
      }, (error) => {
        console.log(error)
      })
    }

  getFilteredData(event: any): void {
    console.log(event)
    this.dataSource = event
  }

  openUserDialog(): any {
    const createModalObj = {
      page: 'expense',
      title: `Add expense`,
      pages: 'expense',
      action: 'create',
      data: {}
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data){
        this.getCustomerData()
      }
    })
  }

  viewPaymentClickHandler(row: any): void {
    this.router.navigate([`/payment/${row.uuid}`, { page: 'customer' }])
  }

  edit(row: any): void {
    const editModalObj = {
      page: 'expense',
      title: `Edit expense`,
      pages: 'expense',
      action: 'edit',
      data: row
    }
    const value = this.commonService.openDialog(CreateComponent, editModalObj)
    value.subscribe((data) => {
      if (data){
        this.getCustomerData()
      }
    })
  }

  delete(ele: any): void{
    const value = this.commonService.openDialog(CreateComponent, { page: 'confirm'})
    value.subscribe((data) => {
      if (data){
        this.commonService.deleteData('expense', ele.uuid).subscribe((data) => {
          this.toastr.success('Payment deleted successfully')
          this.getCustomerData()
        }, (error) => {
          this.toastr.error(error)
        })
      }
    })
  }
}

