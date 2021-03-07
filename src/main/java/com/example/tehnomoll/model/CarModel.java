package com.example.tehnomoll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "carmodel")
public class CarModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "model_id")
	private Long id;

	@Column(name = "model_name")
	private String name;

	@Column(name = "model_secname")
	private String secName;

	@Column(name = "ystart")
	private int yStart;

	@Column(name = "yend")
	private int yEnd;

	@Column(name = "m")
	private String m;

	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name = "marka_id")
	private Manufactura marka;

	@JsonBackReference
	@OneToOne(mappedBy = "carModel", fetch = FetchType.LAZY)
	private Car car;

	public CarModel() {

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

	public String getSecName() {
		return secName;
	}

	public void setSecName(String secName) {
		this.secName = secName;
	}

	public int getyStart() {
		return yStart;
	}

	public void setyStart(int yStart) {
		this.yStart = yStart;
	}

	public int getyEnd() {
		return yEnd;
	}

	public void setyEnd(int yEnd) {
		this.yEnd = yEnd;
	}

	public Manufactura getMarka() {
		return marka;
	}

	public void setMarka(Manufactura marka) {
		this.marka = marka;
	}

	@Override
	public boolean equals(Object obj) {
		boolean flag = false;
		if (obj == this) {
			return true;
		}
		if (obj == null || obj.getClass() != this.getClass()) {
			return false;
		}
		CarModel guest = (CarModel) obj;

		if (guest.getName().equalsIgnoreCase(this.getName())
				&& guest.getSecName().equalsIgnoreCase(this.getSecName())) {
			flag = true;
		}

		return flag;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return getName();
	}

	public String getM() {
		return m;
	}

	public void setM(String m) {
		this.m = m;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}
}
