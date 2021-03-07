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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "car")
public class Car {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "car_id")
	private Long id;

	

	@Column(name = "bodycar")
	private String bodyCar;

	@Column(name = "yissue")
	private int yIssue;

	@Column(name = "transmission")
	private String transmission;

	

	@JsonManagedReference
	@OneToOne(optional = false)
	@JoinColumn(name = "model_id")
	private CarModel carModel;

	@JsonManagedReference
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "car_engine", joinColumns = @JoinColumn(name = "car_id"), inverseJoinColumns = @JoinColumn(name = "engine_id"))
	private List<Engine> engine;

	@JsonBackReference
	@OneToMany(mappedBy="car")
	private List<Product> products;
	
	
	public Car() {

	}

	public List<Engine> getEngine() {
		return engine;
	}

	public void setEngine(List<Engine> engine) {
		this.engine = engine;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public String getBodyCar() {
		return bodyCar;
	}

	public void setBodyCar(String bodyCar) {
		this.bodyCar = bodyCar;
	}

	public int getyIssue() {
		return yIssue;
	}

	public void setyIssue(int yIssue) {
		this.yIssue = yIssue;
	}

	public String getTransmission() {
		return transmission;
	}

	public void setTransmission(String transmission) {
		this.transmission = transmission;
	}

	public CarModel getCarModel() {
		return carModel;
	}

	public void setCarModel(CarModel carModel) {
		this.carModel = carModel;
	}

	
	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	@Override
	public String toString() {

		return getEngine() + " " + getyIssue();
	}

}
