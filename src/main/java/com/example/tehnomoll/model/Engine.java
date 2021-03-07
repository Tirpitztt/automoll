package com.example.tehnomoll.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "engine")
public class Engine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "engine_id")
	private Long id;

	@Column(name = "type")
	private String type;

	@Column(name = "volume")
	private String volume;

	@Column(name = "ingection")
	private String ingection;

	@Column(name = "valve")
	private int valve;

	@Column(name = "horse")
	private int horse;

	@Column(name = "number")
	private String number;

	@Column(name = "power")
	private int power;

	@Column(name = "arrang")
	private String arrang;

	@JsonBackReference
	@ManyToMany(mappedBy = "engine")
	private Collection<Car> car;

	public Collection<Car> getCar() {
		return car;
	}

	public void setCar(Collection<Car> car) {
		this.car = car;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getIngection() {
		return ingection;
	}

	public void setIngection(String ingection) {
		this.ingection = ingection;
	}

	public int getValve() {
		return valve;
	}

	public void setValve(int valve) {
		this.valve = valve;
	}

	public int getHorse() {
		return horse;
	}

	public void setHorse(int horse) {
		this.horse = horse;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public int getPower() {
		return power;
	}

	public void setPower(int power) {
		this.power = power;
	}

	public String getArrang() {
		return arrang;
	}

	public void setArrang(String arrang) {
		this.arrang = arrang;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return getVolume() + getIngection();
	}
}
