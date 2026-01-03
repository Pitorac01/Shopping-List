import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category/category.service';

@Component({
  selector: 'app-category-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './category-search.component.html',
  styleUrl: './category-search.component.css'
})
export class CategorySearchComponent {

  title: string = "Search Category";
  searchText: string = "";

  readonly IMG_WIDTH: number = 200;
  readonly IMG_HEIGHT: number = 200;

  constructor(private service: CategoryService) {

  }

  performFilter(): void {
    this.service.filterByName(this.searchText);
  }

  get filteredCategories() {
    return this.service.filteredCategories;
  }


}
