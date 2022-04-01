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




responsiveBtn.addEventListener('click', () => {
    secondaryNavBar.classList.toggle('secondary-nav-fill');
})

function renderizarLoginYOrdenesDisponibles() {
    login.classList.remove('oculto');


    loginBtn.addEventListener('click', () => {
        login.classList.add('oculto');

        mainNavbar.classList.remove('oculto');
        ordenesDisponibles.classList.remove('oculto');
        footer.classList.remove('oculto');
    })
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