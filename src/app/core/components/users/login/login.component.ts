import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { UsersService } from '../../../services/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any
  users: any = {}
  showSpinner = false
  loading = false

  constructor(private usersService: UsersService, public toast: ToastrService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  onClickLogin() {
    this.loading = true
    this.usersService.login(this.loginForm.value)
      .subscribe((res) => {
        this.loading = false
        this.toast.success('Login Successful')
      }, error => {
        this.loading = false
        this.toast.error(error)
      })
  }
}
