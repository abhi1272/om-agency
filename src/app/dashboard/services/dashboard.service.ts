import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl = environment.url
  constructor(public http: HttpClient) { }

  getDayWiseData(dateObj: any, filter: any, type: string, transaction_type: string): Observable<any> {
    if (filter) {
      return this.http.get(`${this.apiUrl}/dashboard/daily?start_date=${dateObj.start_date}&&end_date=${dateObj.end_date}&${type}=${JSON.stringify(filter)}&transaction_type=${transaction_type}`)
    }
    return this.http.get(`${this.apiUrl}/dashboard/daily?start_date=${dateObj.start_date}&&end_date=${dateObj.end_date}&&transaction_type=${transaction_type}`)
  }

  getTotalData(transaction_type?): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/total?transaction_type=${transaction_type}`)
  }

  getDataByArea(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/area/data`)
  }

  getMonthlyData(filter: Array<string>, type: string, transaction_type: string): Observable<any> {
    if (filter) {
      return this.http.get(`${this.apiUrl}/dashboard/monthly?${type}=${JSON.stringify(filter)}`)
    } else if (transaction_type) {
      return this.http.get(`${this.apiUrl}/dashboard/monthly?transaction_type=${transaction_type}`)
    } else if (filter && transaction_type) {
      return this.http.get(`${this.apiUrl}/dashboard/monthly?${type}=${JSON.stringify(filter)}&transaction_type=${transaction_type}`)
    }
    return this.http.get(`${this.apiUrl}/dashboard/monthly`)
  }

}


