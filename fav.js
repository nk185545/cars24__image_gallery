window.onload = function(){
    let json = JSON.parse(localStorage.getItem("favouriteItems")) ;
    var maindiv =document.getElementsByClassName("main-div")[0];
    maindiv.innerHTML="";

    for(let j=0;j<json.length;j++)
            {
                var coldiv = document.createElement("div");
                coldiv.classList.add("col-md-3" ,"col-10", "mb-4" ,"mx-auto");
                maindiv.appendChild(coldiv);
                // card code
                var carddiv = document.createElement("div");
                carddiv.classList.add("card");
                coldiv.appendChild(carddiv);
                var card_img = document.createElement("img");
                                                
                card_img.src = json[j]["imgurl"];
                card_img.classList.add("card-img-top");  /*----*/
                card_img.height="250";
                carddiv.appendChild(card_img);

                var card_body = document.createElement("div");
                card_body.style.height="120px"
                card_body.classList.add("card-body");
                carddiv.appendChild(card_body);

                var title_fav_div = document.createElement("div") ;
                title_fav_div.classList.add("title_div_cls") ;

                var htag_div = document.createElement("div") ;
                htag_div.classList.add("htagdivcls")

    
                var htag = document.createElement("h5");
                htag.classList.add("card-title");       /*---*/
                htag.innerText = json[j]["title"];
                htag_div.appendChild(htag);
                title_fav_div.appendChild(htag_div) ;

                var fav_div = document.createElement("div") ;
                fav_div.classList.add("favcls")
                var fontI= document.createElement("i") ;
                fontI.classList.add("fa","fa-heart","fa-2x") ;
                 fontI.style.color="red";

                fav_div.appendChild(fontI)

                title_fav_div.appendChild(fav_div) ;
                card_body.appendChild(title_fav_div);

                var para =document.createElement("p");
                para.classList.add("card-text");    /*------*/
                para.innerText=json[j]["description"];
                card_body.appendChild(para);


                
            }
           
        }

