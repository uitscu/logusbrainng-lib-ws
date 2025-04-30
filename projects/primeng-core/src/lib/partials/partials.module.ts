import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DialogButtonComponent, DropdownFieldComponent, InputhComponent, InputvComponent, TableComponent, ToolbarComponent } from "@logusbrain/primeng/partials/views";


@NgModule({
  declarations: [
    ToolbarComponent,
    TableComponent,
    InputvComponent,
    InputhComponent,
    DialogButtonComponent,
    DropdownFieldComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    //Component exports
    ToolbarComponent,
    TableComponent,
    InputvComponent,
    InputhComponent,
    DialogButtonComponent,
    DropdownFieldComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ]
})
export class PartialsModule { }
