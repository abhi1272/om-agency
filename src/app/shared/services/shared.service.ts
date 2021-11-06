import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { ComponentType } from '@angular/cdk/portal'


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public filterObj = { filters: [] }
  cartCount = 0
  quantityCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  public downlodObj =
    { export_to_excel: true }
  public roleName: any
  public roleAttributes: any
  public filterDataCountDisplay: any
  public helpRoleName: any
  public previousUrlData = {
    url: '',
    gadgetTitle: ''
  }
  public apiUrl = environment.url
  apiDetails: any
  previousFilter: any
  timeTableEditData: any
  checkedColumns = []

  constructor(public http: HttpClient, public dialog: MatDialog) { }

  getTableConfig(key: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/design?page_key=${key}`)
  }

  getTableData(api: any, filter: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${api.api_url}`)
  }

  getApiFilteredData(api: any, filter: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${api.api_url}?paql=${filter}`)
  }

  getEntityData(entity: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${entity}`)
  }

  getDataById(model: string, uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${model}/${uuid}`)
  }


  addEntityData(model: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${model}/add`, data)
  }

  updateEntityData(model: any, uuid: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${model}/${uuid}`, data)
  }

  deleteEntityData(model: any, uuid: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${model}/${uuid}`)
  }

  public openDialog(data = {}, componentName: ComponentType<unknown>, width = '500px'): any{
    const dialogRef = this.dialog.open(componentName, {
      width,
      data,
      disableClose: true
    })
    return dialogRef.afterClosed()
  }

}
