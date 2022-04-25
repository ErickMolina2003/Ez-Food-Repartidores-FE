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
let renderizarOrdenEntregada = document.querySelector('.entregada-orden');
let ordenesEntregadasContainer = document.querySelector('.ordenes-entregadas-container');


function renderizarEntregadas() {
    axios({
        url: '../Ez-Food-BE/api/finalizar-orden.php',
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        ordenesEntregadasContainer.innerHTML = ``;

        response.data.forEach(ordenFinalizada => {

            ordenesEntregadasContainer.insertAdjacentHTML('beforeend',
                `
        <div class="row pt-2">
        <div class="col-12">
            <div class="row">
                <div class="col-6">
                    <h6>Orden EzFood: ${ordenFinalizada.id} <br>Detalles</h6>
                </div>
                <div class="col-6">
                    <img alt="orden" src="assets/imagenes/LogoFigmaNegro.png" width="60px">
                </div>
            </div>
        </div>
        <hr class="divider my-2">
        <div class="col-12">
            <div class="row">
                <div class="col-6">
                    <h6>Total de entrega: </h6>
                </div>
                <div class="col-6">
                    <h6>LPS. ${ordenFinalizada.Total}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h6>Total de comision: </h6>
                </div>
                <div class="col-6">
                    <h6>LPS. ${ordenFinalizada.TotalComision}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h6>Propinas: </h6>
                </div>
                <div class="col-6">
                    <h6>LPS. ${ordenFinalizada.Propina}</h6>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row justify-content-center my-2">
                <div class="col-5">
                    <button type="button" class="btn btn-warning btn-verDetalle-Entregada">Ver
                        detalles</button>
                </div>
                <div class="col-5">
                    <button type="button" class="btn btn-success">Entregada</button>
                </div>
            </div>
        </div>
        <hr class="divider my-2">
    </div>
        `
            )

        })

        btnDetalleEntregada = document.querySelector('.btn-verDetalle-Entregada');
        renderizarDetalleOrdenEntregada();

    }).catch(err => {
        console.log(err);
    })

}
function finalizarCompletoOrden(idOrden) {

    axios({
        url: `../Ez-Food-BE/api/orden.php?id=${idOrden}&asignada`,
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        response.data.estado = 'entregada';

        axios({
            url: '../Ez-Food-BE/api/finalizar-orden.php',
            method: 'POST',
            responseType: 'json',
            data: response.data
        }).then(res => {

            renderizarEntregadas();


        }).catch(err => {
            console.log(err);
        })





    }).catch(e => {
        console.log(e);
    })

}

