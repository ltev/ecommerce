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

  defaultCategoryId = 1;
  defaultCategoryName = 'Books';

  products!: Product[];
  currentCategoryId!: number;
  previousCategoryId = -1;
  currentCategoryName!: string;
  searchMode!: boolean;

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 12;
  pageTotalElements!: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}      // current active route that loaded the component
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');    // search keyword parameter
    if (this.searchMode) {
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
      this.previousCategoryId = -1;
    }

    // angular will reuse a component if it is currently being viewed
    // reset pageNumber to default 1 when different category
    if (this.currentCategoryId != this.previousCategoryId) {
      this.pageNumber = 1;
      this.previousCategoryId = this.currentCategoryId;
    }

    // in Angular pages are 1-based, in Spring Data REST 0-based
    this.productService.getProductListPaginate(this.currentCategoryId, this.pageNumber - 1, this.pageSize)
      .subscribe(data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.pageTotalElements = data.page.totalElements;
      });
    console.log(`Page: ${this.pageNumber}, Total elements: ${this.pageTotalElements}`);
  }
}
