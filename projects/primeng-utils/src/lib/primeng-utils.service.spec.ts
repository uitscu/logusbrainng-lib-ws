import { TestBed } from '@angular/core/testing';

import { PrimengUtilsService } from './primeng-utils.service';

describe('PrimengUtilsService', () => {
  let service: PrimengUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimengUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
