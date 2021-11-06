import { Component, OnInit, Inject, Input, EventEmitter, Output, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SelectionModel } from '@angular/cdk/collections'
import * as moment from 'moment'
import { ActivatedRoute, Router } from '@angular/router'
import { PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { SharedService } from '../../../shared/services/shared.service'
import { CreateComponent } from '../../modals/create/create.component'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-json-table-creation',
  templateUrl: './json-table-creation.component.html',
  styleUrls: ['./json-table-creation.component.css']
})

export class JsonTableCreationComponent implements OnInit, OnDestroy {


  @Input() configData: any

  @Output() editAction = new EventEmitter()

  @Output() addAction = new EventEmitter()

  @Output() copyAction = new EventEmitter()

  @Output() paginationData = new EventEmitter()

  displayedColumns: string[] = []
  displayedColumnsObj: any
  dataSource = new MatTableDataSource<any>()
  pageEvent: PageEvent
  pageIndex: number
  pageSize: number
  length: number
  localPagination = false
  apiResultData
  public initColumns: any = []
  sortColumnName
  direction = 'desc'
  selection = new SelectionModel<any>(true, [])
  dataFound
  sortObj
  filterObj
  api_details
  timeStampFormat
  colConfigData
  studentClone
  allColumns = []
  previousFilterDetails
  refreshFlag = false
  showData

