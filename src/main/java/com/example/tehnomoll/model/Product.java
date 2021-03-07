package com.example.tehnomoll.model;

import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Long id;

	@Column(name = "art")
	private String art;

	@Column(name = "name")
	private String name;

	@Column(name = "status")
	private boolean status;

	@Column(name = "price")
	private int price;

	@Column(name = "side")
	private String side;

	@Column(name = "front")
	private String front;

	@Column(name = "text_client")
	private String textClient;

	@Column(name = "text_server")
	private String textServer;
	
	@Column(name="category")
	private String category;

	@JsonBackReference
	@OneToMany(mappedBy="products")
	private List<Card> cards;
	
	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name="car_id")
	private Car car;
	
	@Column(name="car_id_temp")
	private Long carIdTemp;

	public Product() {
		
	}

	
	public Long getCarIdTemp() {
		return carIdTemp;
	}


	public void setCarIdTemp(Long carIdTemp) {
		this.carIdTemp = carIdTemp;
	}


	public String getTextClient() {
		return textClient;
	}

	public void setTextClient(String textClient) {
		this.textClient = textClient;
	}

	public String getTextServer() {
		return textServer;
	}

	public void setTextServer(String textServer) {
		this.textServer = textServer;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getArt() {
		return art;
	}

	public void setArt(String art) {
		this.art = art;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getSide() {
		return side;
	}

	public void setSide(String side) {
		this.side = side;
	}

	public String getFront() {
		return front;
	}

	public void setFront(String front) {
		this.front = front;
	}
	

	public List<Card> getCards() {
		return cards;
	}

	public void setCards(List<Card> cards) {
		this.cards = cards;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}
	
	

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {

		return getId() + " "+getName() + " " + getPrice() + " " + getArt()+ " "+getCards();
	}

}
