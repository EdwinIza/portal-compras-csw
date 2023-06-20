import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';
import { CustomUser } from '../models/custom-user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: Product[] = [];
  isLoggedIn: boolean = false;
  userFullName: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.products = this.productService.getProducts();
    this.checkLoginStatus();
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  viewProductDetails(productId: number): void {
    this.router.navigateByUrl(`/product-details/${productId}`);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.isLoggedIn = false;
    this.userFullName = '';
    this.router.navigate(['/login']);
  }

  private async checkLoginStatus(): Promise<void> {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const user = await this.authService.getCurrentUser();
      if (user) {
        const customUser: CustomUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          confirmEmail: user.confirmEmail,
          password: user.password,
          confirmPassword: user.confirmPassword
        };
        this.userFullName = `${customUser.firstName} ${customUser.lastName}`;
      }
    }
  }
}
