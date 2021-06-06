$(document).ready(main);

var contador = 1;

function main(){
    $(".barramenu").click(function(){
        if(contador == 1){
            $("nav").animate({
                left: '0'
            });
            contador = 0;
        }
        else{
            contador = 1;
            $("nav").animate({
                left: '-100%'
            });
        }
    });

    $(".submenu").click(function(event){
        event.preventDefault();
        $(this).children(".submenu2").slideToggle();
    });

    let popupViews = document.querySelectorAll('.popup-view');    
    let popupBtns = document.querySelectorAll('.verdetalles');
    let closeBtns = document.querySelectorAll('.bcerrarpopup');
            
    //javascript para abrir el boton
        let popup = function(popupClick){
                   
            popupViews[popupClick].style = "display: block; transition: 1s";
            console.log(popupViews[popupClick]);
        }
            
        popupBtns.forEach((popupBtn, i) => {
            popupBtn.addEventListener("click", () => {
                popup(i);
            });
        });
        
        //javascript para cerrar modal
            closeBtns.forEach((closeBtn) => {
              closeBtn.addEventListener("click", () => {
                popupViews.forEach((popupView) => {
                    popupView.style = "display: none"; 
                });
            });
        });          
}

