package com.example.tehnomoll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="details")
public class Detail {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="detail_id")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="articul")
	private String articul;
	
	@Column(name="category")
	private String category;
	
	public Detail() {
		
	}

	
	public String getArticul() {
		return articul;
	}


	public void setArticul(String articul) {
		this.articul = articul;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
	
	
}
