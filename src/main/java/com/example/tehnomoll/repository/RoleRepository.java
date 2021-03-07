package com.example.tehnomoll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findByRole(@Param("role") String role);
}
