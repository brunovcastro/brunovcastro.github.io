let ProductA1 = [];
let idinfo = localStorage.getItem('catID2');


//función que realiza la petición y me trae los datos del producto 
function inicio(array){

    let product_info = "";
    product_info += `
    <Div style="margin:2em;">
    <h1>${array.name}</h1>
  </Div>
  <hr>
  <div>
    <B>Precio</B>
    <p>${array.currency} ${array.cost}</p>
    <B>Descripción:</B>
    <P>${array.description}</P>
    <B>Categoria:</B>
    <p>${array.category}</p>
    <b>Cantidad Vendidos:</b>
    <p>${array.soldCount}</p>
    <b>imagen ilustrativa:</b>
        <br>
        <br>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="height: 28em; width:45em;">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="${array.images[0]}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${array.images[1]}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${array.images[2]}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="${array.images[3]}" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
            </div>
  <hr>
            `


        document.getElementById("P-info").innerHTML = product_info;
    }



  //función para productos relacionados  
function showProductos(array){

    let product_info = "";
    product_info += `
    
        <div class="col-4 media border list-group-item" onclick="setProducts(${array.relatedProducts[0].id})">
            <h3>${array.relatedProducts[0].name}</h3><br>
            <img src="${array.relatedProducts[0].image}" alt="" class="img-thumbnail" style="height: 15em;">
        </div>
        <div class="col-4 media border list-group-item" onclick="setProducts(${array.relatedProducts[1].id})">
            <h3>${array.relatedProducts[1].name}</h3><br>
            <img src="${array.relatedProducts[1].image}" alt="" class="img-thumbnail" style="height: 15em;">
        </div> `
        
            
        document.getElementById("P-info4").innerHTML = product_info;
    }

    document.addEventListener("DOMContentLoaded", function(){

        getJSONData(PRODUCT_INFO_URL+ idinfo + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                ProductArray = resultObj.data
                inicio(ProductArray);
                showProductos(ProductArray);
                
            }
        });
    });


       
    getJSONData(PRODUCT_INFO_COMMENTS_URL+ idinfo + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                productComment = resultObj.data
                
                showProductComments(productComment)
                addcoment()
                console.log(productComment)
            }
        });


    //función que muestra los comentarios y valoración en estrellas 
        function showProductComments(comments){
             if(comments.length === 0){
                document.getElementById("P-info2").innerHTML = '<p class="text-muter> Oops! No hay comentarios para mostrar...</p>';
            }else{ 
                 let valoracion = '<i class="fas fa-star checked"></i>'.repeat(5);
                  for (let i = 0; i < comments.length; i++) { 
                    if(comments[1].score > 0 && comments[i].score <= 5) {
                        valoracion = '<i class="fa fa-star checked"></i>'.repeat(comments[i].score) 
                        }

                          document.getElementById("P-info2").innerHTML += `
                            <li class="media border list-group-item"> 
                                <div class="media-body">
                                    <label class="mt-0"><strong>${comments[i].user}</strong>
                                        <span class="mute"> - ${comments[i].dateTime}</span>
                                        <span> - ${valoracion}</span>
                                    </label>
                                    <br>
                                    <label class="small">${comments[i].description}</label>
                                </div>
                            </li>
                          `


            
                        };
                    }; 
                };
               



           //función para agregar comentrarios (en desarrollo)    
                function addcoment(){
                    let parrafo =document.getElementById("P-info3")
                    parrafo.innerHTML=`
                    <h1 class="my-3">Agregar Comentario</h1>
                        <hr class="my-4">
                        <div class="row mt-4 g-3">
                            <div class="col-sm-4">
                                <label for="Item" class="form-label">
                                    start:
                                    <select name="estrellas" id="">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select> 
                                </label>
                                <input type="text" class="form-control" id="item">
                                <div class="d-grid">
                                    <button type="button" class="btn btn-primary my-3" id="agregar">Agregar</button>
                                </div>
                            </div>
                        </div>
                         `

                }
