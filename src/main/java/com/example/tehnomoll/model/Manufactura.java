package com.example.tehnomoll.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "manufactura")
public class Manufactura {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "marka_id")
	private Long id;

	@Column(name = "marka_name")
	private String name;
	
	@Column(name="country")
	private String country;

	@JsonBackReference
	@OneToMany(mappedBy = "marka")
	private List<CarModel> carModel;

	public Manufactura() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public List<CarModel> getCarModel() {
		return carModel;
	}

	public void setCarModel(List<CarModel> carModel) {
		this.carModel = carModel;
	}

}
