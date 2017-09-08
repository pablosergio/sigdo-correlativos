import { TestBed, inject } from '@angular/core/testing';

import { CorrelativoService } from './correlativo.service';

describe('CorrelativoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrelativoService]
    });
  });

  it('should be created', inject([CorrelativoService], (service: CorrelativoService) => {
    expect(service).toBeTruthy();
  }));
});
