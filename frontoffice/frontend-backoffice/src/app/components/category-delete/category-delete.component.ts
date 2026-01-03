import { Component } from '@angular/core';
import { CategoryService } from '../../service/category/category.service';

@Component({
  selector: 'app-category-delete',
  imports: [],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent {

  title = 'Delete Category';
  successMessage: string = '';
  constructor(private service: CategoryService) {

  }

  get categories() {
    return this.service.categories;
  }

  onDelete(id: number): void {
    this.service.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted!';
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }
}
