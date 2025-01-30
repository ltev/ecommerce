package com.ltev.ecommerce.config;

import com.ltev.ecommerce.entity.Product;
import com.ltev.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@AllArgsConstructor
public class DataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

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

        // call an internal helper method
        exposeIdsForAllEntityClasses(config);
    }

    private void exposeIdsForAllEntityClasses(RepositoryRestConfiguration config) {
        // list all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        /// create an array of the entity types
        List<Class<?>> entityClasses = new ArrayList<>();
        for (EntityType<?> entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }

        // expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(Class[]::new);
        config.exposeIdsFor(domainTypes);
    }
}
