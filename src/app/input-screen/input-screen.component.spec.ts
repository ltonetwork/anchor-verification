import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScreenComponent } from './input-screen.component';

describe('InputScreenComponent', () => {
  let component: InputScreenComponent;
  let fixture: ComponentFixture<InputScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
