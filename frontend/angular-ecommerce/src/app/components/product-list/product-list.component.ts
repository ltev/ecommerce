import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  defaultCategoryId = 1;
  defaultCategoryName = 'Books';
  currentCategoryId: number = this.defaultCategoryId;
  currentCategoryName: string = this.defaultCategoryName;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}      // current active route that loaded the component
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const searchMode: boolean = this.route.snapshot.paramMap.has('keyword');    // search keyword parameter
    if (searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // search for the products using keyword
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {
    // check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // '+' converts string to number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;    // '!' non null assertion operator
      this.currentCategoryName = this.route.snapshot.paramMap.get('categoryName')!;
    } else {
      this.currentCategoryId = this.defaultCategoryId;
      this.currentCategoryName = this.defaultCategoryName;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
