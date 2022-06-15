                            // CRIAR CONTA NA APLICAÇÃO
let btnCriarConta = document.getElementById('btnCriarConta') as HTMLButtonElement
let modalCadastro = document.getElementById('modalCadastro') as HTMLDivElement
let modalCadastroBTS = new bootstrap.Modal('#modalCadastro')
let formCadastro = document.getElementById('formCadastro') as HTMLFormElement
let nomeCadastro = document.getElementById('nomeCadastro') as HTMLInputElement;
let emailCadastro = document.getElementById('emailCadastro') as HTMLInputElement;
let senhaCadastro = document.getElementById('senhaCadastro') as HTMLInputElement;
let confirmaSenhaCadastro = document.getElementById('confirmaSenhaCadastro') as HTMLInputElement;
let labelNomeCadastro = document.getElementById('labelNomeCadastro') as HTMLLabelElement;
let labelEmailCadastro = document.getElementById('labelEmailCadastro') as HTMLLabelElement;
let labelSenhaCadastro = document.getElementById('labelSenhaCadastro') as HTMLLabelElement;
let labelConfirmaSenhaCadastro= document.getElementById('labelConfirmaSenhaCadastro') as HTMLLabelElement;

interface Usuario {
    nome: string;
    email: string;
    senha: string
    recados: any[]
}

formCadastro.addEventListener('submit' , (e)=>{
    e.preventDefault();

    verificarCamposCadastro();
});


function verificarCamposCadastro(): void {

    if (nomeCadastro.value === '' || nomeCadastro.value.length < 2) {
        nomeCadastro.focus();
        nomeCadastro.setAttribute('style', 'background-color: #ff9999');
        labelNomeCadastro.innerHTML = 'Digite seu nome:: *O nome deve ter no minimo 3 letras!'
        return
        
    } 
    if (emailCadastro.value === '' || emailCadastro.value.length < 12) {
        emailCadastro.focus();
        emailCadastro.setAttribute('style', 'background-color: #ff9999');
        labelEmailCadastro.innerHTML = 'Digite seu e-mail: *O e-mail deve ter no mínimo 10 caracteres!*'
        return
    }
    if (senhaCadastro.value === '' || senhaCadastro.value.length < 6) {
        senhaCadastro.focus();
        senhaCadastro.setAttribute('style', 'background-color: #ff9999');
        labelSenhaCadastro.innerHTML = 'Crie uma senha: *A senha deve ter no mínimo 6 caracteres!*'
        return
    }
    if (confirmaSenhaCadastro.value === '' || confirmaSenhaCadastro.value != senhaCadastro.value) {
        confirmaSenhaCadastro.focus();
        confirmaSenhaCadastro.setAttribute('style', 'background-color: #ff9999');
        labelConfirmaSenhaCadastro.innerHTML = 'Confirme sua senha: *As senhas não correspondem!* '
        return
    }    


    nomeCadastro.removeAttribute('style');
    emailCadastro.removeAttribute('style');
    senhaCadastro.removeAttribute('style');
    confirmaSenhaCadastro.removeAttribute('style'); 
    labelNomeCadastro.removeAttribute('style'); 
    labelEmailCadastro.removeAttribute('style'); 
    labelSenhaCadastro.removeAttribute('style'); 
    labelConfirmaSenhaCadastro.removeAttribute('style'); 

    let novoUsuario: Usuario = {
        nome: nomeCadastro.value,
        email: emailCadastro.value,
        senha: senhaCadastro.value,
        recados: []
    
    }


    cadastrarUsuario(novoUsuario);
}

function cadastrarUsuario (novoUsuario: Usuario) {
    let listaUsuarios: Usuario[] = buscarUsuarioNoStorage();

    let existe: boolean =  listaUsuarios.some((usuario) =>{
        return usuario.email === novoUsuario.email
    });

    if (existe) {
        let confirma = confirm("Já existe uma conta com este e-mail. Gostaria de realizar o login?");

        if (confirma) {
            modalCadastroBTS.hide();
        }
        
        return
    }

    listaUsuarios.push(novoUsuario);
    window.localStorage.setItem('usuarios' , JSON.stringify(listaUsuarios));

    alert('Conta criada com sucesso!');
    formCadastro.reset();
    modalCadastroBTS.hide();
    

}


function buscarUsuarioNoStorage(): Usuario[] {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}


                             // FAZER LOGGIN NA APLICAÇÃO    
let formLogin = document.getElementById('formLogin') as HTMLFormElement;
let emailLogin = document.getElementById('emailLogin') as HTMLInputElement;
let senhaLogin = document.getElementById('senhaLogin') as HTMLInputElement;

formLogin.addEventListener('submit' , (e)=>{
    e.preventDefault();

    verificarCamposLogin();

});

function verificarCamposLogin(): void {

    if(emailLogin.value === '') {
        emailLogin.focus();
        emailLogin.setAttribute('style', 'background-color: #ff9999');
        emailLogin.innerHTML = 'Você deve digitar um e-mail válido!'
        return
    }

    if(senhaLogin.value === '') {
        senhaLogin.focus();
        senhaLogin.setAttribute('style', 'background-color: #ff9999');
        senhaLogin.innerHTML = 'Você deve digitar uma senha válida!'
        return
    }

    emailLogin.removeAttribute('style');
    senhaLogin.removeAttribute('style');

    let logIn = {
        email: emailLogin.value,
        senha: senhaLogin.value
    }

    logarNoSistema(logIn);

}

function logarNoSistema(logIn: any) {
    
    let listaUsuarios: Usuario[] = buscarUsuarioNoStorage();

    let existe: boolean = listaUsuarios.some((usuario)  => {
        return usuario.email === logIn.email && usuario.senha === logIn.senha
    });


    if (!existe) {
        alert ('O e-mail e/ou senha digitados estão incorretos. Por favor, verifique e tente novamente.')
        return
    }

    let indiceUser = listaUsuarios.findIndex((usuario)  => {
        return usuario.email === logIn.email
    });



    sessionStorage.setItem('logIn' , emailLogin.value);
    window.location.href = 'public/home.html'; 

    console.log(`este é o indice do Usuario ${indiceUser}`)
}





                              // CHAMAR MODAL DE CRIAR CONTA
btnCriarConta.addEventListener('click', ()=>{
    modalCadastro.classList.add('scale-up-center');

}
)