  constructor(
    public http: HttpClient,
    public sharedService: SharedService,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {

    if (this.configData) {
      this.createConfigData()
    }
  }

  createConfigData(): void {

    if (this.configData['landing_behaviour'] && this.configData['landing_behaviour'].meta.selection) {
      this.displayedColumns.push('select')
      this.initColumns.push({ name: 'select', key: 'select' })
    }
    this.configData['columns'].forEach((item) => {

      if (!item.hidden) {
        this.allColumns.push(item)
      }
      if (item.column_priority === 'primary') {
        this.displayedColumns.push(item.key)
        this.initColumns.push(item)
      }
    })
    this.colConfigData = {
      displayedColumns: this.displayedColumns,
      initColumns: this.initColumns,
      allColumns: this.allColumns
    }
    this.api_details = this.configData['api_details']
    this.sharedService.apiDetails = this.api_details
    this.initializeMasterData()
  }

  initializeMasterData(): void {

    const page = {
      pageSize: 10,
      pageIndex: 0
    }

    this.getServerData(page)

  }

  getServerData(page): void {
    this.pageSize = page.pageSize
    this.pageIndex = page.pageIndex
    this.getDataByFaql()
  }

  getDataByFaql(): void {

    const pageObj = {
       page_size: this.pageSize,
       page_num : this.pageIndex + 1
     }

    this.sortObj = [{
      name: this.sortColumnName ? this.sortColumnName : 'created_date',
      order: this.direction
    }]

    if (this.configData.landing_behaviour.meta.pagination) {
      this.sharedService.filterObj['pagination'] = pageObj
    }

    if (this.configData.landing_behaviour.filters && this.configData.landing_behaviour.filters.length > 0) {
      // tslint:disable-next-line:max-line-length
      this.sharedService.filterObj.filters = this.configData.landing_behaviour.filters.length > 0 ? this.configData.landing_behaviour.filters : this.sharedService.filterObj.filters
    }

    if (this.route.snapshot.queryParams['show'] && !this.refreshFlag) {
      this.showData = JSON.parse(this.route.snapshot.queryParams['show'])
      this.sharedService.filterObj.filters = [{ 'name': 'entity_uuid', 'value': this.showData.id }]
      this.sharedService.previousUrlData.url = 'student'
    }

    this.sharedService.filterObj['sort'] = this.sortObj

    this.sharedService.filterObj = {...this.sharedService.filterObj, ...this.api_details.fixed_faql}

    const filter = JSON.stringify(this.sharedService.filterObj)
    //  this.sharedService.getUsersByFilter(filter).subscribe((data) => {
    this.sharedService.getTableData(this.api_details, filter).subscribe((data) => {
      this.getFilteredData(data)
      this.setInitialFilterData()
      this.sharedService.filterDataCountDisplay = this.length
      this.filterObj = {
        tableData: this.apiResultData,
        columns: this.initColumns,
        configData: this.configData
      }
      this.dataFound = true
    }, (error) => {
      console.log(error)
    })
   }

  sortData(sortData): void {
    if (sortData.direction === '') {
      sortData.direction = 'asc'
    }

    this.sortColumnName = sortData.active
    this.direction = sortData.direction
    this.getDataByFaql()
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): any {
      if (this.dataFound) {
        const numSelected = this.selection.selected.length
        const numRows = this.apiResultData.data.length
        return numSelected === numRows
      }

    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle(): any {
      this.isAllSelected() ?
          this.selection.clear() :
          this.apiResultData.data.forEach(row => this.selection.select(row))
    }

    /** The label for the checkbox on the passed row */
   checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`

    }

  getFilteredData(event): any {
    const dateColDateArr = this.configData.columns.filter(item => item.type && item.type.name === 'date').map(item => item.key)
    event.data = event.data || []
    const apiResultData = event.data.map((element, i) => {
      dateColDateArr.forEach((item) => {
        element[item] = moment(element[item] * 1000).format(this.getDateFormat(item))
      })
      return element
    })

    this.studentClone = apiResultData
    this.length = event.total
    console.log(this.length)
    this.apiResultData = new MatTableDataSource<any>(apiResultData)
  }

    getDateFormat(dateName): any {
      const result = this.configData.columns.filter(item => item.key === dateName).map(item => item.type.format)[0]
      return result
    }

  changeTableData(event): void {

    this.displayedColumns = event
    if (!this.displayedColumns.includes('select') &&
      this.configData.landing_behaviour &&
      this.configData.landing_behaviour.selection) {
      this.displayedColumns.unshift('select')
    }

    event.forEach((col) => {

      const colString = JSON.stringify(this.initColumns)
      if (colString.indexOf(col) === -1) {

        const foundObj = this.allColumns.find(item => item.key === col)
        this.initColumns.push(foundObj)
      }

    })


  }

  add(key, page): any {
    const addObject = {
      page: page ? page : this.configData.page_name,
      action: 'Add',
      data: {
        config: (this.configData.external_actions &&
          this.configData.external_actions.find(item => item.page_key === key)) ?
          this.configData.external_actions.find(item => item.page_key === key) :
          { page_key: key, page_name: page }, userDetail:
          this.selection.selected[0]
      },
      // configData: this.configData
    }

    this.sharedService.openDialog(addObject, CreateComponent, '700px').subscribe((data) => {
      this.refreshData(data)
    })
  }

  edit(ele): any {
    const editObject = {
      page: this.configData.page_name,
      action: 'Edit',
      data: { config: this.configData, editData: ele },
      configData: this.configData
    }
    this.sharedService.openDialog(editObject, CreateComponent , '600px').subscribe((data) => {
      this.refreshData(data)
    })
  }

  delete(ele): any {
    const confirmObject = {
      page: this.configData.page_name,
      action: 'confirm',
      data: { config: { page_key: 'confirm', page_name: 'confirm' } }
    }

    this.sharedService.openDialog(confirmObject, CreateComponent, '400px').subscribe((data) => {
      if (data) {
        this.sharedService.deleteEntityData(this.configData.page_key, ele.uuid).subscribe((data) => {
          this.toastr.success('Delete successful')
          this.refreshData(true)
        }, (error) => {
          this.toastr.success(error)
          console.log(error)
        })
      }
    })
  }

  refreshData(result): any {

    if (result === 'clear-filter') {
      this.refreshFlag = true
      this.sharedService.filterObj.filters = []
      this.sharedService.previousUrlData.gadgetTitle = ''
      this.sharedService.previousUrlData.url = ''
      this.sharedService.previousFilter = ''
      this.previousFilterDetails = ''
      if (this.route.snapshot.queryParams.show) {
        this.router.navigateByUrl('/future-app/document-wallet')
      }
      this.configData.landing_behaviour.filters = []
      this.selection.clear()
      this.initializeMasterData()
    } else if (result === true) {
      setTimeout(() => {
        this.initializeMasterData()
      }, 2000)
    }
  }

  setInitialFilterData(): void {
    if (this.sharedService.previousUrlData.url === 'student') {
      this.previousFilterDetails = `You're seeing documents for student : ${this.showData.name}`
    } else if (this.sharedService.previousUrlData && this.sharedService.previousUrlData.url.length > 0) {
      this.previousFilterDetails = `${this.length} Data selected From Dashboard For ${this.sharedService.previousUrlData.gadgetTitle}`
    } else if (this.configData.landing_behaviour.filters.length > 0 &&
      this.configData.landing_behaviour.meta && this.configData.landing_behaviour.meta.name) {
      this.previousFilterDetails = `${this.length} Data selected For ${this.configData.landing_behaviour.meta.name}`
    }
    this.sharedService.previousFilter = this.previousFilterDetails
  }

  ngOnDestroy(): void {
    this.sharedService.filterObj = { filters: [] }
  }
}
