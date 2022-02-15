import { SelectionModel } from '@angular/cdk/collections'
import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { BillService } from '../../services/bill.service'
import { CommonService } from '../../services/common.service'
import * as moment from 'moment'
// import jsPDF from 'jspdf'
import { CreateComponent } from 'app/core/shared/modals/create/create.component'
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
// import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'select', 'name', 'customer_area', 'paid_amount', 'date', 'notes', 'edit', 'delete']
  dataSource: any
  storedData: any
  customerUuid: any
  billUuid: any
  selection = new SelectionModel<any>(true, [])
  sortedData: any = []
  totalAmount: any
  selectedDate: any
  minDate: any
  maxDate: any

  @Input() customerData: any
  @Input() setDisplayedColumns: any
  // @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public toast: ToastrService, public billService: BillService,
    public route: ActivatedRoute, public commonService: CommonService,
    public router: Router) {
    this.maxDate = moment().format('YYYY-MM-DD')

  }

  ngOnInit(): void {
    const yesterDay = moment().subtract(1, 'days').format('YYYY-MM-DD')

    if (this.setDisplayedColumns) {
      this.displayedColumns = this.setDisplayedColumns
    }
    if (this.customerData) {
      this.customerUuid = this.customerData.uuid
    } else {
      this.route.params.subscribe((data) => {
        if (data.page === 'bill') {
          this.billUuid = data.id
        } else if (data.id) {
          this.customerUuid = data.id
        } else {
          this.selectedDate = yesterDay
        }
      })
      this.route.queryParams.subscribe((data) => {
        if (data.date) {
          this.selectedDate = data.date
        }
      })
    }
    this.getPaymentData(this.selectedDate)
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.length
    return numSelected === numRows
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach((row: any) => this.selection.select(row))
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  // Get Project related functions

  public getPaymentData(filter?: any): void {
    if (filter !== undefined) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { date: filter },
          queryParamsHandling: 'merge'
        })
      this.selectedDate = filter
    }
    if (this.selectedDate) {
      this.billService.getPaymentsByDate(this.selectedDate, 'Sale').subscribe((data) => {
        this.storedData = data.data
        this.storedData = this.storedData.filter((pay: { customer: { type: string } }) => pay.customer.type !== 'company')
        this.totalAmount = data.totalAmount
        this.storedData = this.storedData.sort((a: any, b: any) => {
          return new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
        })
        this.dataSource = new MatTableDataSource(this.storedData)
      }, (error) => {
        console.log(error)
      })
    } else if (this.billUuid) {
      this.billService.getPaymentsByBill(this.billUuid, 'bill_uuid').subscribe((data) => {
        this.storedData = data.data
        this.totalAmount = data.totalAmount
        // this.sortedData = data;
        this.dataSource = new MatTableDataSource(this.storedData)
      }, (error) => {
        console.log(error)
      })
    } else if (this.customerUuid) {
      this.billService.getPaymentsByBill(this.customerUuid, 'customer_uuid').subscribe((data) => {
        this.storedData = data.data
        this.totalAmount = data.totalAmount
        this.storedData = this.storedData.sort((a: any, b: any) => {
          return new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
        })
        this.dataSource = new MatTableDataSource(this.storedData)
      }, (error) => {
        console.log(error)
      })
    } else {
      this.billService.getPaymentALl('Sale').subscribe((data) => {
        this.storedData = data.data
        this.totalAmount = data.totalAmount
        // this.sortedData = data;
        this.dataSource = new MatTableDataSource(this.storedData)
      }, (error) => {
        console.log(error)
      })
    }

  }

  getFilteredData(event: any): void {
    this.totalAmount = event.totalAmount ? event.totalAmount : 0
    let filteredData = event.data ? event.data : event
    filteredData = filteredData.sort((a: any, b: any) => {
      return new Date(a.create_time).getTime() - new Date(b.create_time).getTime()
    })
    this.dataSource = filteredData
  }

  public openUserDialog(): any {
    const createModalObj = {
      page: 'payment',
      title: `Add Payment`,
      pages: 'payment',
      action: 'create',
      data: {customer_uuid: this.customerUuid}
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getPaymentData()
      }
    })
  }

  edit(ele: any): void {
    const createModalObj = {
      page: 'payment',
      title: `Add 'payment`,
      pages: 'payment',
      action: 'edit',
      data: ele
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getPaymentData()
      }
    })
  }


  delete(ele: any): void {
    const value = this.commonService.openDialog(CreateComponent, { page: 'confirm' })
    value.subscribe((data) => {
      if (data) {
        this.commonService.deleteData('payment', ele.uuid).subscribe(() => {
          this.toast.success('Payment deleted successfully')
          this.getPaymentData()
        }, (error) => {
          this.toast.error(error)
        })
      }
    })
  }

  viewCustomerBill(customer_uuid) {
    this.router.navigate([`/bill/${customer_uuid}`, { page: 'payment'}])
  }

  // sortData(sort: Sort) {
  //   console.log(sort);
  //   const data = this.storedData.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }
  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return this.tableService.compare(a.name, b.name, isAsc);
  //       case 'paid_amount': return this.tableService.compare(a.paid_amount, b.paid_amount, isAsc);
  //       case 'date': return this.tableService.compare(a.date, b.date, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
  // public download(id): any{
  //   const doc = new jsPDF()
  //   autoTable(doc, { html: `#payment-table`, columnStyles: { europe: { halign: 'center' } }})
  //   doc.save('table.pdf')
  // }


}
