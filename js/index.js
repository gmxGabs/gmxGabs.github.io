$(document).ready(main);

function main(){
    $(".submenu").click(function(event){
        event.preventDefault();
        $(this).children(".submenu2").slideToggle();
    });
}