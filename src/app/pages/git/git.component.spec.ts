import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitComponent } from './git.component';
import { TranslateModule } from '@ngx-translate/core';

describe('GitComponent', () => {
  let component: GitComponent;
  let fixture: ComponentFixture<GitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitComponent ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('PAGES.GIT.TITLE');
  }));
});
