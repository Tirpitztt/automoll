package com.example.tehnomoll.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.tehnomoll.model.Card;
import com.example.tehnomoll.model.Product;

public interface CardService {

	void saveCard(Card card);
	void deleteCard(String name);
	void saveCards(List<MultipartFile> cards,Product product);
	
}
