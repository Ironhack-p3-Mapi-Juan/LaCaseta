/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReplysService } from './replys.service';

describe('Service: Replys', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplysService]
    });
  });

  it('should ...', inject([ReplysService], (service: ReplysService) => {
    expect(service).toBeTruthy();
  }));
});
