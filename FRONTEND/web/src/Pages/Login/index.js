import React, {useState,} from 'react';
import Logo from '../../Assets/Logo.png';
import circleCheck from '../../Assets/circle_check.png'
import {VerificarCodigosMaliciosos, VerificarEmailOrCpf} from '../../VerificarCodigos/Funcoes'
import api from '../../services/api';
import './Login.css';

export default function Login({history}){

    async function login(e){
        e.preventDefault();
        if(VerificarCodigosMaliciosos(senha,'senha') && VerificarEmailOrCpf(emailOrCpf,'senha ou CPF')){

            const response = await api.post('/login', {
                "login":emailOrCpf,
	            "senha":senha
                })
            if(!response.data.sucess){
                alert(response.data.message)
            }else{
                localStorage.setItem('@sige/token',response.data.token)
                history.push('/home')
            }    
        }
               
    }
    const[emailOrCpf,setEmailOrCpf]=useState('');
    const[senha,setSenha]=useState('');
    const [lembrar, setLembrar] = useState(false);
    function handleLembrar(e){
        setLembrar(!lembrar);
        e.preventDefault();
    }
    return (
        <div className="LoginContainer">
            <img src={Logo} className="LoginLogo"/>
            <div className="LoginContent">
                <h4>Fazer Login</h4>
                <form>
                    <label>CPF/E-mail</label>
                    <input type="text" placeholder="digite seu CPF ou E-mail" onChange={e => setEmailOrCpf(e.target.value)} />
                    <label>Senha</label>
                    <input type="password" name="password" placeholder="digite sua Senha" onChange={e => setSenha(e.target.value)}/>
                    <div className="LoginLembrarEEsqueci">
                    <button onClick={(e)=>{handleLembrar(e)}}>    
                    { lembrar ? <img src={circleCheck} className="LoginCirculoCheckout"/> : <div className="LoginCirculo"/> }
                        <p>Lembrar-me</p></button>
                        <p>Esqueci minha senha</p>
                    </div>
                    <button type="submit" className="LoginButtonLogin" onClick={e=>{login(e)} } >
                        <p>Entrar</p>
                    </button>
                </form>
                <div className="LoginLinkCadastro">
                    <a onClick={()=>history.push('/cadastro')} className="LinkToCadastro">É novo aqui? Cadastre-se</a>
                </div>
            </div>
        </div>
    )
}