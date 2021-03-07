/**
 * 
 */
jQuery(function($){
	let carID = 0;
	let dropBox;
	let files = [];//рабочий массив файлов
	let filesProc = [];
	
	getModel($('#marka-prod-field-edit').val());
	/*$('#marka-prod-field').change(function(){
		getModel();
	});*/
	
	$('#model-prod-field-edit').change(function(){
		let model = $('#model-prod-field-edit').val();
		getCar(model);
	});
	$('#cars-model-edit').on('click',function(e){
		if(e.target.tagName==="LI"){
			$('#cars-model-edit li').removeClass('fly');
			e.target.classList.toggle('fly');
			carID = e.target.value;
		}
	});
	$('#yearCar-edit').change(function(){
		let model = $('#model-prod-field-edit').val();
		if($('#yearCar-edit').val()==""){
			$('#cars-model-edit').empty();
			getCar(model);
		}else{
			carFilter(model);
		}
		
	});
	
	$('#but-prod-edit').on('click',function(){
		
		let product = createProduct();
		console.log(product);
		$.ajax({
			type:"POST",
			url:"/editProduct",
			data:product,
			processData: false,
            contentType: false,
			success:function(data){
				alert('oki');
			}
		});
		
	});
	
	
	
	$('.file-point').on('click',function(){
		$('.hidden-input').click();
	});
	
	$('#marka-prod-field-edit').editableSelect()
	   .on('select.editable-select',function(e,li){
		
		let marka = li.text();
		getModel(marka);
	});
	$('#name-prod-field-edit').editableSelect()
	   .on('select.editable-select',function(e,li){
		let name = li.text();
		getArt($.trim(name));
	});
	
	window.onload = function(){
		dropBox = document.getElementById("drop_box-edit");
		dropBox.ondragenter = ignorDrag;
		dropBox.ondragover = ignorDrag;
		dropBox.ondrop = drop;
	}
	
	function ignorDrag(e){
		e.stopPropagation();
		e.preventDefault();
	}
	
	function drop(e){
		e.stopPropagation();
		e.preventDefault();
		let data = e.dataTransfer;
		console.log(data);
		filesProc.push(data.files);
		console.log(filesProc);
		processFiles(filesProc);
	}
	
	function processFiles(filesProc){
		let f=[];
		for(let a=0;a<filesProc.length;a++){
			for(let j=0;j<filesProc[a].length;j++){
				f.push(filesProc[a][j]);
			}
		}
		console.log(f);
		for(let i = 0;i<f.length;i++){
				let reader = new FileReader();
		reader.onload = function(e){
			let dropPoint = document.getElementById("file"+i+"-point-edit");
			dropPoint.style.backgroundImage = "url('"+e.target.result+"')";
		};
		reader.readAsDataURL(f[i]);
		}
		files = f;
		
	}
	
	
	function carFilter(model){
		$.ajax({
			type:"GET",
			url:"/getCars/"+model,
			success:function(data){
				if(!$.trim(data)){
						let warn = '<li><a href="/refbook">Добавить авто</a></li>';
						$('#cars-model-edit').empty();
						$('#cars-model-edit').append(warn);
					}else{
						$('#cars-model-edit').empty();
						data.forEach(function(item,i){
							if($('#yearCar-edit').val()==item.yIssue){
								let li = "<li value="+item.id+">"+item.carModel.name+" "+
					" "+item.carModel.secName+
					item.yIssue+"г.в.  "+item.engine[0].volume+item.engine[0].ingection+" "+
					item.engine[0].type+" "+item.transmission+
					" "+item.bodyCar+"</li>";
					$('#cars-model-edit').append(li);
							}
						});
					}
			}
			});
	}
	
	function getCar(model){
		
		$.ajax({
			type:"GET",
			url:"/getCars/"+model,
			success:function(data){
				if(!$.trim(data)){
						let warn = '<li><a href="/refbook">Добавить авто</a></li>';
						$('#cars-model-edit').append(warn);
					}
					$('#yearCar-edit').css('display','block');
				
				data.forEach(function(item,i){
					console.log(data);
					
					let li = "<li value="+item.id+">"+item.carModel.name+" "+
					" "+item.carModel.secName+
					item.yIssue+"г.в.  "+item.engine[0].volume+item.engine[0].ingection+" "+
					item.engine[0].type+" "+item.transmission+
					" "+item.bodyCar+"</li>";
					$('#cars-model-edit').append(li);
				});
			}
		});
	}
	
	function getModel(m){
		let marka = m;//$('#marka-prod-field').text();
		$.ajax({
			type:"GET",
			url:"/getCarModel/" + marka,
			success:function(data){
				$('#model-prod-field-edit').empty();
				data.forEach(function(item,i){
					let option = "<option value="+item.id + ">"+item.name+
					" ["+item.yStart+"-"+item.yEnd+"]</option>";
					$('#model-prod-field-edit').append(option);
				});
				
			}
		});
	}
	function getIdProduct(){
		let idProd = $('#productID').text();
		alert(idProd);
		return idProd;
	}
	
	function createProduct(){
		let id = getIdProduct();
		let art = $('#art-prod-field-edit').val();
		let name = $.trim($('#name-prod-field-edit').val());
		let status = $('#status-prod-field-edit').val();
		let price = $('#price-prod-field-edit').val();
		let car = carID;
		let side = "none";
		let front = "none";
		let textClient = "none";
		let textServer = "none";
		let category = $('#cat-prod-field-edit').val();
		
		
		
		if($('#side-r-edit').is(":checked")){
			side = $('#side-r-edit').val();
		}else if(($('#side-r-edit').is(":checked"))&&($('#side-l-edit').is(":checked"))){
			side = $('#side-r-edit').val()+"-"+$('#side-l-edit').val();
		}else if($('#side-l-edit').is(':checked')){
			side = $('#side-l-edit').val();
		}
		
		if($('#front-f-edit').is(":checked")){
			front = $('#front-f-edit').val();
		}else if(($('#front-f-edit').is(":checked"))&&($('#front-b-edit').is(":checked"))){
			front = $('#front-f-edit').val()+"-"+$('#front-b-edit').val();
		}else if($('#front-b-edit').is(':checked')){
			front = $('#front-b-edit').val();
		}
		
		if($('#txt-cl-edit').val() !=""){
			textClient =$('#txt-cl-edit').val(); 
		}
		if($('#txt-sv-edit').val()!=""){
			textServer = $('#txt-sv-edit').val();
		}
		
		let fotos = new FormData();
		files.forEach(function(image,i){
			fotos.append("image_"+i,image)
			
		});
		
		let obj = {
			id:id,
			art:art,
			name:name,
			status:status,
			price:price,
			car:car,
			side:side,
			front:front,
			textClient:textClient,
			textServer:textServer,
			category:category
		};
		fotos.append("product",JSON.stringify(obj));
		console.log(JSON.stringify(obj));
		
		return fotos;
	}
	function getArt(name){
		$.ajax({
			type:"GET",
			url:"/getDetails",
			dataType:"json",
			success:function(data){
				if(data){
					data.forEach(function(detail){
						if(name==detail.name){
							$('#art-prod-field-edit').val(detail.articul);
						}
					});
				}
			}
		});
	}
	
});