function finalizarOrdenFuncion(idOrden) {
    if(idOrden > 1) {
        idOrden--;
    }

    axios({
        url: `../Ez-Food-BE/api/orden.php?id=${idOrden}`,
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        renderizarOrdenEntregada.innerHTML =
            `
    <div class="col-12">
        <div class="row pt-2">
            <div class="col-12">
                <div class="row">
                    <div class="col-6">
                        <h6>Orden EzFood: ${response.data.id} <br>Detalles</h6>
                    </div>
                    <div class="col-6">
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
                        <h6><b>${response.data.direccionOrigen}</b></h6>
                    </div>
                </div>
            </div>
            <div class="col-12 py-1">
                <div class="row">
                    <div class="col-6">
                        <h6>Direccion de envio:</h6>
                    </div>
                    <div class="col-6">
                        <h6><b>${response.data.direccionDestino}</b></h6>
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

            <div class="col-12 productos-de-orden-entregada">
                


            </div>
            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-end">
                    <div class="col-7">
                        <p>Sub total (${response.data.productos.length} productos):</p>
                    </div>
                    <div class="col-5">
                        <div class="row">
                            <div class="col-10">
                                <p>LPS. ${response.data.subTotal}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <h6><b>Impuesto</b></h6>
                    </div>
                    <div class="col-3">
                        <p>Precio</p>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row">
                    <div class="col-9">
                        <p>Impuesto sobre venta</p>
                    </div>
                    <div class="col-3">
                        <p>LPS. ${response.data.ImpuestoVenta}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-9">
                        <p>Impuesto sobre Compra</p>
                    </div>
                    <div class="col-3">
                        <p>LPS. ${response.data.ImpuestoCompra}</p>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-end">
                    <div class="col-6">
                        <p>Total: LPS. ${response.data.Impuesto}</p>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <h6><b>Comisiones</b></h6>
                    </div>
                    <div class="col-3">
                        <p>Precio</p>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row">
                    <div class="col-9">
                        <p>Envio</p>
                    </div>
                    <div class="col-3">
                        <p>LPS. ${response.data.envio}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-9">
                        <p>Propina</p>
                    </div>
                    <div class="col-3">
                        <p>LPS. ${response.data.Propina}</p>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-end">
                    <div class="col-12">
                        <p>Total de comision por envio: LPS. ${response.data.Comision}</p>
                    </div>
                </div>
            </div>

            <hr class="divider">

            <div class="col-12">
                <div class="row justify-content-end">
                    <div class="col-9">
                        <p>Total (${response.data.productos.length} productos): LPS.${response.data.Total}</p>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row justify-content-evenly pt-2 pb-3">
                    <div class="col-6">
                        <button type="button" class="btn btn-success btn-finalizarOrden" onclick="finalizarCompletoOrden(${response.data.id})">Finalizar
                            Orden</button>
                    </div>
                    <div class="col-6">
                        <button type="button"
                            class="btn btn-warning btn-finalizarOrden-atras">Atras</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
        `;

        let contenedorDeProductos = document.querySelector('.productos-de-orden-entregada');
        contenedorDeProductos.innerHTML = ``;

        response.data.productos.forEach(producto => {
            contenedorDeProductos.insertAdjacentHTML('beforeend',
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
            );

        })

        btnFinalizarOrdenAtras = document.querySelector('.btn-finalizarOrden-atras');
        finalizarOrden = document.querySelector('.btn-finalizarOrden');
        btnDetallesPorEntregar = document.querySelectorAll('.por-entregar-detalles');
        renderizarOrdenPorEntregar();
        tituloHeader.innerHTML = `<h3 class="pt-3">Orden Entregada</h3>`

    }).catch(err => {
        console.log(err);
    })

}

function renderizarOrdenesPorEntregar() {
    axios({
        url: `../Ez-Food-BE/api/repartidor.php?id=${idRepartidor}`,
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        ordenesPorEntregarContainer.innerHTML = ``;
        response.data.forEach(orden => {

            ordenesPorEntregarContainer.insertAdjacentHTML('beforeend',
                `
    <div class="row pt-2">
        <div class="col-12">
            <div class="row">
                <div class="col-6">
                    <h6>Orden EzFood: ${orden.id}<br>Detalles</h6>
                </div>
                <div class="col-6">
                    <img alt="orden" src="assets/imagenes/LogoFigmaNegro.png" width="60px">
                </div>
            </div>
        </div>
        <hr class="divider my-2">
        <div class="col-12">
            <div class="row">
                <div class="col-6">
                    <h6>Direccion de origen:</h6>
                </div>
                <div class="col-6">
                    <h6>${orden.direccionOrigen}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h6>Direccion de envio:</h6>
                </div>
                <div class="col-6">
                    <h6>${orden.direccionDestino}</h6>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row justify-content-center my-2">
                <div class="col-5">
                    <button type="button" class="btn btn-warning por-entregar-detalles" onclick="finalizarOrdenFuncion(${orden.id})">Ver
                        detalles</button>
                </div>
                <div class="col-5">
                    <div class="btn-group">
                        <button type="button" class="btn btn-light dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            En Origen
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Tomada</a>
                            <a class="dropdown-item" href="#">En camino</a>
                            <a class="dropdown-item" href="#">En destino</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="divider my-3">

    </div>
        `
            )



        })
        btnFinalizarOrdenAtras = document.querySelector('.btn-finalizarOrden-atras');
        finalizarOrden = document.querySelector('.btn-finalizarOrden');
        btnDetallesPorEntregar = document.querySelectorAll('.por-entregar-detalles');
        renderizarOrdenPorEntregar();

    }).catch(e => {
        console.log(e);
    })
}

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
            tituloHeader.innerHTML = `<h3 class="pt-3">Ordenes por Entregar</h3>`
            renderizarOrdenesPorEntregar();
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
            tituloHeader.innerHTML = `<h3 class="pt-3">Ordenes Disponibles</h3>`
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
        tituloHeader.innerHTML = `<h3 class="pt-3">Detalle de Orden</h3>`

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
crearOrdenesDisponibles();