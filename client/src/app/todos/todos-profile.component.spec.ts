import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProfileComponent } from './todos-profile.component';

describe('TodosProfileComponent', () => {
  let component: TodosProfileComponent;
  let fixture: ComponentFixture<TodosProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
