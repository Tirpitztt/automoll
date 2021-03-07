package com.example.tehnomoll.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.tehnomoll.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(@Param("email") String email);

	Optional<User> findByUsername(@Param("username") String username);

	Optional<User> findById(@Param("id") Long id);

}
