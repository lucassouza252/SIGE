import React, {useState,} from 'react';
import Logo from '../../Assets/Logo.png';
import radioPreenchido from '../../Assets/radioFilled.png';
import radioNaoPreenchido from '../../Assets/radio.png';
import api from '../../services/api'
import {VerificarCodigosMaliciosos} from '../../VerificarCodigos/Funcoes';
import {VerificarEmail} from '../../VerificarCodigos/Funcoes';
import {VerificarCPF} from '../../VerificarCodigos/Funcoes';
import './Cadastro.css';

export default function Cadastro ({history}){
    const [nome,setNome]=useState('');
    const [cpf,setCpf]=useState('');
    const [email,setEmail]=useState('');
    const [senha,setSenha]=useState('');
    const [confirmarSenha,setConfirmarSenha]=useState('');
    const [deficiencia, setDeficiencia] = useState(false);
    const [deficienciaFisica, setDeficienciaFisica] = useState(false);
    const [deficienciaAuditiva, setDeficienciaAuditiva] = useState(false);
    const [deficienciaVisual, setDeficienciaVisual] = useState(false);
    const [solicitacao,setSolicitacao]=useState('')
   

    function handleDeficiencia(e,state){
        setDeficiencia(state);
        e.preventDefault();
    }
    async function HandleCadastro(e){
        e.preventDefault();
        if( senha===confirmarSenha){
            if(
                // Passar as funções que verificam esses campos 
                VerificarCodigosMaliciosos(senha) &&
                VerificarEmail(email,'email') &&
                VerificarCPF(cpf, 'cpf')
            ){
                const deficienciaString = `${deficienciaAuditiva? 'auditiva,':''} ${deficienciaFisica? 'fisica,':' ' } ${deficienciaVisual?'visual':''} / ${solicitacao}`
                 const response = await api.post('/cadastro', {
                    "nome":nome,
	                "cpf":cpf,
	                "email":email,
	                "senha":senha,
	                "deficiencia":deficiencia,
	                "tipo_deficiencia": deficienciaString,
                    }) 

                    console.log(response.data)
                if(!response.data.sucess){
                    alert(response.data.message)
                }else{
                    history.push(`/`);
                }
    
            }
        }
            
    }
    return (
        <div className="CadastroContainer">
            <img src={Logo} className="CadastroLogo"/>
            <div className="CadastroContent">
                <h4>É novo aqui? Crie uma conta</h4>
                <form>
                    <label>Nome Completo</label>
                    <input type="text" placeholder="digite seu Nome Completo" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setNome(e.target.value)}/>
                    <label>CPF</label>
                    <input type="text" placeholder="digite seu CPF" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setCpf(e.target.value)} />
                    <label>E-mail</label>
                    <input type="email" placeholder="digite seu E-mail" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setEmail(e.target.value)} />
                    <label>Senha</label>
                    <input type="password" name="password" placeholder="digite sua Senha" autoCapitalize="none"
                        autoCorrect={false} secureTextEntry={true} onChange={e => setSenha(e.target.value)}/>
                    <label>Confirmar Senha</label>
                    <input type="password" name="password" placeholder="digite sua Senha Novamente" autoCapitalize="none"
                        autoCorrect={false} secureTextEntry={true} onChange={e => setConfirmarSenha(e.target.value)}/>
                    <div className="CadastroPossuiDeficienciaContainer">
                        <p>Possui Alguma Deficiência?</p>
                    <div className="CadastroPossuiDeficienciaButtons">
                    <button onClick={(e)=>{handleDeficiencia(e,false)}}>
                    {deficiencia ? <img src={radioNaoPreenchido} />: <img src={radioPreenchido} />}
                    <p>Não</p>
                    </button>
                    <button onClick={(e)=>{handleDeficiencia(e,true)}}>
                    {deficiencia ? <img src={radioPreenchido} />: <img src={radioNaoPreenchido} />}
                    <p>Sim</p>
                    </button>
                    </div> 
                    </div>
                    {deficiencia ?(
                        <div className="CadastroDefiecienciaContent">
                            <div className="CadastroOptionDeficiencia">
                                <label>Deficiencia Fisica</label>
                                <input type="checkbox" onClick={()=>{setDeficienciaFisica(!deficienciaFisica)}} value={deficienciaFisica} />
                            </div>
                            <div className="CadastroOptionDeficiencia">
                                <label>Deficiencia Auditiva</label>
                                <input type="checkbox" onClick={()=>{setDeficienciaAuditiva(!deficienciaAuditiva)}} value={deficienciaAuditiva} />
                            </div>
                            <div className="CadastroOptionDeficiencia">
                                <label>Deficiencia Visual</label>
                                <input type="checkbox" onClick={()=>{setDeficienciaVisual(!deficienciaVisual)}} value={deficienciaVisual} />
                            </div>
                            <textarea className="CadastroSolicitacao" placeholder="digite sua solicitação" onChange={e => setSolicitacao(e.target.value)}></textarea>
                           
                        </div>
                    ): <> </>}
                          <div className="CadastroFooterConatiner">
                            <button type="submit" className="CadastroButtonCancelar" onClick={()=>{history.push('/')}} >
                                <p>Cancelar</p>
                            </button>   
                            <button type="submit" className="CadastroButtonConfirmar" onClick={(e)=>{HandleCadastro(e)}} >
                                <p>Confirmar</p>
                            </button>   
                          </div>
                </form>
            </div>
        </div>
    )
}