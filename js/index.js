$(document).ready(main);

function main(){
    $(".submenu").click(function(){
        
        $(this).children(".submenu2").slideToggle();
    });
}