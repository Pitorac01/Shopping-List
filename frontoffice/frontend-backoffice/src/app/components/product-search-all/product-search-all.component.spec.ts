import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchAllComponent } from './product-search-all.component';

describe('ProductSearchAllComponent', () => {
  let component: ProductSearchAllComponent;
  let fixture: ComponentFixture<ProductSearchAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearchAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
