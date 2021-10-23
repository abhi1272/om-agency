import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import * as moment from 'moment'
import { CommonService } from 'app/material-component/services/common.service'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public toast: ToastrService, public dialogRef: MatDialogRef<any>,
    public commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  createForm: any
  query: any
  entityData: any
  expensesCategory = []
  places = []
  today: any
  loading = false
  ngOnInit(): void {
    this.today = moment().format('YYYY-MM-DD')
    const yesterDay = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const selectedDefaultDate = yesterDay
    if (this.data.page === 'customer') {
      this.getPlaceData()
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        place: new FormControl('', Validators.required),
        customer_type: new FormControl('', Validators.required),
        phoneNumber: new FormControl(''),
        notes: new FormControl(''),
      })
    } else if (this.data.page === 'payment') {
      this.createForm = new FormGroup({
        payment_date: new FormControl(selectedDefaultDate, Validators.required),
        paid_amount: new FormControl('', Validators.required),
        notes: new FormControl(''),
      })
    } else if (this.data.page === 'bill') {
      this.createForm = new FormGroup({
        bill_no: new FormControl('', Validators.required),
        bill_amount: new FormControl('', Validators.required),
        bill_date: new FormControl(selectedDefaultDate, Validators.required),
        notes: new FormControl(''),
      })
    } else if (this.data.page === 'expense') {
      this.getCategoryData()
      this.createForm = new FormGroup({
        expenses_date: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        notes: new FormControl('', Validators.required),
      })
    } else if (this.data.page === 'company') {
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        notes: new FormControl(''),
      })
    } else if (this.data.page === 'company-payment') {
      this.createForm = new FormGroup({
        payment_date: new FormControl(selectedDefaultDate, Validators.required),
        paid_amount: new FormControl('', Validators.required),
        check_number: new FormControl('', Validators.required),
        credit_note: new FormControl(''),
        notes: new FormControl(''),
      })
    }

    if (this.data.action === 'edit') {
      this.createForm.patchValue({
        ...this.data.data,
        bill_date: this.covertDateFormate(this.data.data.bill_date),
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
    this.loading = true
    if (this.data.data.page !== 'customer') {
      this.createForm.value.customer_uuid = this.data.data.uuid
    }

    if (this.data.page === 'company') {
      this.createForm.value.type = 'company'
      console.log(this.createForm.value)
    }

    if (this.data.page === 'payment') {
      this.createForm.value.payment_date = this.covertDateIntoTimeStamp(this.createForm.value.payment_date)

    }
    if (this.data.page === 'bill') {
      this.createForm.value.bill_date = this.covertDateIntoTimeStamp(this.createForm.value.bill_date)
    }
    this.commonService.addEntityData(this.data.page, this.createForm.value).subscribe((data) => {
      this.toast.success('successfully added')
      this.loading = true
      this.dialogRef.close(true)
    }, (error) => {
      this.toast.error(error)
      this.loading = true
      this.dialogRef.close(false)
    })
  }

  editData(): void {
    this.commonService.editData(this.data.page, this.data.data.uuid, this.createForm.value).subscribe((data) => {
      this.toast.success('Update successful')
      this.dialogRef.close(true)
      this.loading = true
    }, (error) => {
      this.toast.error(error)
      this.loading = true
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

  public getCategoryData(): void {
    this.commonService.getEntityData('category').subscribe((data) => {
      this.expensesCategory = data.data
    }, (error) => {
      console.log(error)
    })
  }

  public getPlaceData(): void {
    this.commonService.getEntityData('place').subscribe((data) => {
      this.places = data.data.map((item: any) => {
        return {
          name: item.name,
          uuid: item.uuid
        }
      })
      console.log(this.places)
    }, (error) => {
      console.log(error)
    })
  }

  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne.uuid === optionTwo.uuid
  }

}
