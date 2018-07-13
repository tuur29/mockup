import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearancePanelComponent } from './appearance-panel.component';

describe('AppearancePanelComponent', () => {
  let component: AppearancePanelComponent;
  let fixture: ComponentFixture<AppearancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearancePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
