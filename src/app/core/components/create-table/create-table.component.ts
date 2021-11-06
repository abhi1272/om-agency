import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/core/services/common.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  fieldTypes = ['String', 'Number', 'UUID', 'Array', 'Boolean', 'Buffer']
  booleanArr = [true, false]
  tableForm: any

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.tableForm =  new FormGroup({
      modelName: new FormControl('', Validators.required),
      modelObj: new FormArray([this.createItem()])
    })
    console.log(this.tableForm)
  }

  public createItem(): any {
    return new FormGroup({
      fieldName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      require: new FormControl(''),
      unique: new FormControl(''),
      default: new FormControl('')
    })
  }

  public addItem(): void {
    this.tableForm.modelObj = this.tableForm.get('modelObj') as FormArray
    this.tableForm.modelObj.push(this.createItem())
  }

  public removeItem(index: number): void {
    this.tableForm.modelObj = this.tableForm.get('modelObj') as FormArray
    this.tableForm.modelObj.removeAt(index)
  }

  public saveForm(): void {
    console.log(this.tableForm.value)
    this.tableForm.value.modifiedModelObj = this.modifyData()
    // this.tableForm.value.oldModelObj = this.tableForm.value.modelObj
    this.commonService.createTable(this.tableForm.value).subscribe((data) => {
        console.log(data)
     }, (error) => {
       console.log(error)
     })
  }

  public modifyData(): any {
    let modifyObj = {}
    this.tableForm.value.modelObj.map((item: any) => {
      const newObj =  { [item.fieldName.toLowerCase()] : {
        type: item.type,
        require: item.require,
        unique: item.unique,
        default: item.default
        }
      }
      modifyObj = {...modifyObj, ...newObj}
    })
    return [modifyObj]
  }

}
