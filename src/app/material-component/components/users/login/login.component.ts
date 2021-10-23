import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { UsersService } from '../../../services/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any = {}
  showSpinner = false
  loading = false

  constructor(private usersService: UsersService, public toast: ToastrService) {
    this.users = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }


  onClickLogin() {
    this.loading = true
    this.usersService.login(this.users)
      .subscribe((res) => {
        this.loading = false
        this.toast.success('Login Successful')
      }, error => {
        this.loading = false
        this.toast.error(error)
      })
  }
}
