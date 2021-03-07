package com.example.tehnomoll.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tehnomoll.model.Detail;
import com.example.tehnomoll.repository.DetailRepo;
import com.example.tehnomoll.service.DetailService;

@Service
public class DetailServiceImpl implements DetailService{

	private final DetailRepo detRepo;
	
	@Autowired
	public DetailServiceImpl(DetailRepo detRepo) {
		this.detRepo= detRepo;
	}
	
	@Override
	public void saveDetail(Detail detail) {
		detRepo.save(detail);
		
	}

	@Override
	public Detail getDetail(Long id) {
		Detail detail = detRepo.findById(id).orElse(new Detail());
		return detail;
	}

	@Override
	public void deleteDetail(Long id) {
		detRepo.deleteById(id);
		
	}

	@Override
	public List<Detail> getListDetail() {
		List<Detail> allDetail = detRepo.findAll();
		return allDetail;
	}

	@Override
	public Detail editDetail(Detail detail) {
		Detail old = detRepo.findById(detail.getId()).orElse(new Detail());
		old = detail;
		detRepo.save(old);
		return null;
	}

	@Override
	public List<Detail> findOfCat(String category) {
		List<Detail> allDet = detRepo.findAll();
		List<Detail> result = new ArrayList<>();
		for (Detail detail : allDet) {
			if(detail.getCategory().equalsIgnoreCase(category)) {
				result.add(detail);
			}
		}
		return result;
	}

	

}
