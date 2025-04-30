// === Angular Core & Common ===
import { DatePipe } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// === RxWeb & Autres Bibliothèques externes ===
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';

// === Services internes ===
import { BreadcrumbService, ConfigService, LayoutService, MenuService } from '../lib/services';
import { CipherService } from '../lib/security';

// === Pipes personnalisés ===
import { CurrencySpacePipe, LowercasePipe, PluralwordPipe } from '../lib/common/pipes';

// === Composants personnalisés ===
import {
  DialogButtonComponent,
  DropdownFieldComponent,
  InputhComponent,
  InputvComponent,
  TableComponent,
  ToolbarComponent
} from '../lib/partials/views';

// === Autres éléments internes ===
import { SharedPreferences } from '../lib/common/shared';

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
import { CalendarModule } from "primeng/calendar";
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from "primeng/paginator";
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from "primeng/table";
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';


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
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TimelineModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,

    // === Autres modules (externes ou Angular) ===
    FormsModule,
    NgxExtendedPdfViewerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
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
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TimelineModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,

    // === Autres modules (externes ou Angular) ===
    FormsModule,
    NgxExtendedPdfViewerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
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
