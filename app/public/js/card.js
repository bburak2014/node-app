window.onload = function () {
 

  $.get("/data", (data) => {
    $.get("/data_SalesDetail", (data_SalesDetail) => {
  
    
    let deleted = [];
    let totalPayment = 0;
    let AddtoCard;
    let myAddtoCard;

     
  


     AddtoCard = localStorage.getItem("AddtoCard");

     myAddtoCard = ("AddtoCard: ", JSON.parse(AddtoCard));
   
    

    for (let i = 0; i < myAddtoCard.length; i++) {
      var img = document.createElement("img");
      deleted.push(myAddtoCard[i]);
      img.src = `/image/${data.products[myAddtoCard[i]].image}`;
      totalPayment = totalPayment + data.products[myAddtoCard[i]].price;
      $("#cardmenum").append(
        `
                               
                              
                              <div class="col-12 col-md-4">                         

                                   <a href="#"class=closebtn><i class="fas fa-times"></i></a>  
                          <div class=card style="margin-top:10%;max-width: 100%; ">
                          
                          <img src=${img.src} width=100%> 
                          <div class=card-body style="margin-top:10%;">
                          <div class=card-title>${
                            data.products[myAddtoCard[i]].name
                          }</div>
                          <div class="d-none">
                          <div class=card-text >${
                            data.products[myAddtoCard[i]].sequenceid
                          } </div>
                          </div>
                          <div class=card-text >${
                            data.products[myAddtoCard[i]].price
                          } </div>

                          </div>
                          
                          </div>
                          
             
                           
            
                          



                          </div>

                          `
      );
    }
    function reqForm(){
      for (let i = 0; i < data.products.length; i++) {
        for (let j = 0; j < data.products.length; j++) {

        if(data.products[j].sequenceid==deleted[i]+1)
        {
          document.getElementById("sales_product_name").value=data.products[j].name;
          document.getElementById("sales_product_group").value=data.products[j].product_group;
          document.getElementById("sales_product_type").value=data.products[j].product_type;
          let cardId=0;
           const lastItem = parseInt(data_SalesDetail.sales_detail[data_SalesDetail.sales_detail.length - 1].userid);
           cardId=lastItem+1;

          document.getElementById("userid").value=cardId;



        }
 

      }}
   }
   reqForm();

    $(document).ready(function() {
      $(".closebtn").each(function (index, value) {

        document.getElementsByClassName("closebtn")[index].id = index;
   
      });

    $(".closebtn").click(function (event) {
        var contentPanelId = jQuery(this).attr("id");
         
        let pricenow=parseInt(this.parentElement.lastElementChild.lastElementChild.lastElementChild.textContent);
        let p=parseInt(this.parentElement.children[1].children[1].children[1].textContent)-1;
         for( var i = 0; i < myAddtoCard.length; i++){ 
          
          if ( myAddtoCard[i] === p) { 
      
            myAddtoCard.splice(i, 1);
 
            localStorage.setItem("AddtoCard", JSON.stringify(myAddtoCard));
            console.log(myAddtoCard[i]) 

          }
      
      }
  
      
    
      this.parentElement.style.display = "none";

      this.parentElement.removeChild(this);
      totalPayment = totalPayment - pricenow;

      document.getElementById("payment").innerHTML=totalPayment;


      // window.localStorage.removeItem('myAddtoCard');
    });
    document.getElementById("payment").innerHTML=totalPayment;
  });
})
});

};
