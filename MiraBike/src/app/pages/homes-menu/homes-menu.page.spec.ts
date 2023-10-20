import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomesMenuPage } from './homes-menu.page';

describe('HomesMenuPage', () => {
  let component: HomesMenuPage;
  let fixture: ComponentFixture<HomesMenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomesMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
