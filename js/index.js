function generadorDeSecciones(el){
    let secciones = new Set (el.map(producto =>{
        return producto.categoria
    }))
    let seccionesFiltrado = [...secciones];
    seccionesFiltrado.forEach(seccion=>{
        /* Crear secciones en el body */
        document.querySelector('.productos').innerHTML +=
        `<div class="col-12 p-0">
            <h2 class="text-center articuloTitulo  p-3 " id="${seccion}Container">${seccion}</h2>
        </div>
        <div id="${seccion}" class="row p-0 m-0"></div>`
        /* Crear secciones en el navBar*/
        document.querySelector('#navEnlaces').innerHTML += 
        `<li class="nav-item">
            <a class="nav-link" href="#${seccion}Container">${seccion}</a>
        </li>`
    })
}

/* Generar cards en el body */
function crearCard(el){
    el.forEach((producto)=>{
        document.getElementById(producto.categoria).innerHTML +=
        `<div class="col-12 col-sm-6 col-lg-3 p-3 articulos" data-aos="fade-up">
            <div class = "productoContainer">
                <div id="imgContainer">
                    <img src="${producto.img}" alt="${producto.producto} ${producto.tipo}">
                </div>
                <div class="articulosColor">
                    <h5>${producto.tipo}</h5>
                </div>
                <div class="d-flex justify-content-around infoProd">
                    <p class="productoPrecio">$${producto.precio}</p>
                    <button class="carritoA btn">Consultar</button">
                </div>
            </div>
        </div>`
        })
}




fetch('productos.json')
    .then((response)=>response.json())
    .then((productos) => {
        generadorDeSecciones(productos);
        crearCard(productos);
    })



