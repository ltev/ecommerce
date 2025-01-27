package com.ltev.ecommerce.config;

import com.ltev.ecommerce.entity.Product;
import com.ltev.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // disable HTTP methods (put, post and delete) for class Product and ProductCategory
        for (Class clazz : new Class[]{Product.class, ProductCategory.class}) {
            config.getExposureConfiguration()
                    .forDomainType(clazz)
                    .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                    .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
        }
    }
}
