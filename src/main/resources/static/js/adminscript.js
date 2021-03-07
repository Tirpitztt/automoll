'use strict';

jQuery(function($){
	let userID = 0;
	let entity;
	let formID;
	let form_action;
	let form_type;
	
	
	$('#getUsersButton').on('click',function(){
		entity = "user";
    	getUserList();
    });
    
    $('#deleteEntityButton').on('click',function(){
    	$.ajax({
    		type:"GET",
    		url: "/delete/"+userID,
    		success: function(data){
    			getUserList();
    		}
    	});
    });
    
    let selectedRow;
    $('.admin-info-box').on('click',function(event){
    	
    	let target = event.target.closest('tr');
    	
    	if(target.tagName != 'TR'){
    		return;
    	}
    	let id = target.cells[0].innerText;
    	userID = id;
    	ligth(target);
    	
    });
    function ligth(tr){
    	if(selectedRow){
    		selectedRow.classList.remove('ligth');
    	}
    	selectedRow = tr;
    	selectedRow.classList.add('ligth');
    	
    }
    function getUserList(){
    	$('.admin-info-box').empty();
    	let users = [];
    	$.ajax({
    		type: "POST",
    		url: "/getUsers",
    		dataType: "json",
    		cashe: false,
    		success: function(data){
    			let json = JSON.stringify(data);
    			let myObj = JSON.parse(json);
    			users = myObj.result;
    			let table = document.createElement('table');
    			let trtytle = document.createElement('tr');
    			let thid = document.createElement('th');
    			thid.append("ID");
    			let thlogin = document.createElement('th');
    			thlogin.append("Логин");
    			let themail = document.createElement('th');
    			themail.append("E-mail");
    			let throle = document.createElement('th');
    			throle.append("Статус");
    			trtytle.append(thid,thlogin,themail,throle);
    			table.append(trtytle);
    			for(let i = 0; i<users.length;i++){
    				let tr = document.createElement('tr');
    				let tdID = document.createElement('td');
    				tdID.append(users[i].id+" ");
    				let tdName = document.createElement('td');
    				tdName.append(users[i].username+" ");
    				let tdMail = document.createElement('td');
    				tdMail.append(users[i].email+" ");
    				let tdRole = document.createElement('td');
    				tdRole.append(users[i].userRole+" ");
    				tr.append(tdID,tdName,tdMail,tdRole);
    				table.append(tr);
    				
    				
    			}
    			$('.admin-info-box').append(table);
    			
    		}
    	});
    }
    
    
    //-----------------FORMS---------------  
    
    
    $('#addEntityButton').on('click',function(){
    	if(entity=="user"){
    		form_action = "/save";
    		form_type = "save";
    		$('#form-popup-User').css('display','block');
    		$('#tytle-edit-user').css('display','none');
    	}else if(entity==="product"){
			window.location.href="/addProduct";
        }else{
    		alert('выбери кого добавлять');
    	}
    	
    });
    
    $('#editEntityButton').on('click',function(){
		$('#prod-form-box').css('display','none');
    	if(entity=="user"){
    		form_action = "/editUser";
    		form_type = "edit";
    		if(!userID){
        		alert("no user");
        		return;
        	}
        	$.ajax({
        		type:"POST",
        		url:"/getUser/"+userID,
        		dataType:"json",
        		cashe:false,
        		success:function(data){
        			let json = JSON.stringify(data);
        			$('#id-user-field').val(JSON.parse(json).id);
        			$('#name-user-field').val(JSON.parse(json).name);
        			$('#login-user-field').val(JSON.parse(json).username);
        			$('#email-user-field').val(JSON.parse(json).email);
        			
        		}
        	});
        	$('#form-popup-User').css('display','block');
        	$('#tytle-add-user').css('display','none');
    	}else{
    		alert("не выбрана сущность");
    	}
    	
    });

	
    
    //-----------buttons-------
   $('#close-user').on('click',function(){
    	$('.field-box input').val("");
    	$('.invalid-msg').css('display','none');
    	$('#form-popup-User').css('display','none');
    });
    
    
    $('#but-user').on('click',function(){
    	let valid = false;
    	let name = nameCheck();
    	
    	switch(form_type){
    	case "save":
    		if((name) && (loginCheck()) && (mailCheck()) && (passCheck()) ){
        		valid = true;
        	}
    		break;
    	case "edit":
    		let loginNoNull = $('#login-user-field').val();
    		let mailNoNull = $('#email-user-field').val();
    		if((name)&&(loginNoNull)&&(mailNoNull)){
    			valid = true;
    		}
    		break;
    	}
    	
    
    	if(valid){
    		$('#form_user').attr('action',form_action);
        	$('#form_user').submit();
    		$('.field-box input').val("");
        	$('.invalid-msg').css('display','none');
        	$('#form-popup-User').css('display','none');
    	}
    	
    	
    	
    });
    
   function nameCheck(){
	   $('#inv-name').css('display','none');
	   let name = $('#name-user-field').val();
	   if(!name){
		   $('#inv-name').css('display','block');
		   return false;
	   }
	   return true;
   }
   function loginCheck(){
	   let login = $('#login-user-field').val();
	   let valid;
	   if(!login){
		   $('#inv-log').css('display','block');
		   $('#inv-log').text("Заполни поле");
		   return false;
	   }
	   $.ajax({
		   type:"get",
		   url:"/findLogin/"+login,
		   dataType:"text",
		   success:function(data){
			  
			  if(data=="false"){
				   $('#inv-log').css('display','block');
				   valid = false;
			  }else{
				  $('#inv-log').css('display','none');
				  valid = true;
			  }
		 },
		   async:false
	   });
	   return valid;
   }
  
   function mailCheck(){
	   $('#inv-mail').css('display', 'none');
	   let mail = $('#email-user-field').val();
	   let reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	   if(!mail){
		   $('#inv-mail').css('display', 'block');
		   $('#inv-mail').text('Заполни поле блеать');
		   return false;
	   }
	   if(reg.test(mail)==false){
		   $('#inv-mail').css('display', 'block');
		   return false;
	   }
	   return true;
   } 
    
   function passCheck(){
	   $('#inv-pass').css('display','none');
	   $('#inv-rept').css('display','none');
	   let pass = $('#pass-user-field').val();
	   let rept = $('#repeat-user-field').val();
	   let reg = /.{4,}/;
	   if(!pass){
		   $('#inv-pass').css('display','block');
		   return false;
	   }
	   if(reg.test(pass) == false){
		   $('#inv-pass').css('display','block');
		   return false;
	   }
	   if(!rept){
		   $('#inv-rept').css('display','block');
		   $('#inv-rept').text('Повтори че написал');
		   return false;
	   }
	   if(pass != rept){
		   $('#inv-rept').css('display','block');
		   $('#inv-rept').text('Не совпадение паролей');
		   return false;
	   }
	   return true;
   }
    //-------------------SEARCH--------------
   
   $('#search-but').on('click',function(){
	   let str = $('#search-input').val();
	   let users = [];
	   if(!str){
		   return;
	   }
	  // alert(str.indexOf('@'));
	   if(entity=="user"){
		   let urlPath;
		  
		   if(str.indexOf('@')>0){
			   urlPath = "/findMailUser/"+str;
		   }else{
			   urlPath = "/findNameUser/"+str;
		   }
		   $('.admin-info-box').empty();
		   $.ajax({
			   type:"GET",
			   url:urlPath,
			   dataType:"json",
			   cashe:false,
			   success:function(data){
				   let json = JSON.stringify(data);
	    			let myObj = JSON.parse(json);
	    			users = myObj.result;
	    			let table = document.createElement('table');
	    			let trtytle = document.createElement('tr');
	    			let thid = document.createElement('th');
	    			thid.append("ID");
	    			let thlogin = document.createElement('th');
	    			thlogin.append("Логин");
	    			let themail = document.createElement('th');
	    			themail.append("E-mail");
	    			let throle = document.createElement('th');
	    			throle.append("Статус");
	    			trtytle.append(thid,thlogin,themail,throle);
	    			table.append(trtytle);
	    			if(!users.length){
	    				alert(myObj.message);
	    			}
	    			for(let i = 0; i<users.length;i++){
	    				let tr = document.createElement('tr');
	    				let tdID = document.createElement('td');
	    				tdID.append(users[i].id+" ");
	    				let tdName = document.createElement('td');
	    				tdName.append(users[i].username+" ");
	    				let tdMail = document.createElement('td');
	    				tdMail.append(users[i].email+" ");
	    				let tdRole = document.createElement('td');
	    				tdRole.append(users[i].userRole+" ");
	    				tr.append(tdID,tdName,tdMail,tdRole);
	    				table.append(tr);
	    				
	    				
	    			}
	    			$('.admin-info-box').append(table);
				   
			   }
		   });
		   
		   
		   
	   }else{
		   alert('не выбрана сущность');
	   }
   });
$('#cat-input-filter').change(function(){
	let cat = $('#cat-input-filter').val();	
	ajaxFilterGet("/filterCategory/",cat);
	
});
$('#name-input-filter').editableSelect()
	   .on('select.editable-select',function(e,li){
		let name = li.text();
		
	});
	$('#marka-input-filter').editableSelect()
	   .on('select.editable-select',function(e,li){
		let marka = li.text();
		getModel(marka);
		
	});
function getModel(m){
		let marka = m;//$('#marka-prod-field').text();
		$.ajax({
			type:"GET",
			url:"/getCarModel/" + marka,
			success:function(data){
				$('#model-input-filter').empty();
				data.forEach(function(item,i){
					let option = "<option value="+item.id + ">"+item.name+
					" ["+item.yStart+"-"+item.yEnd+"]</option>";
					$('#model-input-filter').append(option);
				});
				
			}
		});
	}
	function findDetails(category){
		$.ajax({
			type:"GET",
			url:"/findDetails/"+category,
			success:function(data){
				$('#name-input-filter').empty();
				data.forEach(function(item,i){
					let option = "<option value="+item.id+">"+item.name+"</option>";
					$('#name-input-filter').append(option);
				})
			},
			async:false
		});
	}
	function ajaxFilterGet(url,param){
		$.ajax({
			type:"GET",
			url:url+param
		});
	}
   
   /*---------------PRODUCT-----------------*/
   
   $('#getProductButton').on('click',function(){
	   entity = "product";
	   let products = [];
	   $('.admin-info-box').empty();
	   $.ajax({
		   type:"GET",
		   url:"/getProducts",
		   dataType:"json",
		   success:function(data){
			   let json = JSON.stringify(data);
			   let myObj = JSON.parse(json);
			   products = myObj;
			   let table = document.createElement('table');
			   let trtytle = document.createElement('tr');
				let thid = document.createElement('th');
				thid.append("ID");
				
				let thart = document.createElement('th');
				thart.append("арт");
				let thname = document.createElement('th');
				thname.append("название");
				let thmarka = document.createElement('th');
				thmarka.append("марка");
				let thmodel = document.createElement('th');
				thmodel.append("модель");
				let thsec = document.createElement('th');
				thsec.append("рест");
				let theng = document.createElement('th');
				theng.append("двиг");
				let thengi = document.createElement('th');
				thengi.append("заметка");
				let thyear = document.createElement('th');
				thyear.append("год");
				let thside = document.createElement('th');
				thside.append("стор");
				let thfront = document.createElement('th');
				thfront.append("ор-я");
				trtytle.append(thid,thart,thname,thmarka,thmodel,thsec,theng,thengi,thyear,thside,thfront);
				table.append(trtytle);
			   for(let i = 0; i<products.length;i++){
				   let tr = document.createElement('tr');
					let tdID = document.createElement('td');
					tdID.append(products[i].id);
					let tdart = document.createElement('td');
					tdart.append(products[i].art);
					let tdname = document.createElement('td');
					tdname.append(products[i].name);
					let tdmarka = document.createElement('td');
					tdmarka.append(products[i].marka);
					let tdmodel = document.createElement('td');
					tdmodel.append(products[i].model);
					let tdsec = document.createElement('td');
					tdsec.append(products[i].rest);
					let tdeng = document.createElement('td');
					tdeng.append(products[i].engToString);
					let tdengi = document.createElement('td');
					tdengi.append(products[i].textServer);
					let tdyear = document.createElement('td');
					tdyear.append(products[i].year);
					let tdside = document.createElement('td');
					tdside.append(products[i].side);
					let tdfront = document.createElement('td');
					tdfront.append(products[i].front);
					
					
					
					tr.append(tdID,tdart,tdname,tdmarka,tdmodel,tdsec,tdeng,tdengi,tdyear,tdside,tdfront);
					table.append(tr);
					
				   
			   }
			   table.classList.add('prodtbl');
			   $('.admin-info-box').append(table);
		   }
	   });
	   
	   
   });
   
   
});


