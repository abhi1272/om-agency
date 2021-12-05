
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BillService {
  apiUrl = environment.url
  constructor(public http: HttpClient) { }

  getBillByCustomer(uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bill/${uuid}`)
  }

  getPaymentsByBill(uuid: string, uuidType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment?${uuidType}=${uuid}`)
  }

  getPaymentsByDate(date: any, type?: string): Observable<any> {
    if (type) {
      return this.http.get(`${this.apiUrl}/payment?payment_date=${date}&&type=${type}`)
    }
    return this.http.get(`${this.apiUrl}/payment?payment_date=${date}`)

  }

  getBillsByDate(date: any, type?): Observable<any> {
    if (type) {
      return this.http.get(`${this.apiUrl}/bill?bill_date=${date}&&type=${type}`)
    }
    return this.http.get(`${this.apiUrl}/bill?bill_date=${date}`)
  }

  getPaymentALl(type?): Observable<any> {
    if (type) {
      return this.http.get(`${this.apiUrl}/payment?type=${type}`)
    }
    return this.http.get(`${this.apiUrl}/payment`)
  }

  addEntityData(entityName: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${entityName}/add`, data)
  }

  editData(entityName: string, uuid: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${entityName}/${uuid}`, data)
  }

  deleteData(entityName: string, uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${entityName}/${uuid}`, {})
  }

  updateData(uuid: string, entity: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/crud/${entity}/${uuid}`, data)
  }
}


