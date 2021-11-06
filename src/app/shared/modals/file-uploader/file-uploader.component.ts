import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgxImageCompressService } from 'ngx-image-compress'
import { ToastrService } from 'ngx-toastr'
import { UploadService } from '../../services/upload.service'

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  file: any
  localUrl: any
  localCompressedURl: any
  sizeOfOriginalImage: number
  sizeOFCompressedImage: number
  imgResultBeforeCompress: string
  imgResultAfterCompress: string
  blobData

  @Input() accept = '.xlsx, .xls'

  @ViewChild('fileInput', { static: true }) myInputVariable: ElementRef

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any, private imageCompress: NgxImageCompressService,
              public toast: ToastrService, public uploadService: UploadService ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  selectFile(event): void{
    this.uploadService.selectFile(event)
  }

  addPrescription(): void {
    const formData: FormData = new FormData()
    formData.append('prescription', this.uploadService.blobData)
    // this.productService.addPrescription(formData).subscribe((data) => {
    //   this.toast.success('File Uploaded successfully')
    // }, (error) => {
    //   this.toast.error(error)
    // })
  }
}
