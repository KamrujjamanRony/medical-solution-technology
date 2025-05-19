import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { ProductsComponent } from './core/pages/products/products.component';
import { ProductDetailsComponent } from './core/components/product-details/product-details.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ProductListComponent } from './core/components/product-list/product-list.component';
import { AboutComponent } from './core/pages/about/about.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { AddProductComponent } from './core/components/add-product/add-product.component';
import { EditProductComponent } from './core/components/edit-product/edit-product.component';
import { AboutUsComponent } from './core/components/about-us/about-us.component';
import { ContactUsComponent } from './core/components/contact-us/contact-us.component';
import { CarouselListComponent } from './core/components/carousel-list/carousel-list.component';
import { AddCarouselComponent } from './core/components/add-carousel/add-carousel.component';
import { EditCarouselComponent } from './core/components/edit-carousel/edit-carousel.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'products/:category',
        component: ProductsComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'mst49',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'products/add-product', component: AddProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'products/edit-product/:id', component: EditProductComponent },
      { path: 'about-us/:id', component: AboutUsComponent },
      { path: 'contact-us/:id', component: ContactUsComponent },
      { path: 'carousel', component: CarouselListComponent },
      { path: 'carousel/add-carousel', component: AddCarouselComponent },
      { path: 'carousel/edit-carousel/:id', component: EditCarouselComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
