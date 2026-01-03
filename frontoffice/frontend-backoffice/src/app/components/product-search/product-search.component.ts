import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {

  title: string = "Search Product";
  searchText: string = "";

  readonly IMG_WIDTH: number = 100;
  readonly IMG_HEIGHT: number = 100;

  constructor(private service: ProductService) {

  }

  performFilter(): void {
    this.service.filterByName(this.searchText);
  }

  get filteredProducts() {
    return this.service.filteredProducts;
  }

}
