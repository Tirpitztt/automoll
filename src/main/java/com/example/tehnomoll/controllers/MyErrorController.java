package com.example.tehnomoll.controllers;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;


import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyErrorController implements ErrorController{

	@RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
		//Object status = request.getAttribute(RequestDispatcher.ERROR__STATUS__CODE);
        return "error";
    }
	
	@Override
	public String getErrorPath() {
		
		return "/error";
	}

}
