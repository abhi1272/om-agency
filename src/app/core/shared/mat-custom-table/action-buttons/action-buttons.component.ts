import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const TableConsts = {
  actionButton: {
    edit: 'edit',
    delete: 'delete'
  }
}

@Component({
  selector: '[action-buttons]',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  @Input() value: string
  @Output() buttonAction: EventEmitter<any> = new EventEmitter<any>()

  onEditClick() {
    this.buttonAction.emit({
      name: TableConsts.actionButton.edit,
      value: this.value,
    })
  }
  onDeleteClick() {
    this.buttonAction.emit({ name: TableConsts.actionButton.delete, value: this.value })
  }

}
