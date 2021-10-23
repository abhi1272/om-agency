import { Component } from '@angular/core';
import { UsersService } from 'app/material-component/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(public usersService: UsersService) { }
}
