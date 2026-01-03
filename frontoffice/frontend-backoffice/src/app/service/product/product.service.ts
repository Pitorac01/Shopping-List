import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.loadProducts();
  }

  loadProducts() {
  const url = 'http://localhost:8080/product/all';

  this.httpClient.get<any[]>(url, { headers: this.authService.getAuthHeaders() }).subscribe(data => {
    this.products = data.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      salesType: p.salesType,
      confectionAmount: p.confectionAmount,
      category: { name: p.category?.name },
      imagePath: `http://localhost:8080/product/${p.id}/image`,
      confectionWeight: p.confectionWeight
    }));
    this.filteredProducts = this.products;
  });
}


  filterByName(name: string): void {
    if (!name || name.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(c =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  }

createProduct(
  product: {
    name: string;
    description: string;
    salesType: string;
    confectionAmount: number;
    category: { id: number };
  },
  imageFile: File
): Observable<any> {
  const url = 'http://localhost:8080/product';

  const formData: FormData = new FormData();
  formData.append('product', JSON.stringify(product));
  formData.append('image', imageFile);

  return this.httpClient.post<any>(url, formData, { headers: this.authService.getAuthHeaders() }).pipe(
    tap(() => {
      this.loadProducts();
    })
  );
}

  deleteCategory(id: number): Observable<any> {
    const url = `http://localhost:8080/product/${id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => {
        this.loadProducts();
      })
    );
  }

}