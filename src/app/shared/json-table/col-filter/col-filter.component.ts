import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
import * as _ from 'lodash'
import * as moment from 'moment'
import { SharedService } from '../../../shared/services/shared.service'

@Component({
  selector: 'app-col-filter',
  templateUrl: './col-filter.component.html',
  styleUrls: ['./col-filter.component.scss']
})
export class ColFilterComponent implements OnInit {

  @Input() _role: any

  @Output() sendFilteredData = new EventEmitter()

  @ViewChild('filterName', { static: true }) filterName: ElementRef

  public filterObj
  public downlodObj =
    { 'export_to_excel': true }
  public filterColumns = []
  public multipleVal = []
  public checkedColumns: any = []
  public pushdata = false
  public classNames = []
  public filteredDataCount: number
  public roleName: string
  public checkedColumnNames = []
  public savedfilterNames = []
  public selectedValues: any = []
  public selected
  public singleInputValue = []
  public extraFieldArr: any = []
  public options: any = [{ name: 'lt', label: 'Less Than' }, { name: 'gt', label: 'More Than' }]
  public roleNameObj = { 'name': 'role_name', 'value': 'student' }
  fieldNames = new FormControl()
  checkedVals = new FormControl()
  selectedFilter = new FormControl()
  public refreshData = false
  public extraFileds
  public entityFields
  public applyFilterFlag = false
  public a: any

  // array in local storage for registered users


  constructor(
     public sharedService: SharedService
  ) { }

  ngOnInit() {
    console.log(this.sharedService.filterObj)
    this.filterObj = this.sharedService.filterObj
    this.roleName = this.sharedService.roleName

    const filterAppliedCols = this._role.columns.filter((item => item.filter)).map((item => item.key))
    this.createFilterObject(filterAppliedCols)

    this.fieldNames.valueChanges.subscribe((data) => {
        if (_.difference(this.filterObj.filters,
          this._role.configData.landing_behaviour.filters, _.isEqual) && this._role.configData.landing_behaviour.filters.length > 0) {
          return false
        }

        const newArrrr = this.filterColumns.filter((item) => {
          if (data.includes(item.label)) {
            return item
          }
        })
        this.sharedService.checkedColumns = newArrrr

      this.checkedColumnNames = []
      if (this.sharedService.checkedColumns.length !== 0) {
        this.sharedService.checkedColumns.map((item) => {
          this.checkedColumnNames.push(item['name'])
        })
      } else {
        this.checkedColumnNames = []
      }

      this.removeFilter()
    })

  }
  getData(event, checkedCol, toDate) {
    let value
    if (event === 'remove') {
      if (checkedCol.values) {
        value = []
      } else {
        value = ''
      }
    } else if (event) {
      if (checkedCol.data_type === 'number') {
        value = event.value
      } else if (toDate) {
        value = [moment(event).unix(), moment(toDate).unix()]
      } else {
        value = event.val ? event.val : `${event.target.value}`
      }
    }


    if (checkedCol.values) {
      const obj = {
        'name': checkedCol.name,
        'values': value,
        'type': checkedCol.type
      }
      this.setFilter(obj)
    } else if (checkedCol.data_type === 'date') {
      const obj = {
        'name': checkedCol.name,
        'values': value,
        'op': 'range'
      }
      this.setFilter(obj)
    } else {
      const obj = {
        'name': checkedCol.name,
        'value': value
      }
      if (checkedCol.type) {
        obj['type'] = checkedCol.type
      }
      if (checkedCol.data_type === 'number') {
        obj['op'] = this.selected
      }

      if (typeof(obj.value) === 'string') {
        obj['op'] = 'like'
      }

      this.setFilter(obj)
    }
  }



  public setFilter(obj) {
    this.sharedService.downlodObj.export_to_excel = false
    this.filterObj.filters.map((item) => {
      if (item.name === obj.name) {
        if (obj.value) {
          item.value = obj.value
          item.op = obj.op
          this.pushdata = false
        } else if ((obj.values && obj.values.length > 0)) {
          item.values = obj.values
          this.pushdata = false
        } else {
          this.removeDataFromFilter(obj)
        }
      } else {
        const found = this.filterObj.filters.some(el => el.name === obj.name)
        if (!found) {
          this.pushdata = true
        }

      }

    })

    if ((obj.value || (obj.values && obj.values.length > 0)) && this.pushdata) {
      this.filterObj.filters.push(obj)
    }
    if (this.filterObj.filters.length === 0 && (obj.value || (obj.values && obj.values.length > 0))) {
      this.filterObj.filters.push(obj)
    }

    if (this.sharedService.previousUrlData.url.length === 0) {
      this.getDataFromApi()
    }
  }

  // code here
  public createFilterObject(filterAppliedCols) {

  this._role.columns.map((item) => {
    if (item.filter) {
         const filterColumnObj = {
          'name': item.key,
          'label': item.name,
          'data_type': item.type.name
        }
        if (item.type.name === 'enum') {
          const result = []
          Object.keys(item.type.values).map(function(key) {
            result.push({'value': item.type.values[key], 'label': key})
          })
          filterColumnObj['values'] = result
        }
       this.filterColumns.push(filterColumnObj)

      }
    })

  }

  public getDataFromApi() {
    console.log('data-api-called')
    this.sharedService.filterObj.filters = this.filterObj.filters

    const filter = JSON.stringify(this.sharedService.filterObj)

    this.sharedService.getApiFilteredData(this.sharedService.apiDetails, filter).subscribe((data) => {
      this.sendFilteredData.emit(data)
      this.filteredDataCount = data['total']
      this.sharedService.filterDataCountDisplay = this.filteredDataCount
    })
  }

  public removeFilter() {

    this.filterObj.filters.map((item) => {
      console.log(this._role.configData.api_details.fixed_faql.filters, this.checkedColumnNames)
      if (!this.checkedColumnNames.includes(item.name) &&
      !this._role.configData.api_details.fixed_faql.filters.map(item => item.name).includes(item.name)) {
        if (item.value !== this.roleName) {
          this.getData('remove', item, null)
        }
      }
    })
  }

  public removeDataFromFilter(obj) {
    let ind
    ind = this.filterObj.filters.findIndex(function (element) {
      return element.name === `${obj.name}`
    })
    if (ind !== -1) {
      this.filterObj.filters.splice(ind, 1)
    }
  }

  public getFilterNames() {
    const faql = {
      'filters': [{
        'name': 'role_name',
        'value': this.roleName
      }],
      'sort': [{
        'name': 'created_date',
        'order': 'desc'
      }]
    }

    // this.sharedService.getDataFromSavedFilter(JSON.stringify(faql)).subscribe((data) => {
    //   this.savedfilterNames = data["data"]
    // }, (error) => {
    // });
  }

  Dowload() {
    // this.sharedService.downloadFile(this.sharedService.apiDetails)
  }

}
