let secondaryNavBar = document.querySelector('.secondary-nav');
let responsiveBtn = document.querySelector('.navbar-toggler');
let mainNavbar = document.querySelector('.navbar');
let login = document.querySelector('.login');
let loginBtn = document.querySelector('.login-btn');
let ordenesDisponibles = document.querySelector('.ordenes-disponibles');
let footer = document.querySelector('.footer');
let verDetalleOrden = document.querySelectorAll('.ver-detalle-orden');
let detallesOrden = document.querySelector('.ordenes-detalles');
let ordenEntregar = document.querySelector('.btn-orden-detalle');
let ordenAtras = document.querySelector('.btn-orden-atras');
let ordenesPorEntregar = document.querySelector('.ordenes-por-entregar');
let btnDetallesPorEntregar = document.querySelectorAll('.por-entregar-detalles');
let entregandoOrden = document.querySelector('.orden-entregada');
let btnFinalizarOrdenAtras = document.querySelector('.btn-finalizarOrden-atras');
let finalizarOrden = document.querySelector('.btn-finalizarOrden');
let ordenesEntregadas = document.querySelector('.ordenes-entregadas');
let btnDetalleEntregada = document.querySelector('.btn-verDetalle-Entregada');
let linkToDisponibles = document.querySelector('.ordenes-disponibles-link');
let linkToPorEntregar = document.querySelector('.porEntregar-link');
let linkToEntregadas = document.querySelector('.entregadas-link');
let linkToLogin = document.querySelector('.salir-link');
let loginContainer = document.querySelector('.login-container');
let crearUsuario = document.querySelector('.crear-usuario');
let contenedorOrdenesDisponibles = document.querySelector('.ordenes-disponibles-container');
let contenedorDetallesOrdenes = document.querySelector('.contenedor-detalles-ordenes');
let idRepartidor;
let tituloHeader = document.querySelector('.titles-container');
let ordenesPorEntregarContainer = document.querySelector('.ordenes-por-entregar-container');

function asignarOrden(idOrden) {
    axios({
        url: `../Ez-Food-BE/api/orden.php?id=${idOrden}`,
        responseType: 'json',
        method: 'GET'
    }).then(response => {
        response.data.estado = "origen";
        response.data.repartidor = idRepartidor;

        axios({
            url: '../Ez-Food-BE/api/tomar-orden.php',
            responseType: 'json',
            method: 'POST',
            data: response.data
        }).then(res => {
            console.log(res);
            tituloHeader.innerHTML= `<h3 class="pt-3">Ordenes por Entregar</h3>`
        }).catch(e => {
            console.log(e);
        })

    }).catch(err => {
        console.log(err);
    })
}

