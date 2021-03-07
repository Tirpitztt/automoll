package com.example.tehnomoll.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.tehnomoll.model.Car;
import com.example.tehnomoll.model.CarModel;
import com.example.tehnomoll.model.Detail;
import com.example.tehnomoll.model.Engine;
import com.example.tehnomoll.model.Manufactura;
import com.example.tehnomoll.model.Product;
import com.example.tehnomoll.service.CardService;
import com.example.tehnomoll.service.DetailService;
import com.example.tehnomoll.service.ProductService;




@Controller
public class ProductController {

	private final ProductService productService;
	private final CardService cardService;
	private final DetailService detService;
	
	

	@Autowired
	public ProductController(ProductService productService,CardService cardService,
			DetailService detService) {
		this.cardService = cardService;
		this.productService = productService;
		this.detService = detService;
	}

	@Value("${upload.path}")
	private String uploadPath;
	
	@GetMapping("/details")
	public String details(Model model) {
		return "details";
	}
	/*
	@GetMapping("/findDetails/{category}")
	public ResponseEntity<List<Detail>> findDetails(@PathVariable String category) {
		List<Detail> detailsOfCat = detService.findOfCat(category);
		return ResponseEntity.ok(detailsOfCat);
	}
	*/
	@GetMapping("/adminka")
	public String adminka(Model model) {
		 model.addAttribute("marka", productService.getMarka());
		 model.addAttribute("products", productService.getProductList());
		 model.addAttribute("details",detService.getListDetail());

		return "adminka";
	}
	@GetMapping("/filterCategory/{category}")
	public String findDetails(@PathVariable String category,Model model) {
		System.out.println(category);
		model.addAttribute("marka", productService.getMarka());
		model.addAttribute("products", productService.findProdOfCategory(category));
		model.addAttribute("details", detService.findOfCat(category));
		return "adminka";
	}
	
	
	@GetMapping("/details/{id}")
	public String getProd(@PathVariable Long id,Model model) {
		Product product = productService.getProduct(id);
		model.addAttribute("product", product);
		return "details";
	}
	
	@GetMapping("/editPage/{id}")
	public String editPageId(@PathVariable Long id,Model model) {
		model.addAttribute("marka", productService.getMarka());
		model.addAttribute("product", productService.getProduct(id));
		model.addAttribute("details", detService.getListDetail());
		System.out.println(productService.getProduct(id).getSide());
		return "editProduct";
	}
	
	

