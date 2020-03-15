import { TestBed } from '@angular/core/testing';

import { CompressorService } from './compressor.service';

describe('CompressorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompressorService = TestBed.get(CompressorService);
    expect(service).toBeTruthy();
  });
});
