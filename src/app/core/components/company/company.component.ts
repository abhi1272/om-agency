import { ElementRef, Component, OnInit, ViewChild } from '@angular/core'
import * as XLSX from 'xlsx'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router'
import { CommonService } from '../../services/common.service'
import { CompanyCreateComponent } from 'app/core/shared/modals/company-create/company-create.component'
// import jsPDF from 'jspdf'
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
// import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'area' , 'totalBillAmount', 'totalBillAmountLeft', 'dueDays', 'addBill', 'viewBill' , 'viewPayment', 'edit']
  dataSource!: MatTableDataSource<any>
  storeData: any = []
  totalSale = 0
  totalPaymentReceived = 0
  totalAmountLeft = 0
  sortedData = []
  printData = []
  placeData = []
  selectedPlaceUUid = []
  loading = false
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild('TABLE') table: ElementRef | any

  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getCustomerData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
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
    this.commonService.getEntityData('company').subscribe((data) => {
      this.storeData = data.data
      this.loading = false
      this.storeData.map((item: any) => {
        item.totalBillAmountLeft = item.totalBillAmount - item.totalPaymentAmount || 0
      })
      this.dataSource = new MatTableDataSource(this.storeData)
      this.calculateTotal(this.storeData)
      this.dataSource.paginator = this.paginator
      this.sortedData = this.storeData.slice()
      this.printData = this.storeData.slice()
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
      page: 'company',
      title: `Add Company`,
      pages: 'company',
      action: 'create',
      data: {}
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }


  showBillList(uuid: string): void {
    this.router.navigate([`/company/${uuid}`])
  }

  viewPaymentClickHandler(row: any): void {
    this.router.navigate([`/company-payment/${row.uuid}`, { page: 'company'}])
  }

  viewBill(row: any): void {
    this.router.navigate([`/company-bill/${row.uuid}`, { page: 'company', name: row.name , place: row.area}])
  }

  addPaymentClickHandler(row: any): void {
    const createModalObj: any = {
      page: 'company-payment',
      title: `Add Payment`,
      pages: 'payment',
      action: 'create',
      data: row
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, createModalObj, )
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }

  addBill(row: any): void {
    const createModalObj = {
      page: 'company-bill',
      title: `Add Bill`,
      pages: 'bill',
      action: 'create',
      data: row
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, createModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }

  edit(row: any): void {
    const editModalObj = {
      page: 'company',
      title: `Edit Company`,
      pages: 'company',
      action: 'edit',
      data: row
    }
    const value = this.commonService.openDialog(CompanyCreateComponent, editModalObj)
    value.subscribe((data) => {
      if (data) {
        this.getCustomerData()
      }
    })
  }

  calculateTotal(storeData: any): void {
    this.totalSale = 0
    this.totalPaymentReceived = 0
    storeData.map((data: any) => {
      this.totalSale += data.totalBillAmount
      this.totalPaymentReceived += data.totalPaymentAmount
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
