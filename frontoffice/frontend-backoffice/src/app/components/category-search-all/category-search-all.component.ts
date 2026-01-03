import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/category/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-search-all',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-search-all.component.html',
  styleUrls: ['./category-search-all.component.css']
})
export class CategorySearchAllComponent {
  
  title: string = "Category List";

  // Costanti per dimensioni immagine
  readonly IMG_WIDTH: number = 200;
  readonly IMG_HEIGHT: number = 200;
  
  constructor(private service: CategoryService) {

  }

  get categories(){
    return this.service.categories
  }

}