function detalleDeOrden(id) {

    axios({
        url: `../Ez-Food-BE/api/orden.php?id=${id}`,
        responseType: 'json',
        method: 'GET'
    }).then(res => {
        console.log(res.data);
        contenedorDetallesOrdenes.innerHTML =
            `
        <div class="col-12 detalle-orden">
        <div class="row pt-2">
            <div class="col-12">
                <div class="row justify-content-between">
                    <div class="col-6">
                        <h6>Orden EzFood: ${res.data.id} <br>Detalles</h6>
                    </div>
                    <div class="col-3">
                        <img alt="orden" src="assets/imagenes/LogoFigmaNegro.png" width="60px">
                    </div>
                </div>
            </div>
            <hr class="divider my-2">
            <div class="col-12 py-1">
                <div class="row">
                    <div class="col-6">
                        <h6>Origen:</h6>
                    </div>
                    <div class="col-6">
                        <h6><b>${res.data.direccionOrigen}</b></h6>
                    </div>
                </div>
            </div>
            <div class="col-12 py-1">
                <div class="row">
                    <div class="col-6">
                        <h6>Direccion de envio:</h6>
                    </div>
                    <div class="col-6">
                        <h6><b>${res.data.direccionDestino}</b></h6>
                    </div>
                </div>
            </div>
            <hr class="divider my-2">

            <div class="col-12 py-1">
                <div class="row">
                    <div class="col-6">
                        <h6>Productos</h6>
                    </div>
                    <div class="col-6">
                        <div class="row justify-content-end">
                            <div class="col-5">
                                <p><b>Precio</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="divider">

            <div class="col-12 detalles-productos-container">
                
            </div>
            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-end">
                    <div class="col-9 detalles-precio-container">
                        
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row justify-content-evenly py-1">
                    <div class="col-5">
                        <button type="button" class="btn btn-success btn-orden-detalle" onclick="asignarOrden(${id})">Tomar Orden</button>
                    </div>
                    <div class="col-5">
                        <button type="button" class="btn btn-warning btn-orden-atras">Atras</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
        `;

        let detallesProductosContainer = document.querySelector('.detalles-productos-container');
        res.data.productos.forEach(producto => {
            detallesProductosContainer.insertAdjacentHTML('beforeend',
                `
                <div class="row">
                    <div class="col-9">
                        <p>${producto.empresaProducto}</p>
                    </div>
                    <div class="col-3">
                        <p>LPS. ${producto.precioProducto}</p>
                    </div>
                </div>
            `
            )

        })

        let detallesPrecioContainer = document.querySelector('.detalles-precio-container');
        detallesPrecioContainer.innerHTML = `<p>Total (${res.data.productos.length} productos): LPS.${res.data.subTotal}</p>`

        ordenAtras = document.querySelector('.btn-orden-atras');
        ordenEntregar = document.querySelector('.btn-orden-detalle');

        ordenAtras.addEventListener('click', () => {
            mainNavbar.classList.add('oculto');
            detallesOrden.classList.add('oculto');
            footer.classList.add('oculto');

            mainNavbar.classList.remove('oculto');
            ordenesDisponibles.classList.remove('oculto');
            footer.classList.remove('oculto');
            tituloHeader.innerHTML= `<h3 class="pt-3">Ordenes Disponibles</h3>`
        })

        ordenEntregar.addEventListener('click', () => {
            mainNavbar.classList.add('oculto');
            detallesOrden.classList.add('oculto');
            footer.classList.add('oculto');

            mainNavbar.classList.remove('oculto');
            ordenesPorEntregar.classList.remove('oculto');
            footer.classList.remove('oculto');
        })

        
        renderizarDetalleOrden(document.querySelectorAll('.ver-detalle-orden'));
        tituloHeader.innerHTML= `<h3 class="pt-3">Detalle de Orden</h3>`

    }).catch(e => {
        console.log(e);
    })


}

function crearOrdenesDisponibles() {

    axios({
        url: '../Ez-Food-BE/api/orden.php',
        responseType: 'json',
        method: 'GET'
    }).then(response => {
        // contenedorOrdenesDisponibles.innerHTML = ``;
        response.data.forEach((orden) => {

            contenedorOrdenesDisponibles.insertAdjacentHTML('beforeend',
                `
    <div class="col-12 mt-2 mb-2 orden-col">           
        <div class="row pt-2">
            <div class="col-12">
                <div class="row justify-content-between">
                    <div class="col-6">
                        <h6>Orden EzFood: ${orden.id} <br>Detalles</h6>
                    </div>
                    <div class="col-3">
                        <div class="col">
                            <img alt="Ez-Food" src="assets/imagenes/LogoFigmaBlanco.svg" width="60px">
                        </div>
                    </div>
                </div>
            </div>
            <hr class="divider my-2">
            <div class="col-12">
                <div class="row">
                    <div class="col-6">
                        <h6>Comision: ${orden.TotalComision}</h6>
                    </div>
                    <div class="col-6">
                        <h6>Origen: ${orden.direccionOrigen}</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <h6>Direccion de envio: </h6>
                    </div>
                    <div class="col-6">
                        <h6>${orden.direccionDestino}</h6>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row justify-content-center my-2">
                    <div class="col-5">
                        <button type="button" class="btn btn-warning ver-detalle-orden" onclick="detalleDeOrden(${orden.id})">Ver
                            detalles</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
        `
            )
        })

    }).catch(error => {
        console.log(error)
    })

}

