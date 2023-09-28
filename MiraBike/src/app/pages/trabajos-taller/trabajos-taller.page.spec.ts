import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajosTallerPage } from './trabajos-taller.page';

describe('TrabajosTallerPage', () => {
  let component: TrabajosTallerPage;
  let fixture: ComponentFixture<TrabajosTallerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrabajosTallerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
