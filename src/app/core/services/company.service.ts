import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl = environment.url
  constructor(public http: HttpClient) { }

  getBillByCustomer(uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/company-bill/${uuid}`)
  }

  getPaymentsByBill(uuid: string, uuidType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/company-payment?${uuidType}=${uuid}`)
  }

  getPaymentsByDate(date: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/company-payment?payment_date=${date}`)
  }

  getBillsByDate(date: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/company-bill?bill_date=${date}`)
  }

  getPaymentALl(): Observable<any> {
    return this.http.get(`${this.apiUrl}/company-payment`)
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


