import { TestBed } from '@angular/core/testing';
import { PrimengCoreModule } from '../../../primeng-core.module';
import { DialogButtonComponent } from './dialog-button.component';

describe('DialogButtonComponent', () => {
  it('renders the done button with its label and icon', async () => {
    await TestBed.configureTestingModule({ imports: [PrimengCoreModule] }).compileComponents();
    const fixture = TestBed.createComponent(DialogButtonComponent);
    fixture.componentInstance.onDone.subscribe(() => {});
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Enregistrer');
    expect(el.querySelector('.pi-save')).not.toBeNull();
  });
});
