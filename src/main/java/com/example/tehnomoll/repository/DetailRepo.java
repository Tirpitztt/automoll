package com.example.tehnomoll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.Detail;

@Repository
public interface DetailRepo extends JpaRepository<Detail,Long>{

}
