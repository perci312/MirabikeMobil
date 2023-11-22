/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Bar_chartComponent } from './bar_chart.component';

describe('Bar_chartComponent', () => {
  let component: Bar_chartComponent;
  let fixture: ComponentFixture<Bar_chartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bar_chartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bar_chartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
