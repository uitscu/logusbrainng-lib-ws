import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TableColumn } from '../../models/table-column';
import { PluralwordPipe, Status } from 'projects/primeng-core/src/lib/common';

@Component({
  selector: 'llb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [PluralwordPipe]
})
export class TableComponent implements OnInit, AfterViewInit {

  dataSource: any[] = [];
  menuDataItems: MenuItem[] | undefined;
  dKey: string = 'id';

  @Input() styleClass: string | undefined;
  @Input() confirmDialogKey: any;
  @Input() selectedItem: any;
  @Input() selectedItems: any[] | undefined;
  @Input() columns: TableColumn[] | undefined;
  @Input() tabFilterFields: string[] = [];
  @Input() resizableColumns: boolean = false;
  @Input() showTag: boolean = true;
  @Input() rows: number = 10;
  @Input() items: any[] | undefined;
  @Input() rowsPerPage: number[] = [10, 20, 50, 100];
  @Input() captionTitle: string = 'Tableau des elements';
  @Input() summaryTitle: string | undefined;
  @Input() isPaginator: boolean = true;
  @Input() hasStyle: boolean = false;
  @Input() isSingle: boolean = false;
  @Input() isCaption: boolean = true;
  @Input() isMultiple: boolean = false;
  @Input() disabledEditButton: boolean = false;
  @Input() disabledDeleteButton: boolean = false;
  @Input() routerLink: string | undefined | null

  @Output() onPaginate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onExportExcel: EventEmitter<any> = new EventEmitter();
  @Output() onImportExcel: EventEmitter<any> = new EventEmitter();
  @Output() onRefresh: EventEmitter<Table> = new EventEmitter<Table>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedItems: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickSelectedItems: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMenuOption: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dt') dt?: Table;

  constructor(private confirmationService: ConfirmationService,
    public pluralword: PluralwordPipe) {
  }

  @Input() set menuItems(list: MenuItem[]) {
    this.menuDataItems = list;
  }

  @Input() set dataKey(key: string) {
    this.dKey = key;
  }

  @Input() set data(data: any[]) {
    this.setDataSource(data);
  }

  ngOnInit(): void {
    const columnFields: any[] = this.columns != null ? this.columns.map(
      (tableColumn: TableColumn) => tableColumn.field
    ) : [];

    this.tabFilterFields = columnFields;
  }

  ngAfterViewInit(): void {
  }

  setDataSource(data: any[]) {
    this.dataSource = data;
  }

  openPaginate($event?: any) {
    this.onPaginate.emit($event);
  }

  openAddForm() {
    this.onAdd.emit();
  }

  openExportExcel() {
    this.onExportExcel.emit();
  }

  openSelectedItems() {
    this.onSelectedItems.emit(this.selectedItems);
  }

  onRefreshTable(dt?: Table) {
    dt?.clear();
    this.onRefresh.emit(dt);
  }

  onEditRow($event?: any) {
    this.onEdit.emit($event);
  }

  onDeleteRow($event?: any) {
    this.confirmationService.confirm({
      message: `Etes-vous sûr de vouloir supprimer ${this.setLabel($event)} ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      key: this.confirmDialogKey,
      accept: () => {
        this.onDelete.emit($event);
      }
    });
  }

  setLabel($event: any) {
    if ($event) {
      if ($event.designation) {
        return $event.designation
      } else if ($event.code) {
        return $event.code
      } else if ($event.name) {
        return $event.name
      } else if ($event.nom) {
        return $event.nom
      } else if ($event.noms) {
        return $event.noms
      } else {
        return 'cette information'
      }
    }
    else {
      return ''
    }
  }

  onRowSelected($event?: any) {
    this.onRowSelect.emit($event);
  }

  onRowUnselected($event?: any, table?: Table) {
    this.onRowUnselect.emit({ $event, table });
  }

  isRowSelectable($event?: any) {
    if ($event && $event.data) {
      return this.isOutOfRawData($event.data);
    }
    return true;
  }

  openImportExcel() {
    this.onImportExcel.emit();
  }

  onItemSelectClick($event: any) {
    this.onClickSelectedItems.emit($event)
  }

  isOutOfRawData($event?: any) {
    if ($event && $event.status)
      return $event.status !== Status[Status.CLOSE] || $event.status !== Status[Status.IN_PROGRESS];
    else
      return false;
  }

  filterGlobal($event: Event) {
    const input = $event.target as HTMLInputElement;
    this.dt?.filterGlobal(input.value, 'contains');
  }
}
