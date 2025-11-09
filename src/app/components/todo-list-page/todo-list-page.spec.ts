import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoList } from './todo-list-page';

describe('ToDoList', () => {
  let component: ToDoList;
  let fixture: ComponentFixture<ToDoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
