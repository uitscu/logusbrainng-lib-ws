import { TestBed } from '@angular/core/testing';
import { PrimengCoreModule } from '../../../primeng-core.module';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  it('renders the edit action button icon for each row', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(TableComponent);
    const cmp = fixture.componentInstance;
    cmp.columns = [{ field: 'name', header: 'Nom', isSortable: true }, { isAction: true }];
    cmp.data = [{ name: 'Alpha' }];
    cmp.onEdit.subscribe(() => {});
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Alpha');
    expect(el.querySelector('.pi-pencil')).not.toBeNull();
    expect(el.querySelector('p-sorticon')).not.toBeNull();
    expect(el.querySelector('p-confirmdialog')).not.toBeNull();
  });

  it('keeps striped, gridlines and small size styles and the icon search field', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentInstance.columns = [{ field: 'name', header: 'Nom' }];
    fixture.componentInstance.data = [{ name: 'Alpha' }];
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const table = el.querySelector('p-table')!;
    expect(table.classList.contains('p-datatable-striped')).toBeTrue();
    expect(table.classList.contains('p-datatable-gridlines')).toBeTrue();
    expect(table.classList.contains('p-datatable-sm')).toBeTrue();
    expect(el.querySelector('p-iconfield input[pinputtext]')).not.toBeNull();
  });
});
