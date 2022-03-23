 
window.onload = function () {
  const cardId = [];
 
  const AddtoCard=[];
  const x = [];
  let totalPayment = 0;
  let totalAmount = 0;


  $.get("/data", (data) => {
    $(".prx").each(function (index, value) {
      cardId.push(data.products[index].id);
      document.getElementsByClassName("addToCardBtn")[index].id = index;
      var y = parseInt(
        document.getElementsByClassName("addToCardBtn")[index].id
      );

      x.push(y);
    });
     
    $(document).ready(function () {
      $(".addToCardBtn").click(function (event) {
        $(".prx").each(function (index, value) {
          if (event.target.id == x[index]) {
            AddtoCard.push(parseInt(event.target.id));
            var img = document.createElement("img");

            img.src = `/image/${
              data.products[event.target.id].image
            }`;
            totalPayment = totalPayment + data.products[event.target.id].price;
            totalAmount = totalAmount + 1;

            $(".sepet").append(
              `
                                
                                
                                <div>                         

                                     <a href="#"class=closebtn><i class="fas fa-times"></i></a>  
                            <div class=card style="margin-top:10%;min-width: 100%;z-index:2;    position: relative; ">
                            
                            <img src=${img.src} width=100%> 
                            <div class=card-body style="margin-top:10%;">
                            <div class=card-title>${
                              data.products[event.target.id].name
                            }</div>
                            <div class=card-text>${
                              data.products[event.target.id].price
                            } TL</div>

                            </div>
                            
                            </div>
                            
               
                             
              
                            </div>
                            `
            );

 

            $(".closebtn").click(function (event) {
              
            
 
              this.parentElement.style.display = "none";

                 this.parentElement.removeChild(this);

                totalPayment =
                  totalPayment - data.products[cardId[index] - 1].price;
                  totalAmount = totalAmount - 1;
                


                  if(totalPayment==0){
                    document.getElementById('toplam').innerHTML="Sepetiniz Boş";
                    document.getElementById('sptamnt').innerHTML="Sepet / --";

                   }
                  else
                  document.getElementById('toplam').innerHTML="Toplam Sepetiniz: "+totalPayment+" TL";
                  document.getElementById('sptamnt').innerHTML=`Sepet / ${totalAmount} `;

             })
          }
        });
        if(totalPayment==0){
          document.getElementById('toplam').innerHTML="Sepetiniz Boş";
          document.getElementById('sptamnt').innerHTML="Sepet / --";

         }
        else
        document.getElementById('toplam').innerHTML="Toplam Sepetiniz: " +totalPayment+" TL";
        document.getElementById('sptamnt').innerHTML=`Sepet / ${totalAmount} `;

        
        
      });
      


      
    });

    $("#ToCard").click(function (event) {  

       
      localStorage.setItem('AddtoCard', JSON.stringify(AddtoCard));
 


       
        });
  });
  
};
 
 