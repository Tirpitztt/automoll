

jQuery(function($){
    
    $('.close-but span').on('click',function(){
       history.back();
    });
    $('.but-inp').on('click',function(){
       
        $('#form_reg').submit();
    });
    
    
});