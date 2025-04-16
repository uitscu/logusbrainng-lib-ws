import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent implements OnDestroy {

  private dropdownItems: any[] = []; //
  public dataSource: any[] = [];

  @Input() selectedItem: any = {};
  @Input() identity: string = 'myDropdown';
  @Input() styleClass: string = 'col-12 md:col-12';
  @Input() styleWidth: { [key: string]: string } = { width: '100%' };
  @Input() label: string | undefined | null;
  @Input() optionLabel: string | undefined ;
  @Input() placeholder: string | undefined;
  @Input() hideErrorLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() editable: boolean = false;
  @Input() autoDisplayFirst: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() filter: boolean = true;
  @Input() showClear: boolean = true;

  @ViewChild('dropdownModel') dropdownModel?: NgModel;

  @Output() onChangedLoadData: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  @Input() set data(data: any[]) {
    this.dataSource = data;
  }

  changedLoadData($event: any) {
    if (!this.editable || !this.readonly) {
      if (!this.dropdownItems.includes(this.selectedItem)) {
        this.dropdownItems.push(this.selectedItem);

        this.onChangedLoadData.emit({
          control: this.dropdownModel,
          event: $event,
          item: this.selectedItem
        })
      }
    }
  }

  clear($event: any) {
    if (!this.editable || !this.readonly) {
      this.dropdownItems = [];
      if (this.dropdownModel)
        this.dropdownModel.reset();
    }
    this.onClear.emit($event)
  }

  ngOnDestroy(): void {
    this.dropdownItems = [];
    if (this.dropdownModel)
      this.dropdownModel.reset();
  }
}
