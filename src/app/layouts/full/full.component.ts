import { MediaMatcher } from '@angular/cdk/layout'
import {ChangeDetectorRef, Component, OnDestroy, AfterViewInit, ViewChild} from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { UsersService } from 'app/core/services/users.service'


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList
  user: any
  orgData

  @ViewChild('snav') snav: MatSidenav

  private _mobileQueryListener: () => void

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public userService: UsersService,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
    this.user = this.userService.getUser()
    this.getOrgData()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  getOrgData(): void {
    console.log(this.user)
    const orgId = this.user.orgId
    this.userService.getOrgData(orgId).subscribe((data) => {
      this.orgData = data.data
    }, (error) => {
      console.log(error)
    })
  }

  closeSidenav(): void {
    if (!this.mobileQuery.matches) {
      this.snav.close()
    }
  }

  ngAfterViewInit() {
  }
}
