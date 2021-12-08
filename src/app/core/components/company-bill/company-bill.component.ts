import { SelectionModel } from '@angular/cdk/collections'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { CompanyService } from '../../services/company.service'
import { CommonService } from '../../services/common.service'
import * as moment from 'moment'
import { CompanyCreateComponent } from 'app/core/shared/modals/company-create/company-create.component'

@Component({
  selector: 'app-company-bill',
  templateUrl: './company-bill.component.html',
  styleUrls: ['./company-bill.component.css']
})
export class CompanyBillComponent implements OnInit {


  displayedColumns: string[] = ['select' , 'id', 'bill_no', 'bill_amount', 'customer_name' , 'date', 'trDate', 'due_date', 'bill_amount_left', 'payment', 'edit', 'delete']
  customerUuid: any
  dataSource!: MatTableDataSource<any>
  storeData: any = []
  customerName: any
  placeName: any
  selectedDate: any
  totalAmount: any
  totalBillAmount: Number = 0
  minDate: any
  maxDate: any
  picker: any
  type
  selection = new SelectionModel<any>(true, [])
  @ViewChild(MatPaginator) paginator: MatPaginator | any
  @ViewChild(MatSort) sort: MatSort | any

  @Input() customerData: any
  @Input() setDisplayedColumns: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private billService: CompanyService,
    public toastr: ToastrService
  ) {
    this.maxDate = moment().format('YYYY-MM-DD')
  }

  ngOnInit() {

    // const yesterDay = moment().subtract(1, 'days').format('YYYY-MM-DD')

    if (this.setDisplayedColumns) {
      this.displayedColumns = this.setDisplayedColumns
    }

    if (this.customerData) {
      this.customerUuid = this.customerData.uuid
    } else {
      this.activatedRoute.params.subscribe((data) => {
        if (data.id) {
          this.customerUuid = data.id
        }
        if (data.name) {
          this.customerName = data.name
        }
        if (data.place) {
          this.placeName = data.place
        }
      })
      this.activatedRoute.queryParams.subscribe((data) => {
        if (data.date) {
          this.selectedDate = data.date
        }
      })
    }

    // this.customerUuid = this.activatedRoute.snapshot.paramMap.get('id')
    this.getBillData(this.selectedDate)
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected(): boolean {
  const numSelected = this.selection.selected.length
  const numRows =  this.dataSource && this.dataSource.data ?  this.dataSource.data.length : 0
  return numSelected === numRows
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle(): void {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row))
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
}

  getBillData(filter?: any) {
    console.log('filter', this.router.url)
    if (filter !== undefined) {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { date: filter },
          queryParamsHandling: 'merge'
        })
        this.selectedDate = filter
    }
    if (this.selectedDate) {
      this.billService.getBillsByDate(this.selectedDate).subscribe((data) => {
        this.storeData = data.data
        this.storeData = this.storeData.filter((bill: { customer: { type: string } }) => bill.customer.type !== 'company')
        this.totalBillAmount = data.totalAmount
        this.storeData = this.storeData.sort((a: any, b: any) => {
          return new Date(b.bill_date).getTime() - new Date(a.bill_date).getTime()
        })
        this.dataSource = new MatTableDataSource(this.storeData)
      }, (error) => {
        console.log(error)
      })
    } else if (!this.customerUuid) {
      this.commonService.getEntityData('company-bill').subscribe((data) => {
        this.storeData = data.data
        this.totalBillAmount = data.totalAmount
        this.dataSource = new MatTableDataSource(this.storeData)
      }, (error) => {
        console.log(error)
      })
    } else {
      this.billService.getBillByCustomer(this.customerUuid).subscribe((data) => {
        this.storeData = data
        this.storeData.map((bill: any) => {
          this.totalBillAmount += bill.bill_amount
        })
        this.storeData = this.storeData.sort((a: any, b: any) => {
          return new Date(b.bill_date).getTime() - new Date(a.bill_date).getTime()
        })
        this.dataSource = new MatTableDataSource(this.storeData)
      }, (error) => {
        console.log(error)
      })
    }
  }

  getFilteredData(event: any): void {
    this.dataSource = event.data ? event.data : event
    this.totalAmount = event.totalAmount ? event.totalAmount : 0
    let filteredData = event.data ? event.data : event
    filteredData = filteredData.sort((a: any, b: any) => {
      return new Date(a.bill_date).getTime() - new Date(b.bill_date).getTime()
    })
  }

  openUserDialog(): any {
    const createModalObj = {
      page: 'company-bill',
      title: `Add Bill`,
      pages: 'bill',
      action: 'create',
      data: {uuid: this.customerUuid}
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getBillData()
      }
    })
  }

  viewPaymentClickHandler(row: any): void {
    this.router.navigate([`/company-payment/${row.uuid}`, { page: 'bill' }])
  }

  addPayment(ele): void {
    const createModalObj = {
      page: 'company-payment',
      title: `Add Payment`,
      pages: 'bill',
      action: 'create',
      data: {bill_uuid: ele.uuid}
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getBillData()
      }
    })
  }

  edit(row: any): void {
    const editModalObj = {
      page: 'company-bill',
      title: `Edit Bill`,
      pages: 'bill',
      action: 'edit',
      data: row
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, editModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getBillData()
      }
    })
  }

  delete(ele: any): void {
    const value = this.commonService.openDialog(CompanyCreateComponent, { page: 'confirm'})
    value.subscribe((data) => {
      if (data) {
        this.commonService.deleteData('company-bill', ele.uuid).subscribe(() => {
          this.toastr.success('Payment deleted successfully')
          this.getBillData()
        }, (error) => {
          this.toastr.error(error)
        })
      }
    })
  }

  viewCustomerPayment(customer_uuid) {
    this.router.navigate([`/company-payment/${customer_uuid}`, { page: 'customer'}])
  }
}
