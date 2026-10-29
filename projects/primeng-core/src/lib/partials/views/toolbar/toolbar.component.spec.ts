import { TestBed } from '@angular/core/testing';
import { PrimengCoreModule } from '../../../primeng-core.module';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  it('renders the save button with its label and icon', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(ToolbarComponent);
    fixture.componentInstance.onSave.subscribe(() => {});
    fixture.componentInstance.labelSave = 'Enregistrer la fiche';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Enregistrer la fiche');
    expect(el.querySelector('.pi-save')).not.toBeNull();
  });
});