	@GetMapping("/getProducts")
	public ResponseEntity<?> getProducts() {

		List<Product> result = productService.getProductList();

		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/getProduct/{id}")
	public String getProduct(@PathVariable Long id){
		
		return "addProduct";
	}
	
	

	@GetMapping("/getEngine")
	public ResponseEntity<?> getEngines() {
		List<Engine> result = productService.getAllEngines();

		return ResponseEntity.ok(result);
	}

	@GetMapping("/getEngineEdit/{id}")
	public ResponseEntity<Engine> getEngine(@PathVariable Long id) {
		Engine result = productService.getEngineEdit(id);

		return ResponseEntity.ok(result);

	}
	
	@GetMapping("/editEngine")
	public String editEngine(@ModelAttribute Engine engine) {

		System.out.println(engine.getId());
		productService.editEngine(engine);

		return "adminka";
	}
	
	
	@GetMapping("/getCarModel/{marka}")
	public ResponseEntity<?> getCarModel(@PathVariable String marka) {

		List<CarModel> result = productService.getCarModel(marka);

		return ResponseEntity.ok(result);
	}
	@GetMapping("/getModelEdit/{id}")
	public ResponseEntity<CarModel> getModelEdit(@PathVariable Long id){
		CarModel cMod = productService.getModelEdit(id);
		
		return ResponseEntity.ok(cMod);
	}
	
	@GetMapping("/editModel")
	public String editModel(CarModel carModel) {
		productService.editModel(carModel);
		return "adminka";
	}

	
	@GetMapping("/getMarka")
	public ResponseEntity<?> getMarka() {

		List<Manufactura> result = productService.getMarka();

		return ResponseEntity.ok(result);
	}

	
	@GetMapping("/getCars")
	public ResponseEntity<?> getCars() {
		List<Car> result = productService.getAllCars();

		return ResponseEntity.ok(result);
	}
	@ModelAttribute("getCar")
	public List<Car> getCar() {
		List<Car> listCar = productService.getAllCars();
		return listCar;

	}
	@GetMapping("/getCarEdit/{id}")
	public ResponseEntity<Car> getCarEdit(@PathVariable Long id){
		Car car = productService.getCarEdit(id);
		return ResponseEntity.ok(car);
		
	}
	
	@GetMapping("/editCar")
	public String editCar(Car car) {
		productService.editCar(car);
		return "adminka";
	}
	
	@GetMapping("/getCars/{model}")
	public ResponseEntity<List<Car>> getCars(@PathVariable Long model){
		
		List<Car> cars = productService.getCarsByModel(model);
		
		return ResponseEntity.ok(cars);
	}
	@PostMapping("/editProduct")
	public String editProduct(@RequestParam(value="image_1",required=false) MultipartFile file1,
			   @RequestParam(value="image_2",required=false) MultipartFile file2,
			   @RequestParam(value="image_3",required=false) MultipartFile file3,
			   @RequestParam(value="image_0",required=false) MultipartFile file4,
			   @RequestParam("product") String product) {
		Product edPr = productService.createEditProduct(product);
		System.out.println(edPr);
		productService.editProduct(edPr);
		List<MultipartFile> listCard = new ArrayList<>();
		if(file1!=null) {listCard.add(file1);}
		if(file2!=null) {listCard.add(file2);}
		if(file3!=null) {listCard.add(file3);}
		if(file4!=null) {listCard.add(file4);}
		if(!listCard.isEmpty()) {
			cardService.saveCards(listCard,edPr);
		}
		
		return "redirect:/adminka";
	}
	
	
	@PostMapping("/saveProduct")
	public String saveProd(@RequestParam(value="image_1",required=false) MultipartFile file1,
						   @RequestParam(value="image_2",required=false) MultipartFile file2,
						   @RequestParam(value="image_3",required=false) MultipartFile file3,
						   @RequestParam(value="image_0",required=false) MultipartFile file4,
						   @RequestParam("product") String product) {
		System.out.println(product);
		Product pr = productService.createProduct(product);
		
		
		productService.saveProduct(pr);
		List<MultipartFile> listCard = new ArrayList<>();
		if(file1!=null) {listCard.add(file1);}
		if(file2!=null) {listCard.add(file2);}
		if(file3!=null) {listCard.add(file3);}
		if(file4!=null) {listCard.add(file4);}
		if(!listCard.isEmpty()) {
			cardService.saveCards(listCard,pr);
		}
		
		System.out.println(pr.getCar());
		return "redirect:/adminka";
	}

	@GetMapping("/saveMarka")
	public String saveMarka(Manufactura marka) {
		productService.saveMarka(marka);
		return "redirect:/refbook";
	}
	@GetMapping("/saveEngine")
	public String saveEngine(Engine engine) {
		System.out.println(engine.getType());
		productService.saveEngine(engine);
		return "redirect:/refbook";
	}

	@GetMapping("/saveModel")
	public String saveCarModel(CarModel carModel) {
		productService.saveCarModel(carModel);
		return "redirect:/refbook";
	}

	@GetMapping("/saveCar")
	public String saveCar( Car car) {
		System.out.println(car.getBodyCar());
		
		productService.saveCar(car);
		return "redirect:/refbook";
	}

	@GetMapping("/deleteCar/{id}")
	public String deleteCar(@PathVariable Long id) {
		productService.deleteCar(id);
		return "redirect:/refbook";
	}

	@GetMapping("/deleteModel/{id}")
	public String deleteModel(@PathVariable Long id) {
		productService.deleteModel(id);
		return "redirect:/refbook";
	}

	@GetMapping("/deleteEngine/{id}")
	public String deleteEngine(@PathVariable Long id) {
		productService.deleteEngine(id);
		return "redirect:/refbook";
	}

}
