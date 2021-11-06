import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { SharedService } from '../../services/shared.service'
import { UploadService } from '../../services/upload.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  blobData
  createForm: FormGroup
  entities
  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any, private uploadService: UploadService,
              public toast: ToastrService,
              public sharedService: SharedService ) { }

  ngOnInit(): void {
    if (this.data.data.config.page_key === 'medicine') {
      this.getEntityData('category')
      this.createForm = new FormGroup({
        medicine_name: new FormControl('', Validators.required),
        manufacturer: new FormControl('', Validators.required),
        composition: new FormControl('', Validators.required),
        MRP: new FormControl('', Validators.required),
        best_price: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        benefits: new FormControl('', Validators.required)
      })
    } else if (this.data.data.config.page_key === 'user') {
      this.getEntityData('role')
      this.createForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        roleId: new FormControl('', Validators.required),
      })
    } else if (this.data.data.config.page_key === 'pharmacist') {
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
      })
    } else if (this.data.data.config.page_key === 'role') {
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        // page: new FormControl('', Validators.required),
        // method: new FormControl('', Validators.required),
        canAccessAll: new FormControl(''),
      })
    } else if (this.data.data.config.page_key === 'category') {
      this.createForm = new FormGroup({
        name: new FormControl('', Validators.required),
      })
    }
    if (this.data.data.editData) {
      this.prePopulateData(this.data.data.editData)
    }
  }

  selectFile(event): any {
    this.uploadService.selectFile(event)
  }

  submit(): void {
    if (this.data.data.config.page_key === 'medicine') {
      const formData: FormData = new FormData()
      formData.append('image', this.uploadService.blobData)
      formData.append('medicine_name', this.createForm.value.medicine_name)
      formData.append('manufacturer', this.createForm.value.manufacturer)
      formData.append('composition', this.createForm.value.composition)
      formData.append('MRP', this.createForm.value.MRP)
      formData.append('best_price', this.createForm.value.best_price)
      formData.append('category', this.createForm.value.category)
      formData.append('description', this.createForm.value.description)
      formData.append('benefits', this.createForm.value.benefits)
      // if (this.data.action === 'Add') {
      //   this.productService.createProduct(formData).subscribe((data) => {
      //     this.toast.success(`${this.data.data.config.page_key} added successfully`)
      //     this.dialogRef.close(true)
      //   }, (error) => {
      //     this.toast.error(error)
      //     console.log(error)
      //   })
      // }else{
      //   this.productService.editProduct(formData, this.data.data.editData.uuid).subscribe((data) => {
      //     this.dialogRef.close(true)
      //   }, (error) => {
      //     console.log(error)
      //   })
      // }
    } else if (this.data.action === 'Add') {
      console.log(this.createForm.value)
      if (this.data.data.config.page_key === 'user') {
        this.createForm.value.roleName = this.entities.find(role => role.uuid === this.createForm.value.roleId).name
      }
      // tslint:disable-next-line:max-line-length
      this.sharedService.addEntityData(this.data.data.config.page_key, this.createForm.value).subscribe((data) => {
        console.log(data)
        this.toast.success(`${this.data.data.config.page_key} added successfully`)
        this.dialogRef.close(true)
      }, (error) => {
        this.toast.error(error)
        this.dialogRef.close(false)
      })
    } else if (this.data.action === 'Edit') {
      console.log(this.createForm.value)
      if (this.data.data.config.page_key === 'user') {
        this.createForm.value.roleName = this.entities.find(role => role.uuid === this.createForm.value.roleId).name
      }
      // tslint:disable-next-line:max-line-length
      this.sharedService.updateEntityData(this.data.data.config.page_key, this.data.data.editData.uuid, this.createForm.value).subscribe((data) => {
        this.toast.success(`${this.data.data.config.page_key} updated successfully`)
        this.dialogRef.close(true)
      }, (error) => {
        this.toast.error(error)
        this.dialogRef.close(false)
      })
    }
  }

  public prePopulateData(data): void {
    console.log(data)
    this.createForm.patchValue({
         ...data
       })
   }

   public cancel(): void {
     this.dialogRef.close(false)
   }

   getEntityData(entity): void {
     this.sharedService.getEntityData(entity).subscribe((data) => {
       console.log('role', data.data)
       this.entities = data.data
     })
   }

   public confirm(): void {
     this.dialogRef.close(true)
   }

}
