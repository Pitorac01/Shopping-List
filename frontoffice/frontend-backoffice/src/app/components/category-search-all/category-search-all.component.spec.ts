import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearchAllComponent } from './category-search-all.component';

describe('CategorySearchAllComponent', () => {
  let component: CategorySearchAllComponent;
  let fixture: ComponentFixture<CategorySearchAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySearchAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySearchAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
