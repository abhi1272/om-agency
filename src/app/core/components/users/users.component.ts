import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { CreateComponent } from 'app/core/shared/modals/create/create.component'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columns = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'firstName', header: 'Name' }
  ]
  data: any[] = [];
  dialogData: any = {
    page: 'user',
    title: `Add User`,
    pages: 'user',
    action: 'create',
    data: {}
  }

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserPlace();
  }

  getUserPlace() {
    this.commonService.getEntityData('user')
      .subscribe(({ data }) => {
        this.data = data;
        console.log(data);
      }, error => {
        console.log(error);
      })
  }

  onTableAction(event) {
    if (event.name === 'edit') {
      this.dialogData.title = 'Edit User';
      this.dialogData.action = event.name;
      this.dialogData.data = event.value;
      const value = this.commonService.openDialog(CreateComponent, this.dialogData)
      value.subscribe((data) => {
        if (data) {
          this.getUserPlace()
        }
      });
    }
    else if (event.name === 'delete') {
      this.commonService.deleteData('user', event.value.id)
        .subscribe(data => {
          this.toastr.success('User deleted successfully')
          this.getUserPlace();
        }, (error) => {
          this.toastr.error(error);
        });
    }
  }
}
