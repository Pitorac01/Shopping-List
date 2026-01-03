import { Component } from '@angular/core';
import { CategoryService } from '../../service/category/category.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  imports: [FormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {

  title: string = "Add category";

  name: string = '';
  description: string = '';
  imagePath: string = '';
  selectedFile: File | null = null;

  successMessage: string = '';

  constructor(private service: CategoryService, private router:Router) {

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.imagePath = this.selectedFile.name;
    }
  }

  onSubmit(): void {
    const category = {
      name: this.name,
      description: this.description,
    };

    console.log('Payload inviato:', category);

    if (!this.selectedFile) {
      console.error('Nessun file selezionato');
      return;
    }

    this.service.createCategory(category, this.selectedFile).subscribe({
      next: (res) => {
        console.log('Category successfully created :', res);
        this.successMessage = 'Category added successfully!';
        this.resetForm();
        this.router.navigateByUrl("/category-search-all");
      },
      error: (err) => {
        console.error('Error during the creation :', err);
      }
    });
  }

    resetForm(): void {
    this.name = '';
    this.description = '';
    this.imagePath = '';
  }

}
