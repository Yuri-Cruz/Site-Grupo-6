var formUsuario = document.querySelector('#formUsuario');
var formEmpresa = document.querySelector('#formEmpresa');
var ul1 = document.querySelector('#menssagemErro1')
var ul2 = document.querySelector('#menssagemErro2')

formUsuario.addEventListener("submit", function (e) {
    e.preventDefault();
    var usuario = capturaUsuario(formUsuario);
    console.log(usuario);
    var erros = validaUsuario(usuario);
    if (erros.length > 0) {
        exibeErroUsuario(erros);
        return;
    } else {
        ul1.classList.add('invisivel');
        trocaForm('none', 'block', 'none')
    }
});

formEmpresa.addEventListener("submit", e => {
    e.preventDefault();
    var empresa = capturaEmpresa(formEmpresa);
    var erros = validaEmpresa(empresa)
    if (erros.length > 0) {
        exibeErroEmpresa(erros);
        return;
    } else {
        ul2.classList.add('invisivel');
        trocaForm('none', 'none', 'flex')
    }
})

function filnalizarCadastro(plano) {
    planoEscolhido.value = plano;
    cadastrarEmpresa();
    cadastrarUsuario();
    cadastrarEndereco();
    cadastrarFilial();
}

function trocaForm(a, b, c) {
    form1.style = 'display: ' + a + ';';
    form2.style = 'display: ' + b + ';';
    form3.style = 'display: ' + c + ';';
}

function capturaUsuario(form) {
    var novoUsuario = {
        nome: form.nome.value,
        sobrenome: form.sobrenome.value,
        email: form.email.value,
        comfirmacaoEmail: form.comfirmacaoEmail.value,
        senha: form.senha.value,
        confirmacaoDeSenha: form.confirmacaoDeSenha.value,
    }
    return novoUsuario;
}

function capturaEmpresa(form) {
    var novaEmpresa = {
        nomeEmpresa: form.nomeEmpresa.value,
        cnpj: form.cnpj.value,
        telefone1: form.telefone1.value,
        telefone2: form.telefone2.value,
        cep: form.cep.value,
        numero: form.numero.value,
        logradouro: form.logradouro.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        bairro: form.bairro.value
    }
    return novaEmpresa;
}

function cadastrarUsuario() {
    var formulario = new URLSearchParams(new FormData(formUsuario));
    fetch("/usuarios/criaUsuario", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (!response.ok) {
            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                menssagemErro1.innerHTML = resposta;
            });
        } 
    });

    return false;
}

function cadastrarEmpresa() {
    var formulario = new URLSearchParams(new FormData(formEmpresa));
    fetch("/empresa/criaEmpresa", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (!response.ok) {
            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                menssagemErro2.innerHTML = resposta;
            });
        } 
    });

    return false;
}
function cadastrarFilial() {
    var formulario = new URLSearchParams(new FormData(formEmpresa));
    fetch("/filial/criaFilial", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            window.location.href = 'login.html'
        } else {
            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                menssagemErro2.innerHTML = resposta;
            });
        }
    });

    return false;
}
function cadastrarEndereco() {
    var formulario = new URLSearchParams(new FormData(formEmpresa));
    fetch("/endereco/criaEndereco", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (!response.ok) {
            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                menssagemErro2.innerHTML = resposta;
            });
        }
    });

    return false;
}

function validaUsuario(usuario) {
    var erro = [];

    if (usuario.nome == '') {
        erro.push('O nome não pode estar em branco.');
    }
    if (usuario.sobrenome == '') {
        erro.push('O sobrenome não pode estar em branco.');
    }

    if (usuario.email == '' || usuario.comfirmacaoEmail == '') {
        if (usuario.email == '') {
            erro.push('O email não pode estar em branco.');
        }
        if (usuario.comfirmacaoEmail == '') {
            erro.push('A comfirmação de email não pode estar em branco.');
        }
    } else if (usuario.email.indexOf('@') < 0 || usuario.comfirmacaoEmail.indexOf('@') < 0) {
        if (usuario.email.indexOf('@') < 0) {
            erro.push('o email deve conter um @.');
        }
        if (usuario.comfirmacaoEmail.indexOf('@') < 0) {
            erro.push('A comfirmação de email deve conter um @.');
        }
    } else if (usuario.email != usuario.comfirmacaoEmail) {
        erro.push('A comfirmação de email não confere.');
    }


    if (usuario.senha == '' || usuario.confirmacaoDeSenha == '') {
        if (usuario.senha == '') {
            erro.push('A senha não pode estar em branco.');
        }
        if (usuario.confirmacaoDeSenha == '') {
            erro.push('A comfirmação de senha não pode estar em branco.');
        }
    } else if (usuario.senha != usuario.confirmacaoDeSenha) {
        erro.push('A comfirmação de senha não confere.');
    } else if(!(usuario.senha.length >= 8)) { 
        erro.push('A senha deve ter no minimo 8 digitos.');
    }



    return erro;
}

function validaEmpresa(empresa) {
    var erro = [];

    if (empresa.nomeEmpresa == '') {
        erro.push('O nome da empresa não pode estar em branco.');
    }

    if (empresa.cnpj == '') {
        erro.push('O cnpj não pode estar em branco.');
    } else if (empresa.cep.length == 14){
        erro.push('O cnpj deve conter 14 digitos sem caracteres especiais( . - ,)');
    }

    if (empresa.telefone1 == '') {
        erro.push('deve conter pelomenos 1 telefone.');
    }

    if (empresa.cep == '') {
        erro.push('O cep não pode estar em branco.');
    } else if (empresa.cep.length != 8){
        erro.push('O cep deve conter 8 digitos sem caracteres especiais( . - ,)');
    }
    
    if (empresa.numero == '') {
        erro.push('O numero não pode estar em branco.');
    }

    if (empresa.logradouro == '') {
        erro.push('O logradouro não pode estar em branco.');
    }
    
    if (empresa.cidade == '') {
        erro.push('A cidade não pode estar em branco.');
    }

    if (empresa.estado == '') {
        erro.push('O estado não pode estar em branco.');
    }

    if (empresa.bairro == '') {
        erro.push('O bairro não pode estar em branco.');
    }


    return erro;
}

function exibeErroUsuario(erros) {
    ul1.innerHTML = "";
    erros.forEach(erro => {
        var li = document.createElement('li');
        li.textContent = erro;
        ul1.appendChild(li)
    });
    ul1.classList.remove('invisivel');
}
function exibeErroEmpresa(erros) {
    ul2.innerHTML = "";
    erros.forEach(erro => {
        var li = document.createElement('li');
        li.textContent = erro;
        ul2.appendChild(li)
    });
    ul2.classList.remove('invisivel');
}