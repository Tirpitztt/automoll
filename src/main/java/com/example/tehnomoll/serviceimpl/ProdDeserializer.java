package com.example.tehnomoll.serviceimpl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.tehnomoll.model.Car;
import com.example.tehnomoll.model.Product;
import com.example.tehnomoll.repository.CarRepository;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.node.BooleanNode;
import com.fasterxml.jackson.databind.node.IntNode;
import com.fasterxml.jackson.databind.node.LongNode;

public class ProdDeserializer extends StdDeserializer<Product>{
	
	

	public ProdDeserializer() {
		this(null);
	}
	
	public ProdDeserializer(Class<?> vc) {
		super(vc);
		
	}

	@Override
	public Product deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		JsonNode node = p.getCodec().readTree(p);
		
		String art = node.get("art").asText();
		String name = node.get("name").asText();
		String status = node.get("status").asText();
		String price = node.get("price").asText();
		int carID = (Integer)((IntNode)node.get("car")).numberValue();
		String side = node.get("side").asText();
		String front = node.get("front").asText();
		String textClient = node.get("textClient").asText();
		String textServer = node.get("textServer").asText();
		String category = node.get("category").asText();
		Product prod = new Product();
		
		prod.setArt(art);
		prod.setName(name);
		System.out.println(status);
		if(status.equalsIgnoreCase("1")) {
			prod.setStatus(true);
		}else {
			prod.setStatus(false);
		}
		prod.setPrice(Integer.parseInt(price));
		prod.setCarIdTemp(Long.valueOf(carID));
		prod.setSide(side);
		prod.setFront(front);
		prod.setTextClient(textClient);
		prod.setTextServer(textServer);
		prod.setCategory(category);
		
		return prod;
	}

	
}
