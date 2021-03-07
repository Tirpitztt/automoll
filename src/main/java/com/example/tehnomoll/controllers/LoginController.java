package com.example.tehnomoll.controllers;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.tehnomoll.model.User;
import com.example.tehnomoll.repository.DetailRepo;
import com.example.tehnomoll.repository.ManufRepository;
import com.example.tehnomoll.repository.ProductRepository;
import com.example.tehnomoll.repository.RoleRepository;
import com.example.tehnomoll.repository.UserRepository;

@Controller
public class LoginController {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final ManufRepository manufRepository;
	private final ProductRepository prodRepo;
	private final DetailRepo detRepo;

	@Autowired
	public LoginController(UserRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder passwordEncoder,ManufRepository manufRepository,ProductRepository prodRepo,
			DetailRepo detRepo) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.manufRepository = manufRepository;
		this.prodRepo = prodRepo;
		this.detRepo = detRepo;
	}

	@GetMapping("/")
	public String index() {

		return "index";
	}

	@GetMapping("/registration")
	public String registrationPage() {
		return "registration";
	}
/*
	@GetMapping("/adminka")
	public String adminka(Model model) {
		 model.addAttribute("marka", manufRepository.findAll());
		 model.addAttribute("products", prodRepo.findAll());
		 model.addAttribute("details",detRepo.findAll());

		return "adminka";
	}
	*/
	@GetMapping("/addProduct")
	public String addProdPage(Model model) {
		 model.addAttribute("marka", manufRepository.findAll());
		 model.addAttribute("products", prodRepo.findAll());
		 model.addAttribute("details",detRepo.findAll());
		return "addProduct";
	}
	/*
	@GetMapping("/editPage")
	public String editPage(Model model) {
		 model.addAttribute("marka", manufRepository.findAll());
		 model.addAttribute("products", prodRepo.findAll());
		 model.addAttribute("details",detRepo.findAll());
		return "editProduct";
	}*/

	@GetMapping("/home")
	public String hello() {

		return "home";
	}
	
	

	@PostMapping("/save")
	public String saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setActive(1);
		user.setRoles(Collections.singletonList(roleRepository.findByRole("ROLE_USER")));
		user.setUserRole(user.getRoles());
		userRepository.save(user);
		return "redirect:/";
	}

}
