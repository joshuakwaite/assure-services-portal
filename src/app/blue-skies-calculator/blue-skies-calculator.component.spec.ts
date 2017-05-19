import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueSkiesCalculatorComponent } from './blue-skies-calculator.component';

describe('BlueSkiesCalculatorComponent', () => {
  let component: BlueSkiesCalculatorComponent;
  let fixture: ComponentFixture<BlueSkiesCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueSkiesCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueSkiesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
