package com.example.tehnomoll.serviceimpl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tehnomoll.model.Car;
import com.example.tehnomoll.model.CarModel;
import com.example.tehnomoll.model.Engine;
import com.example.tehnomoll.model.Manufactura;
import com.example.tehnomoll.model.Product;
import com.example.tehnomoll.repository.CarModelRepository;
import com.example.tehnomoll.repository.CarRepository;
import com.example.tehnomoll.repository.EngineRepository;
import com.example.tehnomoll.repository.ManufRepository;
import com.example.tehnomoll.repository.ProductRepository;
import com.example.tehnomoll.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final EngineRepository engineRepository;
	private final CarRepository carRepository;
	private final CarModelRepository carModelRepository;
	private final ManufRepository mRepository;
	

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository, EngineRepository engineRepository,
			CarRepository carRepository, CarModelRepository carModelRepository, ManufRepository mRepository) {
		this.carModelRepository = carModelRepository;
		this.carRepository = carRepository;
		this.engineRepository = engineRepository;
		this.productRepository = productRepository;
		this.mRepository = mRepository;
	}

	@Override
	public List<Product> getProductList() {
		List<Product> allProduct = productRepository.findAll();

		for (Product prod : allProduct) {

		}
		return allProduct;
	}

	@Override
	public List<Engine> getAllEngines() {
		List<Engine> allEngine = engineRepository.findAll();

		return allEngine;
	}

	@Override
	public List<Car> getAllCars() {
		List<Car> allCars = carRepository.findAll();

		return allCars;
	}
	@Override
	public List<Car> getCarsByModel(Long id) {
		List<Car> cars = carRepository.findAll();
		List<Car> carsMod = new ArrayList<>();
		for(Car car:cars) {
			if(car.getCarModel().getId()==id) {
				carsMod.add(car);
			}
		}
		return carsMod;
	}
	@Override
	public List<Product> findProdOfCategory(String category) {
		List<Product> allProd = productRepository.findAll();
		if(category=="all") {
			return allProd;
		}
		List<Product> result = new ArrayList<>();
		for (Product product : allProd) {
			if(product.getCategory().equalsIgnoreCase(category)) {
				result.add(product);
			}
		}
		return result;
	}

	@Override
	public List<Product> findProdOfDetail(String detailName) {
		
		return null;
	}

	@Override
	public List<Product> findProdOfFilter(String category, String detailName, String marka, String model) {
		
		return null;
	}
	

	@Override
	public void saveProduct(Product product) {
		productRepository.save(product);
	}

	@Override
	public void saveEngine(Engine engine) {

		engineRepository.save(engine);

	}

	@Override
	public void saveCarModel(CarModel carModel) {
		boolean flag = false;
		Manufactura marka = new Manufactura();
		List<Manufactura> allMarka = mRepository.findAll();
		for (Manufactura m : allMarka) {
			if (m.getName().equalsIgnoreCase(carModel.getM())) {
				carModel.setMarka(m);
				flag = true;
			}
		}
		if (!flag) {
			marka.setName(carModel.getM());
			mRepository.save(marka);
			marka = mRepository.findByName(carModel.getM());
			carModel.setMarka(marka);
		}

		List<CarModel> modelList = carModelRepository.findAll();

		for (CarModel mod : modelList) {
			if (mod.equals(carModel)) {
				return;
			}
		}
		carModelRepository.save(carModel);

	}

	@Override
	public void saveCar(Car car) {

		carRepository.save(car);

	}

	@Override
	public List<Manufactura> getMarka() {
		List<Manufactura> result = mRepository.findAll();

		return result;
	}

	@Override
	public List<CarModel> getCarModel(String marka) {
		List<Manufactura> allMarka = mRepository.findAll();
		List<CarModel> modelist = new ArrayList<>();
		for (Manufactura m : allMarka) {
			if (marka.equals(m.getName())) {
				modelist = m.getCarModel();
			}
		}

		System.out.println(modelist);
		return modelist;
	}

	@Override
	public void saveMarka(Manufactura marka) {
		mRepository.save(marka);

	}

	@Override
	public void deleteCar(Long id) {
		carRepository.deleteById(id);

	}

	@Override
	public void deleteModel(Long id) {
		carModelRepository.deleteById(id);

	}

	@Override
	public void deleteEngine(Long id) {
		engineRepository.deleteById(id);

	}

	@Override
	public Engine getEngineEdit(Long id) {

		Engine result = engineRepository.findById(id).orElse(new Engine());

		return result;
	}

	@Override
	public void editEngine(Engine engine) {
		Engine old = engineRepository.findById(engine.getId()).orElse(new Engine());
		old = engine;
		engineRepository.save(old);

	}

	@Override
	public Product createProduct(String json) {
		Product product = new Product();
		ObjectMapper mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(Product.class, new ProdDeserializer());
		mapper.registerModule(module);
		try {
			product = mapper.readValue(json,Product.class);
		}catch(Exception e) {
			e.getMessage();
		}
		product.setCar(carRepository.findById(product.getCarIdTemp()).orElse(new Car()));
		return product;
	}

	@Override
	public Product getProduct(Long id) {
		Product product = productRepository.findById(id).orElse(new Product());
		return product;
	}
	@Override
	public Product createEditProduct(String json) {
		
		Product product = new Product();
		ObjectMapper mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(Product.class, new ProdEditDeserializer());
		mapper.registerModule(module);
		try {
			product = mapper.readValue(json,Product.class);
		}catch(Exception e) {
			e.getMessage();
		}
		product.setCar(carRepository.findById(product.getCarIdTemp()).orElse(new Car()));
		return product;
	}
	
	@Override
	public void editProduct(Product product) {
		Product old = productRepository.findById(product.getId()).orElse(new Product());
		
		System.out.println(old.getCar());
		if(product.getCarIdTemp()==0) {
			product.setCar(old.getCar());
		}
		System.out.println(product.getCar());
		old = product;
		saveProduct(old);
		
	}

	@Override
	public CarModel getModelEdit(Long id) {
		CarModel mod = carModelRepository.findById(id).orElse(new CarModel());
		return mod;
	}

	@Override
	public void editModel(CarModel carModel) {
		CarModel old = carModelRepository.findById(carModel.getId()).orElse(new CarModel());
		old = carModel;
		saveCarModel(old);
		
	}

	@Override
	public Car getCarEdit(Long id) {
		Car car = carRepository.findById(id).orElse(new Car());
		return car;
	}

	@Override
	public void editCar(Car car) {
		Car old = carRepository.findById(car.getId()).orElse(new Car());
		old = car;
		saveCar(old);
		
	}



	

	

	

}
