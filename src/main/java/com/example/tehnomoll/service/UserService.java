package com.example.tehnomoll.service;

import java.util.List;
import java.util.Optional;

import com.example.tehnomoll.model.User;

public interface UserService {

	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

	User findByUserId(Long id);

	List<User> getUserList();

	void deleteUser(Long id);

	void editUser(User user);

	boolean findLogin(String username);

	List<User> getUserList(String name);
}
