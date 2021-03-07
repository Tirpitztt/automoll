package com.example.tehnomoll.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.tehnomoll.model.User;
import com.example.tehnomoll.repository.RoleRepository;
import com.example.tehnomoll.repository.UserRepository;
import com.example.tehnomoll.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder passwordEncoder) {
		this.roleRepository = roleRepository;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Optional<User> findByUsername(String username) {

		return userRepository.findByUsername(username);
	}

	@Override
	public Optional<User> findByEmail(String email) {

		return userRepository.findByEmail(email);
	}

	@Override
	public List<User> getUserList() {
		List<User> userList = userRepository.findAll();

		List<User> usersRes = new ArrayList<>();

		for (User user1 : userList) {
			User user = new User();
			user.setId(user1.getId());
			user.setName(user1.getName());
			user.setUsername(user1.getUsername());
			user.setEmail(user1.getEmail());
			user.setUserRole(user1.getRoles());

			usersRes.add(user);

		}

		return usersRes;

	}

	@Override
	public List<User> getUserList(String name) {
		List<User> userList = userRepository.findAll();

		List<User> usersRes = new ArrayList<>();

		for (User user1 : userList) {
			User user = new User();
			user.setId(user1.getId());
			user.setName(user1.getName());
			user.setUsername(user1.getUsername());
			user.setEmail(user1.getEmail());
			user.setUserRole(user1.getRoles());
			if (user.getName().equalsIgnoreCase(name)) {
				usersRes.add(user);
			}
		}

		return usersRes;

	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);

	}

	@Override
	public User findByUserId(Long id) {

		User user = userRepository.findById(id).orElse(new User());
		User userGet = new User();
		userGet.setId(id);
		userGet.setName(user.getName());
		userGet.setUsername(user.getUsername());
		userGet.setEmail(user.getEmail());

		return userGet;
	}

	@Override
	public void editUser(User user) {
		User userOld = userRepository.findById(user.getId()).orElse(new User());
		userOld.setEmail(user.getEmail());
		userOld.setName(user.getName());
		userOld.setUsername(user.getUsername());
		if (!user.getPassword().isEmpty()) {
			userOld.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		userRepository.deleteById(user.getId());

		userRepository.save(userOld);

	}

	@Override
	public boolean findLogin(String username) {
		User user = userRepository.findByUsername(username).orElse(new User());
		if ((user.getUsername() == null || user.getUsername().isEmpty()) || !user.getUsername().equals(username)) {
			return true;
		}

		return false;
	}

}
