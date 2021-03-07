'use strict';
jQuery(function($){
	
	let entityID,entity,editObj;
	let _CAR = "car";
	let _MODEL = "model";
	let _ENGINE = "engine";
	let _DETAIL = "detail";
	let carBox = $('.car-box');
	let engineBox = $('.engine-box');
	let detailBox = $('.detail-info-box');
	getMarkaList();
	getMarkaSelect();
	carBox.append(getCarsTable(getCar()));
	engineBox.append(getEngineTable(getEngine()));
	detailBox.append(getDetailTable(getDetails()));
	
	$('#getDetailsButton').on('click',function(){
		$('.details-ref-box').css('display','block');
		$('.ref-info-box').css('display','none');
		$('.addRef-form-box').css('display','none');
	});
	
	$('#getAutoButton').on('click',function(){
		$('.details-ref-box').css('display','none');
		$('.ref-info-box').css('display','block');
		$('.addRef-form-box').css('display','none');
	});
	
	/*-------------------------SAVE BUTTONS---------------*/
	
	$('#saveDet').on('click',function(){
		let arrFields = [$('#det-name'),$('#det-articul')];
			if(!editObj){
				if(checkFields(arrFields)){
					if(!checkNameDet($('#det-name').val())){
			return;
		}
			let detail = {
				name:$('#det-name').val(),
				articul:$('#det-articul').val(),
				category:$('#cat-det-field').val()
			};
			$.ajax({
				type:"POST",
				url:"/saveDetail",
				data:detail,
				success:function(){
					
				},
				async:false
				
			});
		}
			
		}else{
			let detail = {
				id:editObj.id,
				name:$('#det-name').val(),
				articul:$('#det-articul').val(),
				category:$('#cat-det-field').val()
			};
			$.ajax({
				type:"POST",
				url:"/editDetail",
				data:detail,
				success:function(){
					
				},
				async:false
				
			});
		}
		
		clearFields(arrFields);
		detailBox.empty();
		detailBox.append(getDetailTable(getDetails()));
	});
	
	$('#but_marka').on('click',function(){
		let arrFields = [$('#marka_field')];
		if(checkFields(arrFields)){
			
			$('#form_marka').submit();
		}
		clearFields(arrFields);
	});
	
	
	$('#but_car').on('click',function(){
		let arrFields = [$('#select_marka_car'),$('#select_model'),$('#bodyCar_inp'),
			$('#issue_inp'),$('#trans_inp')];
		if(checkFields(arrFields)){
			if(entityID != undefined){
				let engine = entityID;
				let model = $('#select_model option:selected')[0].childNodes[0].textContent;
				let file = $('#file_inp')[0].files[0];
				if(!editObj){
					let car = {
						bodyCar:$('#bodyCar_inp').val(),
						yIssue:$('#issue_inp').val(),
						transmission:$('#trans_inp').val(),
						carModel:model,
						engine:engine
						
				}
				addOrEditObjAjax('/saveCar',car);
				}else{
					let car = {
						id:editObj.id,
						bodyCar:$('#bodyCar_inp').val(),
						yIssue:$('#issue_inp').val(),
						transmission:$('#trans_inp').val(),
						carModel:model,
						engine:engine
						
				}
				addOrEditObjAjax('/editCar',car);
				}
			}else{
				alert("двигатель не выбран");
				return;
			}
			
		}
		clearFields(arrFields);
		resetEntity();
	});
	function resetEntity(){
		editObj="";
		entityID = "";
		entity = "";
	}
	$('#but_model').on('click',function(){
		let arrFields = [$('#select_marka'),$('#modName'),$('#modStart'),$('#modEnd')];
		if(checkFields(arrFields)){
			if(!editObj){
				let model = {
					m:$('#select_marka').val(),
					name:$('#modName').val(),
					secName:$('#modSec').val(),
					yStart:$('#modStart').val(),
					yEnd:$('#modEnd').val()
			}
			addOrEditObjAjax('/saveModel',model);
			}else{
				let model = {
					id:editObj.id,
					m:$('#select_marka').val(),
					name:$('#modName').val(),
					secName:$('#modSec').val(),
					yStart:$('#modStart').val(),
					yEnd:$('#modEnd').val()
			}
			addOrEditObjAjax('/editModel',model);
			
			}
			
		}
		clearFields(arrFields);
		resetEntity();
	});
	
	
	
	$('#but-engine').on('click',function(){
		let arrFields = [$('#type-eng-field'),$('#volume-eng-field'),$('#ingection-eng-field'),$('#valve-eng-field'),
			$('#horse-eng-field'),$('#number-eng-field'),$('#power-eng-field'),$('#arrang-eng-field')];
		if(checkFields(arrFields)){
			if(!editObj){
				$('#form_engine').submit();
			}else{
				let engine = {
						id:editObj.id,
						type:$('#type-eng-field').val(),
						volume:$('#volume-eng-field').val(),
						ingection:$('#ingection-eng-field').val(),
						valve:$('#valve-eng-field').val(),
						horse:$('#horse-eng-field').val(),
						number:$('#number-eng-field').val(),
						power:$('#power-eng-field').val(),
						arrang:$('#arrang-eng-field').val()
				};
				$.ajax({
					type:"GET",
					url:"/editEngine",
					data:engine,
					success:function(){
						alert("send");
					}
				});
			}
			
		}
		clearFields(arrFields);
		resetEntity();
	});
	
	$('#editRefButton').on('click',function(){
		let url;
		if(entity=="car"){
			url = "/getCarEdit/";
		}else if(entity=="engine"){
			url = "/getEngineEdit/";
		}else if(entity=="model"){
			url = "/getModelEdit/"
		}else{
			alert("Ошибочка вышла");
			return;
		}
		
		$.ajax({
			type:"GET",
			url:url+entityID,
			dataType:"json",
			success:function(data){
				let json = JSON.stringify(data);
			    editObj = JSON.parse(json);
				
			},
			async:false
		});
		console.log(editObj);
		prepForm(editObj);
	});
	
	$('#editDet').on('click',function(){
		$.ajax({
			type:"POST",
			url:"/getDetail/"+entityID,
			dataType:"json",
			success:function(data){
				editObj = data;
			},
			async:false
		});
		$('#det-name').val(editObj.name);
		$('#det-articul').val(editObj.articul);
		
	});
	
	$('#deleteDet').on('click',function(){
		if(entity==="detail"){
			let uwaga = confirm("Ты уверен, что хочешь этого?");
		if(uwaga){
			$.ajax({
				type:"GET",
				url:"/deleteDetail/"+entityID,
				success:function(){
					alert('send');
				},
				async:false
			});
		}
		}
		detailBox.empty();
		detailBox.append(getDetailTable(getDetails()));
		entity = "";
	});
	
	$('#delRefButton').on('click',function(){
		let url;
		if(entity=="car"){
			url = "/deleteCar/";
		}else if(entity=="engine"){
			url = "/deleteEngine/";
		}else if(entity=="model"){
			url = "/deleteModel/"
		}else{
			alert("Ошибочка вышла");
			return;
		}
		alert(url);
		let uwaga = confirm("Ты уверен, что хочешь этого?");
		if(uwaga){
			$.ajax({
				type:"GET",
				url:url+entityID,
				success:function(){
					alert('send');
				}
			});
			
		}
		
		entity = "";
	});
/*--------------------------FORMS-----------------------------*/
	
	
	function prepForm(obj){
		$('.addRef-form-box').css('display','block');
		$('.ref-info-box').css('display','none');
		$('.select-engine').empty();
		$('.select-engine').append(getEngineTable(getEngine()));
		selectEntity($('.select-engine'));
		if(entity==_ENGINE){
			$('#type-eng-field').val(obj.type);
			$('#volume-eng-field').val(obj.volume);
			$('#ingection-eng-field').val(obj.ingection);
			$('#valve-eng-field').val(obj.valve);
			$('#horse-eng-field').val(obj.horse);
			$('#number-eng-field').val(obj.number);
			$('#power-eng-field').val(obj.power);
			$('#arrang-eng-field').val(obj.arrang);
			$('#but-engine').html("исправить");
		}else if(entity==_CAR){
			$('.select-engine').empty();
		    $('.select-engine').append(getEngineTable(getEngine()));
		    selectEntity($('.select-engine'));
			$('#select_marka_car').val(obj.carModel.marka.name);
			getSelectModel();
			$('#bodyCar_inp').val(obj.bodyCar);
			$('#issue_inp').val(obj.yIssue);
			$('#trans_inp').val(obj.transmission);
			entityID = obj.engine[0].id;
		}else if(entity==_MODEL){
			$('#select_marka').val(obj.marka.name);
			$('#modName').val(obj.name);
			$('#modSec').val(obj.secName);
			$('#modStart').val(obj.yStart);
			$('#modEnd').val(obj.yEnd);
		}else{
			alert("no entity select");
			return;
		}
	}
	
	
	function addOrEditObjAjax(url,model){
		$.ajax({
			type:"GET",
			url:url,
			data:model,
			success:function(){}
		});
	}
	
/*--------------------------CLICK FUNCTIONS------------------*/	
	
	$('#addRefButton').on('click',function(){
		$('.addRef-form-box').css('display','block');
		$('.ref-info-box').css('display','none');
		$('.select-engine').empty();
		$('.select-engine').append(getEngineTable(getEngine()));
		selectEntity($('.select-engine'));
		$.ajax({
			type:"GET",
			url:"/getMarka",
			dataType:"json",
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				for(let i = 0;i<myObj.length;i++){
					let opt = document.createElement('option');
					opt.append(myObj[i].marka);
					$('#sel-marka').append(opt);
				}
			}
		});
	});
	
	
	$('#select_marka_car').change(function(){
		getSelectModel();
	});
	
	
	
	
	
	
//	$('#select_model').change(function(){
//		let elem = $('#select_model option:selected');
//		
//		modelID = elem[0].childNodes[0].textContent;
//		alert(elem[0].childNodes[0].textContent);
//	});
	
	
/*---------------------------SELECT FUCTIONS----------------*/	
	function getSelectModel(){
		let marka = $('#select_marka_car').val();
		let list = getModel(marka);
		$('#select_model').empty();
		for(let i = 0;i<list.length;i++){
					let opt = document.createElement('option');
					let secN = list[i].secName;
					if(secN=="null"){
						secN = " ";
					}
					$('<span>',{
						text:list[i].id,
						css:{
							color:"red"
						}
					}).appendTo(opt);
					opt.append(list[i].name+" ");
					opt.append(list[i].secName+" ");
					opt.append("["+list[i].yStart + "-"+list[i].yEnd+"]");
					if(editObj){
						if((editObj.carModel.name==list[i].name)&&(editObj.carModel.secName==list[i].secName)){
						opt.setAttribute('selected',true);
					}
					}
					
					$('#select_model').append(opt);
				}
	}
	function getModel(marka){
		let list;
		$.ajax({
			type:"GET",
			url:"/getCarModel/"+marka,
			dataType:"json",
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				list = myObj;
			},
			async:false
		
		});
		return list;
	}
	
	function getEngine(){
		let engines;
		$.ajax({
			type:"get",
			url:"/getEngine",
			dataType:"json",
			cashe:false,
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				engines = myObj;
				
			},
			async:false
		});
		return engines;
	}
	
	function getCar(){
		
		let cars = [];
		$.ajax({
			type:"GET",
			url:"/getCars",
			dataType:"json",
			cashe:false,
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				cars = myObj;
			},
			async:false
		});
		return cars;
	}
	
	function getMarkaSelect(){
		$.ajax({
			type:"GET",
			url:"/getMarka",
			dataType:"json",
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				for(let i = 0;i<myObj.length;i++){
					let opt = document.createElement('option');
					opt.append(myObj[i].name);
					$('.select-marka').append(opt);
				}
			}
		});
	}
	function getMarkaList(){
		$.ajax({
			type:"GET",
			url:"/getMarka",
			dataType:"json",
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				for(let i = 0;i<myObj.length;i++){
					let p = document.createElement('p');
					p.append(myObj[i].name);
					$('.marka-box').append(p);
				}
			}
		});
	}
	
	function getDetails(){
		let details = [];
		$.ajax({
			type:"GET",
			url:"/getDetails",
			dataType:"json",
			success:function(data){
				details=data;
			},
			async:false
			
		});
		return details;
	}
	function getEngineTable(list,marka,cars){
		let table = document.createElement('table');
		let tr = $('<tr>',{css:{"border-bottom":"1px solid gray"}}).appendTo(table);
		$('<th>',{text:"ID"}).appendTo(tr);
		$('<th>',{text:"Топливо"}).appendTo(tr);
		$('<th>',{text:"Объем,л"}).appendTo(tr);
		$('<th>',{text:"Впрыск"}).appendTo(tr);
		$('<th>',{text:"Клапан,шт"}).appendTo(tr);
		$('<th>',{text:"л/с"}).appendTo(tr);
		$('<th>',{text:"Тип"}).appendTo(tr);
		$('<th>',{text:"kWt"}).appendTo(tr);
		$('<th>',{text:"компоновка"}).appendTo(tr);
		if((marka) && (cars)){
				cars.forEach(function(car){
					if(marka == car.carModel.marka.name){
						let tr = document.createElement('tr');
						if(car.engine[0]){
							$('<td>',{text:car.engine[0].id}).appendTo(tr);
							$('<td>',{text:car.engine[0].type}).appendTo(tr);
							$('<td>',{text:car.engine[0].volume}).appendTo(tr);
							$('<td>',{text:car.engine[0].ingection}).appendTo(tr);
							$('<td>',{text:car.engine[0].valve}).appendTo(tr);
							$('<td>',{text:car.engine[0].horse}).appendTo(tr);
							$('<td>',{text:car.engine[0].number}).appendTo(tr);
							$('<td>',{text:car.engine[0].power}).appendTo(tr);
							$('<td>',{text:car.engine[0].arrang}).appendTo(tr);
							table.append(tr);
						}else{
							
							$('<td>',{text:"двигатель был удален",css:{color:"red"}}).appendTo(tr);
							table.append(tr);
						}
						
					}
				});
				
			}else{
				
				list.forEach(function(eng){
					let tr = document.createElement('tr');
					$('<td>',{text:eng.id}).appendTo(tr);
					$('<td>',{text:eng.type}).appendTo(tr);
					$('<td>',{text:eng.volume}).appendTo(tr);
					$('<td>',{text:eng.ingection}).appendTo(tr);
					$('<td>',{text:eng.valve}).appendTo(tr);
					$('<td>',{text:eng.horse}).appendTo(tr);
					$('<td>',{text:eng.number}).appendTo(tr);
					$('<td>',{text:eng.power}).appendTo(tr);
					$('<td>',{text:eng.arrang}).appendTo(tr);
					table.append(tr);
				});
				
			}
		selectEntity($('.engine-box'));
		return table;
	}
	function getEngineOfModel(engines){
		let table = document.createElement('table');
		let tr = $('<tr>',{css:{"border-bottom":"1px solid gray"}}).appendTo(table);
		if(engines){
			
			$('<th>',{text:"ID"}).appendTo(tr);
			$('<th>',{text:"Топливо"}).appendTo(tr);
			$('<th>',{text:"Объем,л"}).appendTo(tr);
			$('<th>',{text:"Впрыск"}).appendTo(tr);
			$('<th>',{text:"Клапан,шт"}).appendTo(tr);
			$('<th>',{text:"л/с"}).appendTo(tr);
			$('<th>',{text:"Тип"}).appendTo(tr);
			$('<th>',{text:"kWt"}).appendTo(tr);
			$('<th>',{text:"компоновка"}).appendTo(tr);
			engines.forEach(function(car){
				let tr = document.createElement('tr');
				if(car.engine[0]){
					$('<td>',{text:car.engine[0].id}).appendTo(tr);
					$('<td>',{text:car.engine[0].type}).appendTo(tr);
					$('<td>',{text:car.engine[0].volume}).appendTo(tr);
					$('<td>',{text:car.engine[0].ingection}).appendTo(tr);
					$('<td>',{text:car.engine[0].valve}).appendTo(tr);
					$('<td>',{text:car.engine[0].horse}).appendTo(tr);
					$('<td>',{text:car.engine[0].number}).appendTo(tr);
					$('<td>',{text:car.engine[0].power}).appendTo(tr);
					$('<td>',{text:car.engine[0].arrang}).appendTo(tr);
					table.append(tr);
				}else{
					$('<td>',{text:"двигатель был удален"}).appendTo(tr);
					table.append(tr);
				}
			});
		}else{
			engineBox.append($('<p>'),{text:"не найдено нихрена",css:{color:"red"}});
		}
		engineBox.empty();
		engineBox.append(table);
	}
	
	function getCarsOfModelTable(){
		let cars = getCar();
		let engines = [];
		let table = document.createElement('table');
		let tr = $('<tr>',{css:{"border-bottom":"1px solid gray"}}).appendTo(table);
		$('<th>',{text:"ID"}).appendTo(tr);
		$('<th>',{text:"Marka"}).appendTo(tr);
		$('<th>',{text:"Model"}).appendTo(tr);
		$('<th>',{text:"Engine"}).appendTo(tr);
		$('<th>',{text:"Body"}).appendTo(tr);
		$('<th>',{text:"Year"}).appendTo(tr);
		$('<th>',{text:"Transm"}).appendTo(tr);
		cars.forEach(function(car){
			if(entityID == car.carModel.id){
				engines.push(car);
				let tr = document.createElement('tr');
				$('<td>',{text:car.id}).appendTo(tr);
				$('<td>',{text:car.carModel.marka.name}).appendTo(tr);
				$('<td>',{text:car.carModel.name+" "+car.carModel.secName}).appendTo(tr);
				if(car.engine[0]){
					$('<td>',{text:car.engine[0].volume+car.engine[0].ingection+"("+car.engine[0].horse+")"}).appendTo(tr);
				}else{
					$('<td>',{text:"del",css:{color:"red","font-weight":"bold"}}).appendTo(tr);
				}
				$('<td>',{text:car.bodyCar}).appendTo(tr);
				$('<td>',{text:car.yIssue}).appendTo(tr);
				$('<td>',{text:car.transmission}).appendTo(tr);
				table.append(tr);
			}
		});
		getEngineOfModel(engines);
		return table;
	}
	
	function getCarsTable(list,marka){
		let table = document.createElement('table');
		let tr = $('<tr>',{css:{"border-bottom":"1px solid gray"}}).appendTo(table);
		$('<th>',{text:"ID"}).appendTo(tr);
		$('<th>',{text:"Marka"}).appendTo(tr);
		$('<th>',{text:"Model"}).appendTo(tr);
		$('<th>',{text:"Engine"}).appendTo(tr);
		$('<th>',{text:"Body"}).appendTo(tr);
		$('<th>',{text:"Year"}).appendTo(tr);
		$('<th>',{text:"Transm"}).appendTo(tr);
		
		list.forEach(function(car){
			if(marka){
				if(marka == car.carModel.marka.name){
					let tr = document.createElement('tr');
					$('<td>',{text:car.id}).appendTo(tr);
					$('<td>',{text:car.carModel.marka.name}).appendTo(tr);
					$('<td>',{text:car.carModel.name+" "+car.carModel.secName}).appendTo(tr);
					if(car.engine[0]){
						$('<td>',{text:car.engine[0].volume+car.engine[0].ingection+"("+car.engine[0].horse+")"}).appendTo(tr);
					}else{
						$('<td>',{text:"del"}).appendTo(tr);
					}
				
					$('<td>',{text:car.bodyCar}).appendTo(tr);
					$('<td>',{text:car.yIssue}).appendTo(tr);
					$('<td>',{text:car.transmission}).appendTo(tr);
					table.append(tr);
				}
			}else{
				let tr = document.createElement('tr');
				$('<td>',{text:car.id}).appendTo(tr);
				$('<td>',{text:car.carModel.marka.name}).appendTo(tr);
				$('<td>',{text:car.carModel.name+" "+car.carModel.secName}).appendTo(tr);
				if(car.engine[0]){
					$('<td>',{text:car.engine[0].volume+car.engine[0].ingection+"("+car.engine[0].horse+")"}).appendTo(tr);
				}else{
					$('<td>',{text:"del"}).appendTo(tr);
				}
				$('<td>',{text:car.bodyCar}).appendTo(tr);
				$('<td>',{text:car.yIssue}).appendTo(tr);
				$('<td>',{text:car.transmission}).appendTo(tr);
				table.append(tr);
			}
		});
		selectEntity($('.car-box'));
		return table;
	}
	
	function getModelTable(list){
		let table = document.createElement('table');
		let tr = $('<tr>',{css:{"border-bottom":"1px solid gray"}}).appendTo(table);
		$('<th>',{text:"ID"}).appendTo(tr);
		$('<th>',{text:"NAME"}).appendTo(tr);
		$('<th>',{text:"REST"}).appendTo(tr);
		$('<th>',{text:"YEARS"}).appendTo(tr);
		list.forEach(function(model){
			let tr = document.createElement('tr');
			$('<td>',{text:model.id}).appendTo(tr);
			$('<td>',{text:model.name}).appendTo(tr);
			$('<td>',{text:model.secName}).appendTo(tr);
			$('<td>',{text:"[" + model.yStart+"-"+model.yEnd+"]"}).appendTo(tr);
			table.append(tr);
		});
		selectEntity($('.model-box'));
		return table;
	}
	
	function getDetailTable(list){
		let table = document.createElement('table');
		let tr = $('<tr>',{css:{"border-bottom":"1px solid gray"}}).appendTo(table);
		$('<th>',{text:"ID"}).appendTo(tr);
		$('<th>',{text:"NAME"}).appendTo(tr);
		$('<th>',{text:"ART"}).appendTo(tr);
		$('<th>',{text:"CATEGORY"}).appendTo(tr);
		list.forEach(function(detail){
			let tr = document.createElement('tr');
			$('<td>',{text:detail.id}).appendTo(tr);
			$('<td>',{text:detail.name}).appendTo(tr);
			$('<td>',{text:detail.articul}).appendTo(tr);
			$('<td>',{text:detail.category}).appendTo(tr);
			table.append(tr);
		});
		selectEntity($('.detail-info-box'));
		return table;
	}
