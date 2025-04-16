import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dialog-button',
  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.scss']
})
export class DialogButtonComponent {

  @Input() disabled: boolean = false;
  @Input() isLeft: boolean = true;
  @Input() isEdit: boolean = false
  @Input() isPrivilege: boolean = true;
  @Output() onDone: EventEmitter<any> = new EventEmitter();
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onDismissDialog() {
    this.onDismiss.emit();
  }

  onDoneDialog() {
    this.onDone.emit();
  }
}
