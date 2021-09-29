window.onload = function(){
    if(!localStorage.getItem("favouriteItems")){
        localStorage.setItem("favouriteItems",JSON.stringify([])) ;
    }
    if(!localStorage.getItem("favmap")){
        localStorage.setItem("favmap",JSON.stringify({})) ;
    }
    showImages()
}

document.getElementById("searchbtnID").addEventListener("click", function(e){
    showImages(e) ;
})

window.onclick = e =>{
   // console.log(e.target.id)
    let id = e.target.id ;
    let favmap = JSON.parse(localStorage.getItem("favmap"))
    if(id)
    {
        if(id.length>3  && id.substring(0,3)=="@@@")
        {
            if(!(id in favmap))
            {
                let data = document.getElementsByClassName(id) ;
                let imgurl = data[0].src;
                let title = data[1].textContent;
                let description = data[2].textContent;

                let obj = {
                    "imgurl":imgurl,
                    "title":title,
                    "description":description
                }
                let data_arr = JSON.parse(localStorage.getItem("favouriteItems")) ;
                data_arr.push(obj)
                localStorage.setItem("favouriteItems",JSON.stringify(data_arr)) ;
                favmap[id]=true;
                localStorage.setItem("favmap",JSON.stringify(favmap)) ;
                let fav = document.getElementById(id);
                fav.classList.remove("far");
                fav.classList.add("fa")
                fav.style.color="red";
            }
            
        }
    }
   

}

function showImages(e){
    let cnt=0;
    var maindiv =document.getElementsByClassName("main-div")[0];
    maindiv.innerHTML=""
    var query = document.getElementById("searchInput").value ;
    // localStorage.setItem("query",query)
    let favmap = JSON.parse(localStorage.getItem("favmap"))
    for(let i=0;i<3;i++)
    {
        var img_api = `https://api.unsplash.com/photos/?client_id=IwytaWPmjFfhCooHFah4n4RwjBumijeN5wT94kiA5jc&page=${i}`
        if(query){
            img_api = `https://api.unsplash.com/search/photos/?client_id=IwytaWPmjFfhCooHFah4n4RwjBumijeN5wT94kiA5jc&query=${query}&page=${i}`;
        }
        //IwytaWPmjFfhCooHFah4n4RwjBumijeN5wT94kiA5jc
        //nishu --   UmPFNyaON_43nwRyZSL6HP1QBWequ24eV5YFiiPUkh0

       // console.log(img_api)
        const xhr = new XMLHttpRequest();
        xhr.open("GET", img_api,true)

        xhr.onload = function (){
            var obj=JSON.parse(xhr.responseText)
            var json=[];

            if(query){
                json = obj["results"]
            }
            else{
                json = obj;
                
            }
           
            for(let j=0;j<json.length;j++)
            {
                // card_img, title, description ,   fav
                let id = "@@@"+json[j]["id"] ;
                                                    
                var coldiv = document.createElement("div");
                coldiv.classList.add("col-md-3" ,"col-10", "mb-4" ,"mx-auto");
                maindiv.appendChild(coldiv);
                // card code
                var carddiv = document.createElement("div");
                carddiv.classList.add("card");
                coldiv.appendChild(carddiv);
                var card_img = document.createElement("img");
                                                
                card_img.src = json[j]["urls"]["full"];
                card_img.classList.add("card-img-top",id);  /*----*/
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
                htag.classList.add("card-title",id);       /*---*/
                htag.innerText = "Image "+cnt;
                htag_div.appendChild(htag);
                title_fav_div.appendChild(htag_div) ;

                var fav_div = document.createElement("div") ;
                fav_div.classList.add("favcls")
                var fontI= document.createElement("i") ;
                fontI.classList.add("far","fa-heart","fa-2x") ;
                if(id in favmap)
                {
                    fontI.classList.remove("far");
                    fontI.classList.add("fa");
                    fontI.style.color="red";
                }
                // fontI.style.color="white";

                fontI.id=id;    /*--- assign id---*/
                fav_div.appendChild(fontI)

                title_fav_div.appendChild(fav_div) ;
                card_body.appendChild(title_fav_div);

                var para =document.createElement("p");
                para.classList.add("card-text",id);    /*------*/
                if(!json[j]["alt_description"])
                {
                    para.innerText= "This is alternative description";
                }
                else
                {
                    if(json[j]["alt_description"].length>42)
                    {
                        para.innerText =json[j]["alt_description"].substring(0,40)+"...";

                    }
                    else{
                        para.innerText =json[j]["alt_description"]
                    }
                }
                card_body.appendChild(para);


                cnt++;
            }
           
        }
        xhr.send();
    }
    if(e) e.preventDefault()
}
