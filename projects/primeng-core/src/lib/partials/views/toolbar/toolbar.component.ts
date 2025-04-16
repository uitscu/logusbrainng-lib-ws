import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { style } from '@angular/animations';

@Component({
  selector: 'llb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  items: MenuItem[] = [];

  @Input() styleClass: string = 'mb-4'
  @Input() routerLink: string | undefined
  @Input() labelAdd: string = 'Ajouter'
  @Input() labelEdit: string = 'Modifier'
  @Input() labelCancel: string = 'Annuler'
  @Input() labelSave: string = 'Enregistrer'
  @Input() labelSaveOption: string = 'Enregistrer'
  @Input() isEdit: boolean = false
  @Input() disabled: boolean = false

  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onPrint: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter();
  @Output() onImportExcel: EventEmitter<any> = new EventEmitter();
  @Output() onExportExecl: EventEmitter<any> = new EventEmitter();
  @Output() onMenuOption: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  @Input() set menuItems(list: MenuItem[]) {
    this.items = list;
  }

  add() {
    this.onAdd.emit();
  }

  edit() {
    this.onEdit.emit();
  }

  save() {
    this.onSave.emit();
  }

  print() {
    this.onPrint.emit();
  }

  saveOption() {
    this.onMenuOption.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  importExcel() {
    this.onImportExcel.emit();
  }

  exportExecl() {
    this.onExportExecl.emit();
  }

  refresh() {
    this.onRefresh.emit();
    window.location.reload();
  }

}
