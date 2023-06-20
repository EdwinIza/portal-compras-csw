import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, category: 'laptops', description: 'Laptop HP' },
    { id: 2, name: 'Celular', price: 500,category: 'celulares', description: 'Celular LG' },
    { id: 3, name: 'Audífonos', price: 100,category: 'audifonos', description: 'Audifono Corsair' },
    // Agrega más productos según tus necesidades
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductCategories(): string[] {
    // Implement your logic to get the product categories from your data source
    // For example:
    return ['laptops', 'celulares', 'audifonos'];
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}
