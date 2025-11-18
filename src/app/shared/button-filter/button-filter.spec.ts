import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFilter } from './button-filter';

describe('ButtonFilter', () => {
  let component: ButtonFilter;
  let fixture: ComponentFixture<ButtonFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
