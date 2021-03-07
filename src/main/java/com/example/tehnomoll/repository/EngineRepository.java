package com.example.tehnomoll.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.tehnomoll.model.Engine;

@Repository
public interface EngineRepository extends JpaRepository<Engine, Long> {

	Engine findByNumber(@Param("number") int number);

}
