import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import * as moment from 'moment'
import { CommonService } from 'app/core/services/common.service'

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {

  constructor(public toast: ToastrService, public dialogRef: MatDialogRef<any>,
    public commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  createForm: any
  query: any
  entityData: any
  today: any
  ngOnInit(): void {
    console.log('data', this.data)
    this.today = moment().format('YYYY-MM-DD')
    const yesterDay = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const selectedDefaultDate = yesterDay
    if (this.data.page === 'company-bill') {
      this.createForm = new FormGroup({
        bill_no: new FormControl('', Validators.required),
        bill_amount: new FormControl('', Validators.required),
        bill_date: new FormControl('', Validators.required),
        trDate: new FormControl('', Validators.required),
        notes: new FormControl(''),
      })
    } else if (this.data.page === 'company') {
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        dueDays: new FormControl('', Validators.required),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        notes: new FormControl(''),
      })
    } else if (this.data.page === 'company-payment') {
      this.createForm = new FormGroup({
        payment_date: new FormControl('', Validators.required),
        paid_amount: new FormControl('', Validators.required),
        check_number: new FormControl('', Validators.required),
        credit_note: new FormControl(''),
        debit_note: new FormControl(''),
        notes: new FormControl(''),
      })
    }

    if (this.data.action === 'edit') {
      this.createForm.patchValue({
        ...this.data.data,
        bill_date: this.covertDateFormate(this.data.data.bill_date),
        trDate: this.covertDateFormate(this.data.data.trDate),
        payment_date: this.covertDateFormate(this.data.data.payment_date),
      })
    }
  }

  submit(): void {
    if (this.data.action === 'create') {
      this.createData()
    } else if (this.data.action === 'edit') {
      this.editData()
    }
  }

  createData(): void {
    this.createForm.value.company_uuid = this.data.data.uuid

    if (this.data.data && this.data.data.company_uuid) {
      this.createForm.value.company_uuid = this.data.data.company_uuid
    }

    if (this.data.data && this.data.data.bill_uuid) {
      this.createForm.value.bill_uuid = this.data.data.bill_uuid
    }

    if (this.data.page === 'company-payment') {
      this.createForm.value.payment_date = this.covertDateIntoTimeStamp(this.createForm.value.payment_date)
      const payments = `${this.createForm.value.paid_amount}`.split(',')
      payments.map((payment) => {
        if (!isNaN(+payment)) {
          this.createForm.value.paid_amount = +payment
          this.addEntityData()
        } else {
          this.toast.warning('Enter amount as number')
        }
      })
    }
    if (this.data.page === 'company-bill') {
      this.createForm.value.bill_date = this.covertDateIntoTimeStamp(this.createForm.value.bill_date)
      this.createForm.value.trDate = this.covertDateIntoTimeStamp(this.createForm.value.trDate)
    }

    if (this.data.page !== 'company-payment') {
      this.addEntityData()
    }
  }

  addEntityData(): void {
    this.commonService.addEntityData(this.data.page, this.createForm.value).subscribe((data) => {
      this.toast.success(`${this.data.page} successfully added`)
      this.dialogRef.close(true)
    }, (error) => {
      this.toast.error(error)
      this.dialogRef.close(false)
    })
  }

  editData(): void {
    this.commonService.editData(this.data.page, this.data.data.uuid, this.createForm.value).subscribe((data) => {
      this.toast.success('Update successful')
      this.dialogRef.close(true)
    }, (error) => {
      this.toast.error(error)
      this.dialogRef.close(false)
    })
  }

  public covertDateIntoTimeStamp = (date: any) => {
    return moment(date).format('YYYY-MM-DD')
  }

  public covertDateFormate(date: any): any {
    const d = new Date(date)
    return moment(d).format('YYYY-MM-DD')
  }

  public confirm(): void {
    this.dialogRef.close(true)
  }

  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne.uuid === optionTwo.uuid
  }

}
