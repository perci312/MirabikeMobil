/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Line_chartComponent } from './line_chart.component';

describe('Line_chartComponent', () => {
  let component: Line_chartComponent;
  let fixture: ComponentFixture<Line_chartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Line_chartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Line_chartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
