import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search-all',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search-all.component.html',
  styleUrl: './product-search-all.component.css'
})
export class ProductSearchAllComponent {

  title: string = "Product List";

  readonly IMG_WIDTH: number = 100;
  readonly IMG_HEIGHT: number = 100;


  constructor(private service: ProductService) {

  }

  get products() {
    return this.service.products;
  }

    get groupedProducts() {
    const grouped: { category: string, products: any[] }[] = [];

    this.products.forEach(p => {
      let group = grouped.find(g => g.category === p.category.name);
      if (!group) {
        group = { category: p.category.name, products: [] };
        grouped.push(group);
      }
      group.products.push(p);
    });

    // opzionale: ordina le categorie alfabeticamente
    grouped.sort((a, b) => a.category.localeCompare(b.category));

    return grouped;
  }


}
