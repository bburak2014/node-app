window.onload = function () {
    $.get("/data", (data) => {
   let cardId=0;
   const lastItem = parseInt(data.products[data.products.length - 1].sequenceid);
   cardId=lastItem+1;
 
    document.getElementById("sequenceid").value=cardId;
  
})
}    
//burası add product sayfasında bulunan sequenceid adlı textbox un içerisin otomatik dolmasıı sağlıyor
 