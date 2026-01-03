import { Component } from '@angular/core';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product-delete',
  imports: [],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent {

  title = 'Delete Category';
  successMessage: string = '';
  constructor(private service: ProductService) {

  }

  get products() {
    return this.service.products;
  }

  onDelete(id: number): void {
    this.service.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'Product deleted!';
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }

}
