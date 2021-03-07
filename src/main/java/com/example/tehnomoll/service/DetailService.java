package com.example.tehnomoll.service;

import java.util.List;

import com.example.tehnomoll.model.Detail;

public interface DetailService {

	void saveDetail(Detail detail);
	
	Detail editDetail(Detail detail);
	
	Detail getDetail(Long id);
	
	void deleteDetail(Long id);
	
	List<Detail> getListDetail();
	
	List<Detail> findOfCat(String category);
	
	
	
}
