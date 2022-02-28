import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import * as moment from 'moment'
import { CommonService } from 'app/core/services/common.service'
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
    console.log('data', this.data)
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
      if (this.data.action === 'edit') {
        this.createForm.patchValue({
          ...this.data.data,
          bill_date: this.covertDateFormate(this.data.data.bill_date),
          payment_date: this.covertDateFormate(this.data.data.payment_date),
        })
      }
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
        date: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        notes: new FormControl('', Validators.required),
      })
    } else if (this.data.page === 'place' || this.data.page === 'category') {
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required)
      })
    } else if (this.data.page === 'user') {
      this.createForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl(''),
        userName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        mobileNumber: new FormControl(''),
        password: new FormControl('', Validators.required),
        place: new FormControl('', Validators.required)
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
    if (this.data.pages === 'customer') {
      this.createForm.value.customer_uuid = this.data.data.uuid
    }
    if (this.data.data && this.data.data.customer_uuid) {
      this.createForm.value.customer_uuid = this.data.data.customer_uuid
    }

    if (this.data.data && this.data.data.bill_uuid) {
      this.createForm.value.bill_uuid = this.data.data.bill_uuid
    }


    // if (this.data.page === 'company') {
    //   this.createForm.value.type = 'Purchase'
    // } else if (this.data.page === 'customer') {
    //   this.createForm.value.type = 'Sale'
    // }

    if (this.data.page === 'payment') {
      this.createForm.value.payment_date = this.covertDateIntoTimeStamp(this.createForm.value.payment_date)
      const payments = `${this.createForm.value.paid_amount}`.split(',')
      payments.map((payment) => {
        if (!isNaN(+payment)) {
          this.createForm.value.paid_amount = +payment
          this.addEntityData()
        } else {
          this.loading = false
          this.toast.warning('Enter amount as number')
        }
      })
    }
    if (this.data.page === 'bill') {
      this.createForm.value.bill_date = this.covertDateIntoTimeStamp(this.createForm.value.bill_date)
    }

    if (this.data.page !== 'payment') {
      this.addEntityData()
    }
  }

  addEntityData(): void {
    this.commonService.addEntityData(this.data.page, this.createForm.value).subscribe((data) => {
      this.toast.success(`${this.data.page} successfully added`)
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
      if (this.data.page === 'user') {
        this.createForm.patchValue({ place: [this.places[0]] })
      }
    }, (error) => {
      console.log(error)
    })
  }

  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne.uuid === optionTwo.uuid
  }

}
