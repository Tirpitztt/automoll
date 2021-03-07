package com.example.tehnomoll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.CarModel;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

}