/*---------------------------SELECT TABLE----------------------------------*/	
	let selectedRow;
    $('.marka-box').on('click',function(event){
    	let target = event.target.closest('p');
    	if(target.tagName != 'P'){
    		return;
    	}
    	let marka = target.innerText;
    	ligth(target);
    	let list = getModel(marka);
    	let cars = getCar();
    	let engines = getEngine();
        
    	$('.model-box').empty();
    	$('.model-box').append(getModelTable(list));
    	engineBox.empty();
    	engineBox.append(getEngineTable(engines,marka,cars));
    	carBox.empty();
        carBox.append(getCarsTable(cars,marka));
    	
    });
    function selectTable(){
    	
    }
    
    function selectEntity(table){
    	table.on('click',function(event){
    		let target = event.target.closest('tr');
    		if(target.tagName != 'TR'){
    			return;
    		}
    		let tbl = event.target.closest('div');
    		let text = target.cells[0].innerText;
    		ligth(target);
    		entityID = text;
    		if(tbl.className.indexOf("car-box")+1){
    			entity = _CAR;
    		}
    		if(tbl.className.indexOf("model-box")+1){
    			entity = _MODEL;
    			carBox.empty();
    			carBox.append(getCarsOfModelTable());
    		}
    		if(tbl.className.indexOf("engine-box")+1){
    			entity = _ENGINE;
    		}
    		if(tbl.className.indexOf("detail-info-box")+1){
				entity = _DETAIL;
            }
    		
    		
    	});
    	
    }
    
    function ligth(tr){
    	if(selectedRow){
    		selectedRow.classList.remove('ligth');
    	}
    	selectedRow = tr;
    	selectedRow.classList.add('ligth');
    	
    }
/*------------------------CHECK FUNCTION---------------------------*/ 
    
    function checkFields(arrayFields){
    	let flag = true;
    	arrayFields.forEach(function(obj){
    		
    		if(obj.val()==""||obj.val()=="no select"){
    			obj.css('border-color','red');
    			obj.next('p').css('display','block');
    			flag = false;
    		}else{
    			obj.css('border-color','black');
    			obj.next('p').css('display','none');
    			
    		}
    		
    		
    	});
    	return flag;
    }
    
    function clearFields(arr){
    	arr.forEach(function(field){
    		field.val("");
    	});
    }

	function checkNameDet(name){
		let n = $.trim(name);
		let flag = true;
		$.ajax({
			type:"GET",
			url:"/getDetails",
			dataType:"json",
			success:function(data){
				data.forEach(function(detail){
					if(detail.name===n){
						alert("Такое имя уже есть!");
						flag=false;
					}
				});
			},
			async:false
		});
		return flag;
	}
    
});