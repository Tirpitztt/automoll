/**
 * 
 */


jQuery(function($){
	let carID = 0;
	let dropBox;
	let files = [];//рабочий массив файлов
	let filesProc = [];
	
	
	/*$('#marka-prod-field').change(function(){
		getModel();
	});*/
	
	$('#model-prod-field').change(function(){
		let model = $('#model-prod-field').val();
		getCar(model);
	});
	$('#cars-model').on('click',function(e){
		if(e.target.tagName==="LI"){
			$('#cars-model li').removeClass('fly');
			e.target.classList.toggle('fly');
			carID = e.target.value;
		}
	});
	$('#yearCar').change(function(){
		let model = $('#model-prod-field').val();
		if($('#yearCar').val()==""){
			$('#cars-model').empty();
			getCar(model);
		}else{
			carFilter(model);
		}
		
	});
	
	$('#but-prod').on('click',function(){
		
		let product = createProduct();
		console.log(product);
		$.ajax({
			type:"POST",
			url:"/saveProduct",
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
	
	$('#marka-prod-field').editableSelect()
	   .on('select.editable-select',function(e,li){
		
		let marka = li.text();
		getModel(marka);
	});
	$('#name-prod-field').editableSelect()
	   .on('select.editable-select',function(e,li){
		let name = li.text();
		getArt($.trim(name));
	});
	
	window.onload = function(){
		dropBox = document.getElementById("drop_box");
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
		let dropPoint = document.createElement('div');
		for(let i = 0;i<f.length;i++){
				let reader = new FileReader();
		reader.onload = function(e){
			//let dropPoint = document.getElementById("file"+(i+1)+"-point");
			
			dropPoint.classList.add("file-point");
			dropPoint.style.backgroundImage = "url('"+e.target.result+"')";
			dropPoint.style.backgroundSize = "cover";
			
		};
		dropBox.append(dropPoint);
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
						$('#cars-model').empty();
						$('#cars-model').append(warn);
					}else{
						$('#cars-model').empty();
						data.forEach(function(item,i){
							if($('#yearCar').val()==item.yIssue){
								let li = "<li value="+item.id+">"+item.carModel.name+" "+
					" "+item.carModel.secName+
					item.yIssue+"г.в.  "+item.engine[0].volume+item.engine[0].ingection+" "+
					item.engine[0].type+" "+item.transmission+
					" "+item.bodyCar+"</li>";
					$('#cars-model').append(li);
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
						$('#cars-model').append(warn);
					}
					$('#yearCar').css('display','block');
				
				data.forEach(function(item,i){
					console.log(data);
					
					let li = "<li value="+item.id+">"+item.carModel.name+" "+
					" "+item.carModel.secName+
					item.yIssue+"г.в.  "+item.engine[0].volume+item.engine[0].ingection+" "+
					item.engine[0].type+" "+item.transmission+
					" "+item.bodyCar+"</li>";
					$('#cars-model').append(li);
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
				$('#model-prod-field').empty();
				data.forEach(function(item,i){
					let option = "<option value="+item.id + ">"+item.name+
					" ["+item.yStart+"-"+item.yEnd+"]</option>";
					$('#model-prod-field').append(option);
				});
				
			}
		});
	}
	function createProduct(){
		
		let art = $('#art-prod-field').val();
		let name = $.trim($('#name-prod-field').val());
		let status = $('#status-prod-field').val();
		let price = $('#price-prod-field').val();
		let car = carID;
		let side = "none";
		let front = "none";
		let textClient = "none";
		let textServer = "none";
		let category = $('#cat-prod-field').val();
		
		
		
		if($('#side-r').is(":checked")){
			side = $('#side-r').val();
		}else if(($('#side-r').is(":checked"))&&($('#side-l').is(":checked"))){
			side = $('#side-r').val()+"-"+$('#side-l').val();
		}else if($('#side-l').is(':checked')){
			side = $('#side-l').val();
		}
		
		if($('#front-f').is(":checked")){
			front = $('#front-f').val();
		}else if(($('#front-f').is(":checked"))&&($('#front-b').is(":checked"))){
			front = $('#front-f').val()+"-"+$('#front-b').val();
		}else if($('#front-b').is(':checked')){
			front = $('#front-b').val();
		}
		
		if($('#txt-cl').val() !=""){
			textClient =$('#txt-cl').val(); 
		}
		if($('#txt-sv').val()!=""){
			textServer = $('#txt-sv').val();
		}
		
		let fotos = new FormData();
		files.forEach(function(image,i){
			fotos.append("image_"+i,image)
			
		});
		
		let obj = {
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
							$('#art-prod-field').val(detail.articul);
						}
					});
				}
			}
		});
	}
	
});