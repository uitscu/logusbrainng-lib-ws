// === Angular Core & Common ===
import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// === RxWeb & Autres Bibliothèques externes ===
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';

// === Services internes ===
import { BreadcrumbService, ConfigService, LayoutService, MenuService } from './services';
import { CipherService } from './security';

// === Pipes personnalisés ===
import { CurrencySpacePipe, LowercasePipe, PluralwordPipe } from './common/pipes';

// === Composants personnalisés ===
import {
  DialogButtonComponent,
  DropdownFieldComponent,
  InputhComponent,
  InputvComponent,
  TableComponent,
  ToolbarComponent
} from './partials/views';

// === Autres éléments internes ===
import { SharedPreferences } from './common/shared';

// === PrimeNG - Services ===
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService } from 'primeng/dynamicdialog';

// === PrimeNG - Modules UI (ordre alphabétique) ===
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from "primeng/paginator";
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { PopoverModule } from 'primeng/popover';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from "primeng/selectbutton";
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from "primeng/table";
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TextareaModule } from 'primeng/textarea';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [
    // Directives declarations
    CurrencySpacePipe,
    LowercasePipe,
    PluralwordPipe,

    // Component declarations
    DialogButtonComponent,
    DropdownFieldComponent,
    InputhComponent,
    InputvComponent,
    TableComponent,
    ToolbarComponent,
  ],
  imports: [
    // === Modules PrimeNG ===
    AccordionModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DatePickerModule,
    DialogModule,
    DividerModule,
    DrawerModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    IconFieldModule,
    ImageModule,
    InputIconModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenubarModule,
    MenuModule,
    MessageModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    PopoverModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SelectModule,
    SkeletonModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepperModule,
    TableModule,
    TabsModule,
    TagModule,
    TerminalModule,
    TextareaModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,

    // === Autres modules (externes ou Angular) ===
    CommonModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    RxReactiveFormsModule,
  ],
  exports: [
    // === Pipes et composants personnalisés ===
    CurrencySpacePipe,
    DialogButtonComponent,
    DropdownFieldComponent,
    InputhComponent,
    InputvComponent,
    LowercasePipe,
    PluralwordPipe,
    TableComponent,
    ToolbarComponent,

    // === Modules PrimeNG ===
    AccordionModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DatePickerModule,
    DialogModule,
    DividerModule,
    DrawerModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    IconFieldModule,
    ImageModule,
    InputIconModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenubarModule,
    MenuModule,
    MessageModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    PopoverModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SelectModule,
    SkeletonModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepperModule,
    TableModule,
    TabsModule,
    TagModule,
    TerminalModule,
    TextareaModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,

    // === Autres modules (externes ou Angular) ===
    CommonModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    RxReactiveFormsModule,
  ],
  providers: [
    BreadcrumbService,
    CipherService,
    ConfigService,
    ConfirmationService,
    CurrencySpacePipe,
    DatePipe,
    DialogService,
    LayoutService,
    LowercasePipe,
    MenuService,
    MessageService,
    PluralwordPipe,
    SharedPreferences,
  ]
})
export class PrimengCoreModule {
}
