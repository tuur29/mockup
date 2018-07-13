import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolpickerComponent } from './symbolpicker.component';

describe('SymbolpickerComponent', () => {
  let component: SymbolpickerComponent;
  let fixture: ComponentFixture<SymbolpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
