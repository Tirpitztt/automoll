package com.example.tehnomoll.serviceimpl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.tehnomoll.model.Card;
import com.example.tehnomoll.model.Product;
import com.example.tehnomoll.repository.CardRepository;
import com.example.tehnomoll.service.CardService;
import com.example.tehnomoll.service.FileService;

@Service
public class CardServiceImpl implements CardService{
	
	private final CardRepository cardRepository;
	private final FileService fileService;
	
	
	public CardServiceImpl(CardRepository cardRepository,FileService fileService) {
		this.cardRepository = cardRepository;
		this.fileService = fileService;
	}

	@Override
	public void saveCard(Card card) {
		cardRepository.save(card);
		
	}

	@Override
	public void deleteCard(String name) {
		
		
	}

	@Override
	public void saveCards(List<MultipartFile> cards, Product product) {
		for(MultipartFile file:cards) {
			Card card = new Card();
			if(!file.getOriginalFilename().isEmpty()) {
				String uuidFile = UUID.randomUUID().toString();
				String resName = uuidFile + "."+file.getOriginalFilename();
				card.setName(resName);
				card.setProduct(product);
				saveCard(card);
				fileService.saveFile(file, resName);
			}
		}
		
	}

	
}
