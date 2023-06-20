import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchKeyword: string = '';
  selectedCategory: string = '';
  categories: string[] = []; // Add this property
  showSuccessMessage: boolean = false;
  

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    this.categories = this.productService.getProductCategories();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showSuccessMessage = true;
    
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }

  

  search(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  sortByName(): void {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByPrice(): void {
    this.filteredProducts.sort((a, b) => a.price - b.price);
  }
}
