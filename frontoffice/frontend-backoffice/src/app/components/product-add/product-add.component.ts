import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category/category.service';
import { ProductService } from '../../service/product/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

  title: string = "Add product";
  categories: { id: number; name: string }[] = [];

  name: string = '';
  description: string = '';
  salesType: string = '';
  confectionAmount: number = 0;
  categoryId: number = 0;
  imagePath: string = '';
  selectedFile: File | null = null;

  successMessage: string = '';

  constructor(private categoryService: CategoryService, private service: ProductService, private router:Router) {
    this.loadCategoriesForSelect();
  }

  loadCategoriesForSelect(): void {
    this.categoryService.getCategoriesForSelect().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle categorie:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.imagePath = this.selectedFile.name;
    }
  }

  onSubmit(): void {
    const newProduct = {
      name: this.name,
      description: this.description,
      salesType: this.salesType,
      confectionAmount: this.confectionAmount,
      category: {
        id: this.categoryId
      }
    };

    console.log('Payload inviato:', newProduct);

    if (!this.selectedFile) {
      console.error('Nessun file selezionato');
      return;
    }

    this.service.createProduct(newProduct, this.selectedFile).subscribe({
      next: (res) => {
        console.log('Prodotto creato con successo:', res);
        this.successMessage = 'Product added successfully!';
        this.resetForm();
        this.router.navigateByUrl("/product-search-all");
      },
      error: (err) => {
        console.error('Errore nella creazione del prodotto:', err);
      }
    });
  }

  resetForm(): void {
    this.name = '';
    this.description = '';
    this.salesType = '';
    this.confectionAmount = 0;
    this.categoryId = 0;
    this.imagePath = '';
  }

}
