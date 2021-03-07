package com.example.tehnomoll.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
 
	 List<Car> findAllByCarModelId(@Param("id") Long id);
}
