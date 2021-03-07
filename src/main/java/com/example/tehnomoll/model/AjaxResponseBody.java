package com.example.tehnomoll.model;

import java.util.List;

public class AjaxResponseBody {

	private String message;
	private List<User> result;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<User> getResult() {
		return result;
	}

	public void setResult(List<User> result) {
		this.result = result;
	}

}
