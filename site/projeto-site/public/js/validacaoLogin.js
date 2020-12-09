var form = document.querySelector('form');
var ul = document.querySelector('#menssagemErro');
var erro = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(form);
    var usuario = cadastro(form);
    console.log(usuario);
    var erros = validaUsuario(usuario);
    if (erros.length > 0) {
        exibeErro(erros);
        return;
    } else {
        ul.classList.add('invisivel');
        entrar();
    }
})

function entrar() {

    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(resposta => {

        if (resposta.ok) {

            resposta.json().then(json => {
                
                sessionStorage.login_usuario_meuapp = json.email;
                sessionStorage.nome_usuario_meuapp = json.nome;

                window.location.href = 'tempo-real.html';
            });

        } else {

            console.log('Erro de login!');
            resposta.text().then(texto => {
                console.error(texto);
                erro.push(texto);
                exibeErro(erro);
            });
        }
    });

    return false;
}

function cadastro(form) {
    var novoUsuario = {
        email: form.email.value,
        senha: form.senha.value,
    }
    return novoUsuario;
}

function validaUsuario(usuario) {
    erro = [];

    if (usuario.email == '') {
        erro.push('O email não pode estar em branco.');
    } 

    if (usuario.senha == '') {
        erro.push('A senha não pode estar em branco.');
    }

    return erro;
}

function exibeErro(erros) {
    ul.innerHTML = "";
    erros.forEach(erro => {
        var li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li)
    });
    ul.classList.remove('invisivel');
}