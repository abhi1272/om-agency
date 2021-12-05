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

  getDayWiseData(dateObj: any, filter: any, type: string): Observable<any> {
    if (filter) {
      return this.http.get(`${this.apiUrl}/dashboard/daily?start_date=${dateObj.start_date}&&end_date=${dateObj.end_date}&${type}=${JSON.stringify(filter)}`)
    }
    return this.http.get(`${this.apiUrl}/dashboard/daily?start_date=${dateObj.start_date}&&end_date=${dateObj.end_date}`)
  }

  getTotalData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/total`)
  }

  getDataByArea(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/area/data`)
  }

  getMonthlyData(filter: Array<string>, type: string): Observable<any> {
    if (filter) {
      return this.http.get(`${this.apiUrl}/dashboard/monthly?${type}=${JSON.stringify(filter)}`)
    }
    return this.http.get(`${this.apiUrl}/dashboard/monthly`)
  }

}


