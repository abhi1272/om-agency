
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl = environment.url
  selectDefaultDate = ''
  dateFormat = 'dd-MM-yyy'
  constructor(public dialog: MatDialog, public http: HttpClient) { }

  openDialog(componentName: any, data: object, width = '550px'): Observable<any> {
    const dialogRef = this.dialog.open(componentName, {
      width: width,
      data,
      disableClose: true
    })

    return dialogRef.afterClosed()
  }

  createTable(data): Observable<any> {
    return this.http.post(`${this.apiUrl}/createTable`, data)
  }

  // CRUD

  getEntityData(entityName: string, transaction_type?): Observable<any> {
    if (transaction_type) {
      return this.http.get(`${this.apiUrl}/${entityName}?type=${transaction_type}`)
    }
    return this.http.get(`${this.apiUrl}/${entityName} `)
  }

  addEntityData(entityName: string, data: any): Observable<any> {
    if (entityName === 'company-payment') {
      entityName = 'payment'
    }
    return this.http.post(`${this.apiUrl}/${entityName}/add`, data)
  }

  editData(entityName: string, uuid: string, data: any): Observable<any> {
    if (entityName === 'company-payment') {
      entityName = 'payment'
    }
    return this.http.patch(`${this.apiUrl}/${entityName}/${uuid}`, data)
  }

  deleteData(entityName: string, uuid: string): Observable<any> {
    if (entityName === 'company-payment') {
      entityName = 'payment'
    }
    return this.http.delete(`${this.apiUrl}/${entityName}/${uuid}`, {})
  }

  updateData(uuid: string, entity: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/crud/${entity}/${uuid}`, data)
  }

  archiveData(uuid: string, entity: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${entity}/${uuid}`, data)
  }
}


