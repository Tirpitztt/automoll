package com.example.tehnomoll.service;

import java.nio.file.Path;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	
	void saveFile(MultipartFile file, String fileName, Path root);
	
	void saveFile(MultipartFile file, String fileName);

}
