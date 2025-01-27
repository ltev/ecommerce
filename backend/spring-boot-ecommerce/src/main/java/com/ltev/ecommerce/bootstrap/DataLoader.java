package com.ltev.ecommerce.bootstrap;

import com.ltev.ecommerce.dao.ProductCategoryRepository;
import com.ltev.ecommerce.dao.ProductRepository;
import com.ltev.ecommerce.entity.Product;
import com.ltev.ecommerce.entity.ProductCategory;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@AllArgsConstructor
public class DataLoader implements CommandLineRunner {

    private ProductCategoryRepository productCategoryRepository;
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {

        ProductCategory laptop = new ProductCategory("laptop");
        ProductCategory tv = new ProductCategory("tv");
        ProductCategory dvd = new ProductCategory("dvd");
        ProductCategory book = new ProductCategory("book");

        productCategoryRepository.saveAll(List.of(laptop, tv, dvd, book));

        Product book1 = Product.builder()
                .name("Around the world")
                .description("Adventure book")
                .category(book)
                .unitPrice(new BigDecimal("15.99"))
                .active(true)
                .unitsInStock(12)
                .imageUrl("images/products/around-the-world.jpg")
                .build();

        Product book2 = Product.builder()
                .name("Into the jungle")
                .description("Adventure book")
                .category(book)
                .unitPrice(new BigDecimal("15.99"))
                .active(true)
                .unitsInStock(12)
                .imageUrl("images/products/around-the-world.jpg")
                .build();

        productRepository.saveAll(List.of(book1, book2));
    }
}