function logCredenciales() {
    axios({
        url: '../Ez-Food-BE/api/repartidor.php',
        method: 'GET',
        responseType: 'json',
    }).then((response) => {

        let usuarioLog = document.querySelector('.login-input').value;
        let contrasenaLog = document.querySelector('.password-input').value;

        if (usuarioLog && contrasenaLog) {
            let contador = 0;

            response.data.forEach((data) => {
                if (data.repartidor == usuarioLog && data.contrasena == contrasenaLog) {
                    login.classList.add('oculto');

                    mainNavbar.classList.remove('oculto');
                    ordenesDisponibles.classList.remove('oculto');
                    footer.classList.remove('oculto');

                    idRepartidor = data.id;
                    contador++;
                }
            })

            if (contador == 0) {
                alert('Usuario no encontrado\nIntente nuevamente o cree uno nuevo');
            }

        }

        if (!usuarioLog || !contrasenaLog) {
            alert('Ingrese las credenciales');
        }



    }).catch((err) => {
        console.log(err);
    })

}



function creandoUsuario() {
    loginContainer.innerHTML = ``;

    loginContainer.insertAdjacentHTML('beforeend',
        `
    <div class="row align-items-center justify-content-center login-content">
        <div class="col-3 my-2">
            <img alt="user-logo" src="assets/imagenes/600px-Motorcycle_icon.svg.png" width="60px">
        </div>
        <div class="col-10 my-2">
            <input type="string" class="form-control login-input"
                aria-describedby="emailHelp" placeholder="Username">
        </div>
        <div class="col-10 my-2">
                   <input type="password" class="form-control password-input" 
                    aria-describedby="emailHelp" placeholder="Password">
        </div>
        <div class="col-10 my-2">
                    <input type="password" class="form-control password-confirm" 
                        aria-describedby="emailHelp" placeholder="Confirm Password">
                </div>
            <div class="col-10 mt-5 mb-2">
            <button type="button" class="btn btn-light create-btn" onclick=crearUsuarioBE()>Crear</button>
        </div>
        <div class="col-7 crear-usuario"> 
            
        </div>
    </div>
    `
    )
}

function crearUsuarioBE() {
    let usuario = document.querySelector('.login-input').value;
    let contrasena = document.querySelector('.password-input').value;
    let confirmarContrasena = document.querySelector('.password-confirm').value;
    if (usuario && contrasena && confirmarContrasena && contrasena == confirmarContrasena) {
        let nuevoUsuario = {
            "repartidor": usuario,
            "contrasena": contrasena
        }

        axios({
            url: '../Ez-Food-BE/api/repartidor.php',
            method: 'POST',
            responseType: 'json',
            data: nuevoUsuario
        }).then((response) => {

            loginContainer.innerHTML = ``;

            loginContainer.insertAdjacentHTML('beforeend', `
        <div class="row align-items-center justify-content-center login-content">
                <div class="col-3 my-2">
                    <img alt="user-logo" src="assets/imagenes/600px-Motorcycle_icon.svg.png"" width="60px">
                </div>
                <div class="col-10 my-2">
                    <input type="string" class="form-control login-input" 
                        aria-describedby="emailHelp" placeholder="Username">
                </div>
                <div class="col-10 my-2">
                    <input type="password" class="form-control password-input" 
                        aria-describedby="emailHelp" placeholder="Password">
                </div>
                <div class="col-10 mt-5 mb-2">
                    <button type="button" class="btn btn-light login-btn" onclick=logCredenciales()>LOGIN</button>
                </div>
                <div class="col-4 crear-usuario" onclick=creandoUsuario()>
                    <a>Crear Usuario</a>
                </div>
        </div>
    `)

            confirmarContrasena = '';
            contrasena = '';
            usuario = '';
            crearUsuario.addEventListener('click', creandoUsuario);

        }).catch((error) => {
            console.log(error);
        })

    }
    if (!usuario || !contrasena || !confirmarContrasena) {
        alert('Empty fields \nYou must fill all the fields')
    }
    if (contrasena != confirmarContrasena) {
        alert('Wrong confirmation password')
    }
}


