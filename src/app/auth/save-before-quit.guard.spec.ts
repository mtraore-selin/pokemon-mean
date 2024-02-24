import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { SaveBeforeQuitGuard } from './save-before-quit.guard';

describe('checkoutGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      SaveBeforeQuitGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
