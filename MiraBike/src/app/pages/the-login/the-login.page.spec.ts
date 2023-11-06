import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TheLoginPage } from './the-login.page';

describe('TheLoginPage', () => {
  let component: TheLoginPage;
  let fixture: ComponentFixture<TheLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TheLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
