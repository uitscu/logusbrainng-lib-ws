import { TestBed } from '@angular/core/testing';
import { PrimengCoreModule } from '../../../primeng-core.module';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  it('renders the edit action button icon for each row', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(TableComponent);
    const cmp = fixture.componentInstance;
    cmp.columns = [{ field: 'name', header: 'Nom' }, { isAction: true }];
    cmp.data = [{ name: 'Alpha' }];
    cmp.isCaption = false;
    cmp.onEdit.subscribe(() => {});
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Alpha');
    expect(el.querySelector('.pi-pencil')).not.toBeNull();
  });
});
