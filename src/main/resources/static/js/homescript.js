'use strict';
jQuery(function($){
	//-----------------MAIN SECTION--------------
	getEntityList();
	
	
	function getEntityList(){
		$('.main-section').empty();
		let entitys = [];
		$.ajax({
			type: "POST",
			url: "/getUsers",
			dataType: "json",
			cashe: false,
			success:function(data){
				let json = JSON.stringify(data);
				let myObj = JSON.parse(json);
				entitys = myObj.result;
				entitys = entitys.reverse();
				
				
				for(let i = 0; i<entitys.length;i++){
					
					$('.main-section').append(createCard(entitys[i].id,
							entitys[i].name,entitys[i].username,entitys[i].email,
							entitys[i].userRole));
					
					
//					$('<div>',{
//						"class":'wrap-entity',
//						id:'entity'+ entitys[i].id
//					}).appendTo('.main-section');
//					$('<div>',{
//						"class":'row'
//					}).appendTo('#entity'+entitys[i].id);
					
					
				}
			}
		});
		
	}
	
	function createCard(id,name,login,mail,role){
		let wrap = $('<div>',{
			"class":'wrap-entity'
		});
		let row = $('<div>',{
			"class":'row'
		}).appendTo(wrap);
		let col3 = $('<div>',{
			"class":'col-3'
		}).appendTo(row);
		let col2 = $('<div>',{
			"class":'col-2'
		}).appendTo(row);
		let col7 = $('<div>',{
			"class":'col-7'
		}).appendTo(row);
		let wrap_img = $('<div>',{
			"class":'wrap-img'
		}).appendTo(col3);
		wrap_img.append(id);
		let tyt_name = $('<div>',{
			"class":'card-tytle'
		}).appendTo(col2);
		let tyt_login = $('<div>',{
			"class":'card-tytle'
		}).appendTo(col2);
		let tyt_mail = $('<div>',{
			"class":'card-tytle'
		}).appendTo(col2);
		let tyt_role = $('<div>',{
			"class":'card-tytle'
		}).appendTo(col2);
		let name_box = $('<div>',{
			"class":'name-box'
		}).appendTo(col7);
		let login_box = $('<div>',{
			"class":'login-box'
		}).appendTo(col7);
		let mail_box =$('<div>',{
			"class":'mail-box'
		}).appendTo(col7);
		let role_box = $('<div>',{
			"class":'role-box'
		}).appendTo(col7);
		tyt_name.append('ИМЯ');
		tyt_login.append('ЛОГИН');
		tyt_mail.append('ПОЧТА');
		tyt_role.append('СТАТУС');
		
		name_box.append(name);
		login_box.append(login);
		mail_box.append(mail);
		role_box.append(role);
		return wrap;
	}
	
	
});