import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'app/core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      email: new FormControl(''),
      organizations: new FormControl(''),
      password: new FormControl('')
    })
  }

  get getFormControl() { return this.registerForm.controls; }

  onSubmit() {
    if (!this.registerForm.valid) {
      return false;
    }
    const formValues = { ...this.registerForm.value, organizations: [{ name: this.registerForm.value.organizations }] };
    this.usersService.signUp(formValues)  
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
}
