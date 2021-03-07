package com.example.tehnomoll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
