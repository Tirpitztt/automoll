package com.example.tehnomoll.serviceimpl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.tehnomoll.service.FileService;

@Service
public class FileServiceImpl implements FileService{
	
	private final Path root = Paths.get("D:/ITWork/trening-spring/img");

	@Override
	public void saveFile(MultipartFile file, String fileName, Path root) {
		try {
			System.out.println(root);
			//Files.copy(file.getInputStream(),root.resolve(fileName));
			
		}catch(Exception e) {
			throw new RuntimeException("Что-то пошло не так. Ошибка:"+e.getMessage());
		}
		
	}

	@Override
	public void saveFile(MultipartFile file, String fileName) {
		try {
			System.out.println(root);
			Files.copy(file.getInputStream(),this.root.resolve(fileName));
		}catch(Exception e) {
			throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
		}
		
	}
	
	
}
