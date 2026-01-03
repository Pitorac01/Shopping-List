import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: any[] = [];
  filteredCategories: any[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.loadCategories();
  }

  loadCategories() {
    const url = 'http://localhost:8080/category/all';

    this.httpClient.get<any[]>(url, { headers: this.authService.getAuthHeaders() }).subscribe(data => {
      this.categories = data.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        imagePath: `http://localhost:8080/category/${c.id}/image`,
      }));
      this.filteredCategories = this.categories;
    });
  }

  getCategoriesForSelect(): Observable<{ id: number; name: string }[]> {
    const url = 'http://localhost:8080/category/all';

    return this.httpClient.get<any[]>(url, { headers: this.authService.getAuthHeaders() }).pipe(
      map(data => data.map(cat => ({
        id: cat.id,
        name: cat.name
      })))
    );
  }

  filterByName(name: string): void {
    if (!name || name.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(c =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  }

createCategory(
  category: {
    name: string;
    description: string;
  },
  imageFile: File
): Observable<any> {
  const url = 'http://localhost:8080/category';

  // Costruisci FormData
  const formData: FormData = new FormData();
  formData.append('category', JSON.stringify(category));
  formData.append('image', imageFile);

  return this.httpClient.post<any>(url, formData, { headers: this.authService.getAuthHeaders() }).pipe(
    tap(() => {
      this.loadCategories();
    })
  );
}

  deleteCategory(id: number): Observable<any> {
    const url = `http://localhost:8080/category/${id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => {
        this.loadCategories(); // ricarico la lista dopo la cancellazione
      })
    );
  }


}
