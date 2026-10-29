import { TestBed } from '@angular/core/testing';
import { PrimengCoreModule } from '../../../primeng-core.module';
import { DropdownFieldComponent } from './dropdown-field.component';

describe('DropdownFieldComponent', () => {
  it('renders a p-select element', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(DropdownFieldComponent);
    fixture.componentInstance.onChangedLoadData.subscribe(() => {});
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('p-select')).not.toBeNull();
    expect(el.querySelector('p-dropdown')).toBeNull();
  });
});
