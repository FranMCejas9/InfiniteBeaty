
function generadorDeSecciones(el){
    let secciones = new Set (el.map(producto =>{
        return producto.categoria
    }))
    let seccionesFiltrado = [...secciones];
    seccionesFiltrado.forEach(seccion=>{
        seccionesBody(seccion);
        seccionesNavBar(seccion);
        filtroCategoria(seccion);
    })
}
function seccionesBody(el){
    /* Crear secciones en el body */
        document.querySelector('.productos').innerHTML +=
        `<div class="col-12 p-0">
            <h2 class="text-center articuloTitulo  p-3 " id="${el}Container">${el}</h2>
        </div>
        <div id="${el}" class="row p-0 m-0"></div>`;
    }

function seccionesNavBar(el){
    /* Crear secciones en el navBar*/
    document.querySelector('#navEnlaces').innerHTML += 
    `<li class="nav-item">
        <a class="nav-link" data-categoria="${el}" id="filter${el}Nav">${el}</a>
    </li>`
}

function filtroCategoria(el){
    /* Crear filtros categoria*/
    document.querySelector('#filtroCategoria').innerHTML += 
    `<li class="nav-item">
        <a class="nav-link" data-categoria="${el}" id="filter${el}">${el}</a>
    </li>`
}


function agregarSpinner(el){
    document.querySelector(el).innerHTML = `
    <div class="spinnerLoading">
        <div class="spinner-border " role="status">
            <span class="visually-hidden"></span>
        </div
    </div>`
}

function quitarSpinner(el){
    let padre = document.querySelector(el);
    let hijo = document.querySelector(".spinnerLoading");
    padre.removeChild(hijo)
}

function renderizarFiltro(el){
    el.forEach((producto)=>{
        document.querySelector('.productos').innerHTML +=
        `<div class="col-12 col-sm-6 col-lg-3 p-3 articulos"  data-cortar= "cortar">
                <div class = "productoContainer">
                    <div id="imgContainer">
                        <img src="${producto.img}" alt="${producto.producto} ${producto.tipo}">
                    </div>
                    <div class="articulosColor">
                        <h5>${producto.tipo}</h5>
                    </div>
                    <div class="infoProd">
                        <div>
                            <p class="productoPrecio">$${producto.precio}</p>
                        </div>
                        <div>
                            <button class="consultar${producto.id}" btn">Consultar</button">
                        </div>
                    </div>
                </div>
            </div>`
        });
    consultarProducto(el)
}



function mayorPrecio(el){
    let contador = 0
    document.querySelector('#filterMayor').addEventListener('click',()=>{
        document.querySelector('.productos').innerHTML = ''
        let precios = el.map((producto)=>{
            return producto.precio
        })
        let preciosFiltrados = precios.sort(function(a, b){return b - a})
        let filtro = new Set (preciosFiltrados.map(precio =>{
            return precio
        }))
        let segundoFiltro = [...filtro]
        agregarSpinner('.productos');
        setTimeout(() => {
            quitarSpinner('.productos');
            el.forEach(()=>{
                if(contador < segundoFiltro.length){
                    let indice = el.filter((index)=> index.precio === segundoFiltro[contador])
                    renderizarFiltro(indice)
                }
                contador +=1
                if(contador === el.length){
                    contador = 0
                };
        })
        }, 2000);
    })
}

function menorPrecio(el){
    let contador = 0
    document.querySelector('#filterMenor').addEventListener('click',()=>{
        document.querySelector('.productos').innerHTML = ''
        let precios = el.map((producto)=>{
            return producto.precio
        })
        let preciosFiltrados = precios.sort(function(a, b){return a - b})
        let filtro = new Set (preciosFiltrados.map(precio =>{
            return precio
        }))
        let segundoFiltro = [...filtro]
        agregarSpinner('.productos');
        setTimeout(() => {
            quitarSpinner('.productos');
            el.forEach(()=>{
                if(contador < segundoFiltro.length){
                    let indice = el.filter((index)=> index.precio === segundoFiltro[contador])
                    renderizarFiltro(indice)
                }
                contador +=1
                if(contador === el.length){
                    contador = 0
                };
        })
        }, 2000);
    })
}



function filtrarCategoria(el){
    el.forEach((producto)=>{
        let idFiltro = `filter${producto.categoria}`
        let idFiltro2 = `filter${producto.categoria}Nav`
        document.querySelector(`#${idFiltro2}`).addEventListener('click', (event)=>{ 
            let nodo = document.querySelector('.productos')
            let nodoHijo = nodo.firstElementChild.getAttribute('data-cortar')
            if(nodoHijo != 'cortar'){
                location.href = `#${producto.categoria}Container`
            } else if(nodoHijo === 'cortar'){
                document.querySelector('.productos').innerHTML = "";
                let secciones = new Set (el.map(producto =>{
                    return producto.categoria
                }))
                let seccionesFiltrado = [...secciones];
                seccionesFiltrado.forEach(seccion=>{
                    seccionesBody(seccion);
                })
                crearCard(el);
                setTimeout(() => {
                    location.href = (`#${producto.categoria}Container`)
                }, 2005);
            }
        })
        document.querySelector(`#${idFiltro}`).addEventListener('click', (event)=>{ 
            document.querySelector('.productos').innerHTML = ''
            let filtro = event.target.getAttribute("data-categoria")
            let filtrar = el.filter(producto => producto.categoria === filtro)
            agregarSpinner('.productos');
            setTimeout(() => {
                quitarSpinner('.productos');
                renderizarFiltro(filtrar);
            }, 2000);
    })
    })
}

/* Generar cards en el body */
function crearCard(el){
    el.forEach((producto)=>{
        agregarSpinner(`#${producto.categoria}`);
        setTimeout(() => {
            quitarSpinner(`#${producto.categoria}`)
        }, 2005);
    })
    setTimeout(() => {
        el.forEach((producto)=>{
            document.getElementById(producto.categoria).innerHTML +=
            `<div class="col-12 col-sm-6 col-lg-3 p-3 articulos">
                <div class = "productoContainer">
                    <div id="imgContainer">
                        <img src="${producto.img}" alt="${producto.producto} ${producto.tipo}">
                    </div>
                    <div class="articulosColor">
                        <h5>${producto.tipo}</h5>
                    </div>
                    <div class="infoProd">
                        <div>
                            <p class="productoPrecio">$${producto.precio}</p>
                        </div>
                        <div>
                            <button class="consultar${producto.id}" btn">Consultar</button">
                        </div>
                    </div>
                </div>
            </div>`
            });
    }, 2005);
}



function consultarProducto(el){
    setTimeout(() => {
    el.forEach((producto)=>{
        let botonConsultar = `consultar${producto.id}`
        document.querySelector(`.${botonConsultar}`).addEventListener('click', ()=>{
            location.href = `https://api.whatsapp.com/send?phone=542478476404&text=Hola!%20me%20gustaria%20saber%20si%20tenés%20disponible%20${producto.producto}%20${producto.tipo}`
        })
    });
    }, 2010);
}

fetch('productos.json')
    .then((response)=>response.json())
    .then((productos) => {
        generadorDeSecciones(productos);
        crearCard(productos);
        consultarProducto(productos);
        filtrarCategoria(productos);
        mayorPrecio(productos);
        menorPrecio(productos);
    })
