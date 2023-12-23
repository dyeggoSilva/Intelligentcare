class MobileNavbar{
    constructor(mobileMenu, navList, navLinks){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    
    }

    animateLinks(){
        this.navLinks.forEach((link)=> {
        link.style.animation ? (link.style.animation = "")
        :(link.style.animation = `navLinkFade 0.5s ease forwards 0.3s`);
        });
    }

    handleClick(){
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent(){
        this.mobileMenu.addEventListener("click",this.handleClick);
    }
    init(){
        if (this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile",
    ".nav-list",
    ".nav-list li"
);





const apiUrl = 'https://registro-de-pedio-api.dyeggochocolat.repl.co';
    
function criarPedido() {
    const pedido = document.getElementById('pedido').value;
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const telefone = document.getElementById('telefone').value;

    fetch(`${apiUrl}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pedido: pedido,
            nome: nome,
            produto: produto,
            telefone: telefone,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido criado:', data);
        listarPedidos();
    })
    .catch(error => {
        console.error('Erro ao criar pedido:', error);
    });
}

function listarPedidos() {
    fetch(`${apiUrl}/pedidos`)
    .then(response => response.json())
    .then(data => {
        const pedidosBody = document.getElementById('pedidosBody');
        pedidosBody.innerHTML = '';

        data.forEach(pedido => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.pedido}</td>
                <td>${pedido.nome}</td>
                <td>${pedido.produto}</td>
                <td>${pedido.telefone}</td>
                <td><button onclick="at(${pedido.id})">Atualizar</button> <button onclick="ex(${pedido.id})">Excluir</button></td>
            `;
            pedidosBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao listar pedidos:', error);
    });
}

function at(id) {

    const pedido = document.getElementById('pedido').value;
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const telefone = document.getElementById('telefone').value;

    fetch(`${apiUrl}/dados/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pedido: pedido,
            nome: nome,
            produto: produto,
            telefone: telefone,
        }),
    })

    .then(response => response.json())
    .then(data => {
        console.log('Atualizar pedido com ID:', id);
        listarPedidos();
    })
    .catch(error => {
        console.error('Erro ao excluir pedido:', error);
    });
    
}

function ex(id) {
    fetch(`${apiUrl}/dados/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido excluído:', data);
        listarPedidos();
    })
    .catch(error => {
        console.error('Erro ao excluir pedido:', error);
    });
}

mobileNavbar.init();
