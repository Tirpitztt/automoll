package com.example.tehnomoll.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.tehnomoll.model.Detail;
import com.example.tehnomoll.service.DetailService;

@Controller
public class DetailController {

	
	private final DetailService detailService;
	
	@Autowired
	public DetailController(DetailService detailService) {
		this.detailService = detailService;
	}
	
	@PostMapping("/saveDetail")
	public String saveDetail( Detail detail) {
		detailService.saveDetail(detail);
		return "refbook";
	}
	
	@GetMapping("/getDetails")
	public ResponseEntity<?> getDetails(){
		List<Detail> allDetail = detailService.getListDetail();
		return ResponseEntity.ok(allDetail);
	}
	
	@PostMapping("/getDetail/{id}")
	public ResponseEntity<Detail> getDetail(@PathVariable Long id){
		Detail detail = detailService.getDetail(id);
		return ResponseEntity.ok(detail);
	}
	
	@PostMapping("/editDetail")
	public String editDetail(Detail detail) {
		detailService.editDetail(detail);
		return "refbook";
	}
	
	@GetMapping("/deleteDetail/{id}")
	public String deleteDetail(@PathVariable Long id) {
		detailService.deleteDetail(id);
		return "refbook";
	}
}
