package com.example.tehnomoll.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.tehnomoll.model.AjaxResponseBody;
import com.example.tehnomoll.model.User;
import com.example.tehnomoll.service.UserService;

@Controller
public class AdminController {

	private final UserService userService;

	@Autowired
	public AdminController(UserService userService) {

		this.userService = userService;
	}

	@GetMapping("/refbook")
	public String refbook() {

		return "refbook";
	}

	@PostMapping("/getUsers")
	public ResponseEntity<?> getUsers() {
		AjaxResponseBody result = new AjaxResponseBody();

		result.setResult(userService.getUserList());

		return ResponseEntity.ok(result);
	}

	@PostMapping("/getUser/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id) {
		User user = userService.findByUserId(id);

		return ResponseEntity.ok(user);
	}

	@PostMapping("/editUser")
	public String editUser(User user) {
		userService.editUser(user);
		return "redirect:/adminka";
	}

	@GetMapping("/findLogin/{username}")
	public ResponseEntity<?> findLogin(@PathVariable String username) {

		boolean result = userService.findLogin(username);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/findNameUser/{username}")
	public ResponseEntity<?> findNameUser(@PathVariable String username) {
		AjaxResponseBody result = new AjaxResponseBody();
		if (userService.getUserList(username).size() < 1) {
			result.setMessage("нет таких юзеров блеать");
		}
		result.setResult(userService.getUserList(username));
		return ResponseEntity.ok(result);
	}

	@GetMapping("/delete/{id}")
	public String delUser(@PathVariable Long id) {
		userService.deleteUser(id);

		return "redirect:/adminka";
	}

}
