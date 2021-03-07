package com.example.tehnomoll.service;

import java.util.List;

import com.example.tehnomoll.model.Car;
import com.example.tehnomoll.model.CarModel;
import com.example.tehnomoll.model.Engine;
import com.example.tehnomoll.model.Manufactura;
import com.example.tehnomoll.model.Product;

public interface ProductService {

	List<Product> getProductList();
	
	List<Product> findProdOfCategory(String category);
	
	List<Product> findProdOfDetail(String detailName);
	
	List<Product> findProdOfFilter(String category,String detailName,String marka,String model);

	List<Engine> getAllEngines();

	List<Car> getAllCars();
	
	List<Car> getCarsByModel(Long id);

	void saveProduct(Product product);
	
	void editProduct(Product product);
	
	Product createEditProduct(String json);
	
	Product createProduct(String json);
	
	Product getProduct(Long id);

	void saveEngine(Engine engine);

	void saveCarModel(CarModel carModel);

	void saveCar(Car car);

	List<Manufactura> getMarka();

	List<CarModel> getCarModel(String marka);

	void saveMarka(Manufactura marka);

	void deleteCar(Long id);

	void deleteModel(Long id);

	void deleteEngine(Long id);

	Engine getEngineEdit(Long id);

	void editEngine(Engine engine);
	
	CarModel getModelEdit(Long id);
	
	void editModel(CarModel carModel);
	
	Car getCarEdit(Long id);
	
	void editCar(Car car);

}
