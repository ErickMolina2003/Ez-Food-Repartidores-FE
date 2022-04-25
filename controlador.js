const secondaryNavBar = document.querySelector('.secondary-nav');
const responsiveBtn = document.querySelector('.navbar-toggler');
const mainNavbar = document.querySelector('.navbar');
const login = document.querySelector('.login');
const loginBtn = document.querySelector('.login-btn');
const ordenesDisponibles = document.querySelector('.ordenes-disponibles');
const footer = document.querySelector('.footer');
const verDetalleOrden = document.querySelectorAll('.ver-detalle-orden');
const detallesOrden = document.querySelector('.ordenes-detalles');
const ordenEntregar = document.querySelector('.btn-orden-detalle');
const ordenAtras = document.querySelector('.btn-orden-atras');
const ordenesPorEntregar = document.querySelector('.ordenes-por-entregar');
const btnDetallesPorEntregar = document.querySelectorAll('.por-entregar-detalles');
const entregandoOrden = document.querySelector('.orden-entregada');
const btnFinalizarOrdenAtras = document.querySelector('.btn-finalizarOrden-atras');
const finalizarOrden = document.querySelector('.btn-finalizarOrden');
const ordenesEntregadas = document.querySelector('.ordenes-entregadas');
const btnDetalleEntregada = document.querySelector('.btn-verDetalle-Entregada');
const linkToDisponibles = document.querySelector('.ordenes-disponibles-link');
const linkToPorEntregar = document.querySelector('.porEntregar-link');
const linkToEntregadas = document.querySelector('.entregadas-link');
const linkToLogin = document.querySelector('.salir-link');
const loginContainer = document.querySelector('.login-container');
const crearUsuario = document.querySelector('.crear-usuario');

function logCredenciales() {
    axios({
        url: '../Ez-Food-BE/api/repartidor.php',
        method: 'GET',
        responseType: 'json',
    }).then((response) => {
        console.log(response.data)

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

function renderizarDetalleOrden() {
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

    ordenAtras.addEventListener('click', () => {
        mainNavbar.classList.add('oculto');
        detallesOrden.classList.add('oculto');
        footer.classList.add('oculto');

        mainNavbar.classList.remove('oculto');
        ordenesDisponibles.classList.remove('oculto');
        footer.classList.remove('oculto');
    })

    ordenEntregar.addEventListener('click', () => {
        mainNavbar.classList.add('oculto');
        detallesOrden.classList.add('oculto');
        footer.classList.add('oculto');

        mainNavbar.classList.remove('oculto');
        ordenesPorEntregar.classList.remove('oculto');
        footer.classList.remove('oculto');
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
renderizarDetalleOrden();
renderizarOrdenPorEntregar();
renderizarDetalleOrdenEntregada();