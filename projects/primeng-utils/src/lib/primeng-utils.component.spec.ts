import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengUtilsComponent } from './primeng-utils.component';

describe('PrimengUtilsComponent', () => {
  let component: PrimengUtilsComponent;
  let fixture: ComponentFixture<PrimengUtilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimengUtilsComponent]
    });
    fixture = TestBed.createComponent(PrimengUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
