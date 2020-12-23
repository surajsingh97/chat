import { TestBed } from '@angular/core/testing';

import { GetsetService } from './getset.service';

describe('GetsetService', () => {
  let service: GetsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
