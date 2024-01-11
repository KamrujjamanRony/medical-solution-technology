import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AppFooterComponent } from './core/components/app-footer/app-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './core/pages/home/home.component';
import { CarouselComponent } from './core/components/carousel/carousel.component';
import { HammerModule } from '@angular/platform-browser';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroComponent } from './core/components/hero/hero.component';
import { OurProductsComponent } from './core/components/our-products/our-products.component';
import { CoverComponent } from './core/components/cover/cover.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { DropdownMenuComponent } from './core/components/dropdown-menu/dropdown-menu.component';
import { ProductCardComponent } from './core/components/product-card/product-card.component';
import { ProductsComponent } from './core/pages/products/products.component';
import { ProductDetailsComponent } from './core/components/product-details/product-details.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './core/components/product-list/product-list.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { AboutComponent } from './core/pages/about/about.component';
import { AddProductComponent } from './core/components/add-product/add-product.component';
import { EditProductComponent } from './core/components/edit-product/edit-product.component';
import { DeleteConfirmationModalComponent } from './core/components/delete-confirmation-modal/delete-confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutUsComponent } from './core/components/about-us/about-us.component';
import { ContactUsComponent } from './core/components/contact-us/contact-us.component';
import { CarouselListComponent } from './core/components/carousel-list/carousel-list.component';
import { AddCarouselComponent } from './core/components/add-carousel/add-carousel.component';
import { EditCarouselComponent } from './core/components/edit-carousel/edit-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppFooterComponent,
    HomeComponent,
    CarouselComponent,
    HeroComponent,
    OurProductsComponent,
    CoverComponent,
    HeaderComponent,
    DropdownMenuComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductDetailsComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    DashboardComponent,
    SidebarComponent,
    BannerComponent,
    ProductListComponent,
    AboutComponent,
    ContactComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteConfirmationModalComponent,
    AboutUsComponent,
    ContactUsComponent,
    CarouselListComponent,
    AddCarouselComponent,
    EditCarouselComponent,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HammerModule,
    IgxCarouselModule,
    IgxSliderModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class AppModule {}
