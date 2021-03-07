package com.example.tehnomoll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.Manufactura;

@Repository
public interface ManufRepository extends JpaRepository<Manufactura, Long> {

	Manufactura findByName(@Param("name") String name);
}
