import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunsAppComponent } from './runs-app.component';

describe('RunsAppComponent', () => {
  let component: RunsAppComponent;
  let fixture: ComponentFixture<RunsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
