import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { BillService } from 'app/core/services/bill.service'
import { CommonService } from 'app/core/services/common.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.css']
})
export class ViewSummaryComponent implements OnInit {

  page = 'payment'
  totalAmount
  storedData
  dataSource
  setDisplayedColumns: string[] = [ 'id', 'date', 'paid_amount', 'edit', 'delete']
  constructor(public toast: ToastrService, public dialogRef: MatDialogRef<any>,
    public commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any,
    public billService: BillService) { }


  ngOnInit(): void {
  }

  switchPage() {
    if (this.page === 'payment') {
      this.page = 'bill'
      this.setDisplayedColumns = ['id', 'date', 'bill_no', 'bill_amount', 'edit', 'delete']
    } else if (this.page === 'bill') {
      this.page = 'payment'
      this.setDisplayedColumns = ['id', 'date', 'paid_amount', 'edit', 'delete']
    }
  }

  close() {
    this.dialogRef.close(true)
  }
}