responsiveBtn.addEventListener('click', () => {
    secondaryNavBar.classList.toggle('secondary-nav-fill');
})

function renderizarLoginYOrdenesDisponibles() {
    login.classList.remove('oculto');


    loginBtn.addEventListener('click', logCredenciales)
}

function renderizarDetalleOrden(verDetalleOrden) {
    verDetalleOrden.forEach(element => {
        element.addEventListener('click', () => {
            mainNavbar.classList.add('oculto');
            ordenesDisponibles.classList.add('oculto');
            footer.classList.add('oculto');

            mainNavbar.classList.remove('oculto');
            detallesOrden.classList.remove('oculto');
            footer.classList.remove('oculto');
        })
    })


}

function renderizarOrdenPorEntregar() {
    btnDetallesPorEntregar.forEach(btn => {
        btn.addEventListener('click', () => {
            mainNavbar.classList.add('oculto');
            ordenesPorEntregar.classList.add('oculto');
            footer.classList.add('oculto');

            mainNavbar.classList.remove('oculto');
            entregandoOrden.classList.remove('oculto');
            footer.classList.remove('oculto');
        })
    })

    finalizarOrden.addEventListener('click', () => {
        mainNavbar.classList.add('oculto');
        entregandoOrden.classList.add('oculto');
        footer.classList.add('oculto');

        mainNavbar.classList.remove('oculto');
        ordenesEntregadas.classList.remove('oculto');
        footer.classList.remove('oculto');
    })

    btnFinalizarOrdenAtras.addEventListener('click', () => {
        mainNavbar.classList.add('oculto');
        entregandoOrden.classList.add('oculto');
        footer.classList.add('oculto');

        mainNavbar.classList.remove('oculto');
        ordenesPorEntregar.classList.remove('oculto');
        footer.classList.remove('oculto');
    })
}

function renderizarDetalleOrdenEntregada() {
    btnDetalleEntregada.addEventListener('click', () => {
        mainNavbar.classList.add('oculto');
        ordenesEntregadas.classList.add('oculto');
        footer.classList.add('oculto');

        mainNavbar.classList.remove('oculto');
        entregandoOrden.classList.remove('oculto');
        footer.classList.remove('oculto');
    })
}

linkToDisponibles.addEventListener('click', () => {
    ocultarTodo();

    mainNavbar.classList.remove('oculto');
    ordenesDisponibles.classList.remove('oculto');
    footer.classList.remove('oculto');
})

linkToPorEntregar.addEventListener('click', () => {
    ocultarTodo();

    mainNavbar.classList.remove('oculto');
    ordenesPorEntregar.classList.remove('oculto');
    footer.classList.remove('oculto');
})


linkToEntregadas.addEventListener('click', () => {
    ocultarTodo();

    mainNavbar.classList.remove('oculto');
    ordenesEntregadas.classList.remove('oculto');
    footer.classList.remove('oculto');
})


linkToLogin.addEventListener('click', () => {
    ocultarTodo();

    login.classList.remove('oculto');
})




function ocultarTodo() {
    login.classList.add('oculto');
    mainNavbar.classList.add('oculto');
    footer.classList.add('oculto');
    ordenesDisponibles.classList.add('oculto');
    detallesOrden.classList.add('oculto');
    ordenesPorEntregar.classList.add('oculto');
    entregandoOrden.classList.add('oculto');
    ordenesEntregadas.classList.add('oculto');
}


renderizarLoginYOrdenesDisponibles();
renderizarOrdenPorEntregar();
renderizarDetalleOrdenEntregada();
crearOrdenesDisponibles();