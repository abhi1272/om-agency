import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { UsersService } from 'app/core/services/users.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any

  constructor(private usersService: UsersService, public toast: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      orgName: new FormControl(''),
      password: new FormControl('')
    })
  }

  get getFormControl() { return this.registerForm.controls }

  onSubmit() {
    if (!this.registerForm.valid) {
      return false
    }
    const formValues = { ...this.registerForm.value}
    this.usersService.signUp(formValues)
      .subscribe(data => {
        this.toast.success('successfully registered!')
        console.log(data)
      }, error => {
        this.toast.success(error)
        console.log(error)
      })
  }
}
