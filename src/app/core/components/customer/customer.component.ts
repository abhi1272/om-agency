import { ElementRef, Component, OnInit, ViewChild } from '@angular/core'
 import * as XLSX from 'xlsx'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router'
import { CommonService } from '../../services/common.service'
import { CreateComponent } from 'app/core/shared/modals/create/create.component'
import { ToastrService } from 'ngx-toastr'
// import jsPDF from 'jspdf'
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
// import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'area' , 'totalBillAmount', 'totalBillAmountLeft', 'addBill', 'viewBill' , 'addPayment', 'viewPayment', 'edit', 'delete']
  dataSource!: MatTableDataSource<any>
  storeData: any = []
  totalSale = 0
  totalPaymentReceived = 0
  totalAmountLeft = 0
  sortedData = []
  printData = []
  placeData = []
  selectedPlaceUUid = []
  setFilterValue
  loading = false
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild('TABLE') table: ElementRef | any

  constructor(
    private router: Router,
    private commonService: CommonService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.getCustomerData()
  }

  applyFilter(event?: Event) {
    let filterValue
    if (!event) {
      filterValue = this.setFilterValue
    } else {
      filterValue = (event.target as HTMLInputElement).value
      this.setFilterValue = filterValue
    }
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  exportAsExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement)// converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      /* save to file */
      XLSX.writeFile(wb, 'Customer.xlsx')

    }

  getCustomerData(filter?: any) {
    this.loading = true
    this.commonService.getEntityData('customer').subscribe((data) => {
      this.storeData = data.data
      this.loading = false
      this.storeData.map((item: any) => {
        item.totalBillAmountLeft = (item.totalBillAmount - (item.totalPaymentAmount || 0))
      })
      this.filterByPlace([])
      this.dataSource = new MatTableDataSource(this.storeData)
      this.dataSource.paginator = this.paginator
      this.sortedData = this.storeData.slice()
      this.printData = this.storeData.slice()
      this.getPlaceData()
      this.applyFilter()
    }, (error) => {
      console.log(error)
    })
  }

  getFilteredData(event: any): void {
    this.dataSource = event
    this.printData = event
    this.calculateTotal(event)
  }

  openUserDialog(): any {
    const createModalObj: any = {
      page: 'customer',
      title: `Add Customer`,
      pages: 'customer',
      action: 'create',
      data: {}
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }


  showBillList(uuid: string): void {
    this.router.navigate([`/customer/${uuid}`])
  }

  viewPaymentClickHandler(row: any): void {
    this.router.navigate([`/payment/${row.uuid}`, { page: 'customer'}])
  }

  viewBill(row: any): void {
    this.router.navigate([`/bill/${row.uuid}`, { page: 'customer', name: row.name , place: row.area}])
  }

  addPaymentClickHandler(row: any): void {
    const createModalObj: any = {
      page: 'payment',
      title: `Add Payment`,
      pages: 'customer',
      action: 'create',
      data: row
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj, )
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }

  addBill(row: any): void {
    const createModalObj = {
      page: 'bill',
      title: `Add Bill`,
      pages: 'customer',
      action: 'create',
      data: row
    }
    const value = this.commonService.openDialog(CreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }

  edit(row: any): void {
    const editModalObj = {
      page: 'customer',
      title: `Edit customer`,
      pages: 'customer',
      action: 'edit',
      data: row
    }
    const value = this.commonService.openDialog(CreateComponent, editModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }

  delete(ele: any): void {
    const value = this.commonService.openDialog(CreateComponent, { page: 'confirm'})
    value.subscribe((data) => {
      if (data) {
        this.commonService.archiveData(ele.uuid, 'customer', {active: false}).subscribe(() => {
          this.toast.success('Customer deleted successfully')
          this.getCustomerData()
        }, (error) => {
          this.toast.error(error)
        })
      }
    })
  }

  calculateTotal(storeData: any): void {
    this.totalSale = 0
    this.totalPaymentReceived = 0
    storeData.map((data: any) => {
      this.totalSale += (data.totalBillAmount || 0)
      this.totalPaymentReceived += ( data.totalPaymentAmount || 0)
    })
  }

  sortData(sort: Sort): any {
    const data = this.storeData.slice()

    if (!sort.active || sort.direction === '') {
      this.sortedData = data
    } else {
      this.sortedData = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active]
        const bValue = (b as any)[sort.active]
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1)
      })
      this.dataSource = new MatTableDataSource(data)
    }
  }

  public getPlaceData() {
    this.commonService.getEntityData('place').subscribe((data) => {
      this.placeData = data.data
    }, (error) => {
      console.log(error)
    })
  }

  filterByPlace(placeUuid: any) {
    this.selectedPlaceUUid = placeUuid
    let filteredData = this.storeData
    if (this.selectedPlaceUUid && this.selectedPlaceUUid.length) {
      filteredData = this.storeData.filter((customer: any) => {
        if (customer.place && placeUuid.includes(customer.place.uuid)) {
          return true
        } else {
          return false
        }
      })
    }

    this.calculateTotal(filteredData)
    this.dataSource = new MatTableDataSource(filteredData)
  }

  // public download(): any{
  //   const doc = new jsPDF()
  //   const columns = [['name', 'area', 'totalBillAmount', 'totalBillAmountLeft']]

  //   this.printData = this.printData.map((item) => {
  //     return {
  //       name: item.name,
  //       area: item.area,
  //       totalBillAmount: item.totalBillAmount,
  //       totalBillAmountLeft: item.totalBillAmountLeft,
  //     }
  //   })
  //   console.log(this.printData)
  //   autoTable(doc, {
  //     head: columns,
  //     html: '#customer-table',
  //     didDrawPage: (dataArg) => {
  //       doc.text('PAGE', dataArg.settings.margin.left, 10);
  //     }
  //   })
  //   doc.save('table.pdf')
  // }

}
