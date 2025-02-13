package com.ltev.ecommerce.dao;

import com.ltev.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")       // accept calls from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Spring Data REST endpoint: /api/products/search/findByCategoryId?id=:id
     */
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
