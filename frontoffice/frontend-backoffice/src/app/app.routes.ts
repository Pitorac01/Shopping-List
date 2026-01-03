import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { CategorySearchAllComponent } from './components/category-search-all/category-search-all.component';
import { ProductSearchAllComponent } from './components/product-search-all/product-search-all.component';
import { CategorySearchComponent } from './components/category-search/category-search.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';


export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'category-search-all', component: CategorySearchAllComponent },
    { path: 'product-search-all', component: ProductSearchAllComponent },
    { path: 'category-search', component: CategorySearchComponent },
    { path: 'product-search', component: ProductSearchComponent },
    { path: 'category-add', component: CategoryAddComponent },
    { path: 'product-add', component: ProductAddComponent },
    { path: 'category-delete', component: CategoryDeleteComponent },
    { path: 'product-delete', component: ProductDeleteComponent }
]