import Logo from '../../Assets/Logo.png';
import { ReactComponent as Radio} from '../../Assets/svg/radio.svg';
import { ReactComponent as RadioPreenchido} from '../../Assets/svg/radioFilled.svg';
import Navbar from '../Components/Navbar';
import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import './CriarEvento.css';

export default function CriarEvento ({history}){

    const token = localStorage.getItem('@sige/token')
    const [papel,setPapel] = useState('');

    useEffect (() =>{
    async function loadUser(){
        const response = await api.post('/user/info', {
          token
        })
        if(!response.data.papel){
            alert('token expirado!')
            localStorage.removeItem('@sige/token');
            history.push('/')
        }else{
            setPapel(response.data.papel);
        }
        
    }
        loadUser();
    },[])

    const [nome,setNomeEvento]=useState('');
    const [url,setUrlEvento]=useState('');
    const [sigla,setSiglaEvento]=useState('');
    const [max,setMaxEvento]=useState('');
    const [descricao,setDescricaoEvento]=useState('');
    const [valorinscricao,setValorInscricao]=useState('');

    const [inicioInscricao,setInicioInscricao]=useState('');
    const [fimInscricao,setFimInscricao]=useState('');
    const [inicioEvento,setInicioEvento]=useState('');
    const [fimEvento,setFimEvento]=useState('');
    const [inicioSub,setInicioSub]=useState('');
    const [fimSub,setFimSub]=useState('');
    const [inicioRevisao,setInicioRevisao]=useState('');
    const [fimRevisao,setFimRevisao]=useState('');

    const [presencial,setPresencial]=useState(true);
    const [submissoes,setSubmissoes]=useState(false);
    const [eventoPago,setEventoPago]=useState(false);
    const [atividadesPagas,setAtividadePaga]=useState([])



        async function HandleEvento(e){
        e.preventDefault();

                 const response = await api.post('/evento/new', {
                    token:token,
                    "nome":nome,
                    "url":url,
                    "sigla": sigla,
                    "máximo_inscricoes": max,
                    "virtual": presencial,
                    "descrição": descricao,
                    "instituição": "UFRB",
                    "inicio_evento": inicioEvento,
                    "fim_evento": fimEvento,
                    "inicio_submissao": inicioSub,
                    "fim_submissao": fimSub,
                    "inicio_revisao": inicioRevisao,
                    "fim_revisao": fimRevisao,
                    "pago": eventoPago,
                    "valor_inscricao": valorinscricao,
                    "máximo_ativ_inscrito": max,
                }) 

                console.log(response.data)
                if(!response.data.sucess){
                    alert(response.data.message)
                }else{
                    history.push(`/`);
                }
    
        }
            

    function handlePresencial(e,state){
        setPresencial(state);
        e.preventDefault();
    }
    function handleSubmissoes(e,state){
        setSubmissoes(state);
        e.preventDefault();
    }
    function handleEventoPago(e,state){
        setEventoPago(state);
        e.preventDefault();
    }
    function handleNovaAtividadePaga(e){
        var novaAtividadePaga = {
            nome: 'nome da atividade',
            valor: 'valor da atividade',
            maxInscrito: 'max de inscritos'
        }
        setAtividadePaga(atividadesPagas=>[...atividadesPagas, novaAtividadePaga])
        e.preventDefault();
    }
    const HandleUpdateFieldChanged = (index,props) => e => {
        let newArray = [...atividadesPagas]; 
        newArray[index][props] = e.target.value;
    
        setAtividadePaga(newArray);
    }
    const handledeleteAtividade = index => e => {
        let newArray = [...atividadesPagas];
        newArray.splice(index, 1);
        setAtividadePaga(newArray);
        e.preventDefault();
    }
    
    if(papel!==''){
    return (
        <div className="CriarEventoContainer">
            <img src={Logo} className="CriarEventoLogo"/>
            <h4>Painel Adiministrativo</h4>
            <h5>Criação De Eventos </h5>
            <div className="CriarEventoContent">
                <Navbar papel={papel} ativo='criarEvento' />
                <div className="CriarEventoForm">
                    <form>
                    <label>Nome do Evento</label>
                    <input type="text" placeholder="digite o nome do evento" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setNomeEvento(e.target.value)} />
                    <label>URL do Evento</label>
                    <input type="text" placeholder="digite a url do evento" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setUrlEvento(e.target.value)}  />
                    <label>Sigla do Evento</label>
                    <input type="text" placeholder="digite a sigla do evento" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setSiglaEvento(e.target.value)} />
                     <div className="CriarEventoPresencialEMaximoContainer">
                        <div className="CriarEventoMaximoContainer">
                            <label>Numero máximo de inscritos?</label>
                            <input type="text" placeholder="numero máximo de inscritos o evento" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setMaxEvento(e.target.value)} />
                        </div> 
                    <div className="CriarEventoPresencialContainer">
                    <label>O evento será:</label>
                    <div className="CriarEventoPresencialButtons">
                    <button onClick={(e)=>{handlePresencial(e,false)}}>
                    {presencial ? <Radio/> : <RadioPreenchido />}
                    <p>Presencial</p>
                    </button>
                    <button onClick={(e)=>{handlePresencial(e,true)}}>
                    {!presencial ? <Radio/> : <RadioPreenchido />}
                    <p>Virtual</p>
                    </button>
                    </div>
                    </div> 
                    </div>
                    <label>Descrição do Evento</label>
                    <textarea placeholder="digite a descrição do Evento" className="TextArea" onChange={e => setDescricaoEvento(e.target.value)}></textarea>    
                    <div className="CriarEventoButtonsContainer">
                    <label>O evento terá submissões? </label>
                    <div className="CriarEventoButtons">
                    <button onClick={(e)=>{handleSubmissoes(e,true)}}>
                    {!submissoes ? <Radio/> : <RadioPreenchido />}
                    <p>Sim</p>
                    </button>
                    <button onClick={(e)=>{handleSubmissoes(e,false)}}>
                    {submissoes ? <Radio/> : <RadioPreenchido />}
                    <p>Não</p>
                    </button>
                    </div>
                    </div>
                    {submissoes ? (
                        <div className="DataContent">
                            <div className="DataElement">
                                <label>Inicio das Submissões</label>
                                <input type="date" onChange={e => setInicioSub(e.target.value)} />
                            </div>
                            <div className="DataElement">
                                <label>Fim das Submissões</label>
                                <input type="date" onChange={e => setFimSub(e.target.value)} />
                            </div>
                        </div>
                    ) : <> </>}
                    {submissoes ? (
                        <div className="DataContent">
                            <div className="DataElement">
                                <label>Inicio das Revisões</label>
                                <input type="date" onChange={e => setInicioRevisao(e.target.value)}/>
                            </div>
                            <div className="DataElement">
                                <label>Fim das Revisões</label>
                                <input type="date" onChange={e => setFimRevisao(e.target.value)} />
                            </div>
                        </div>
                    ) : <> </>}
                        <div className="DataContent">
                            <div className="DataElement">
                                <label>Inicio das Inscrições</label>
                                <input type="date" onChange={e => setInicioInscricao(e.target.value)}/>
                            </div>
                            <div className="DataElement">
                                <label>Fim das Inscrições</label>
                                <input type="date" onChange={e => setFimInscricao(e.target.value)}/>
                            </div>
                        </div>
                        <div className="DataContent">
                            <div className="DataElement">
                                <label>Inicio do Evento</label>
                                <input type="date" onChange={e => setInicioEvento(e.target.value)}/>
                            </div>
                            <div className="DataElement">
                                <label>Fim do Evento</label>
                                <input type="date" onChange={e => setFimEvento(e.target.value)} />
                            </div>
                        </div>
                        <div className="CriarEventoButtonsContainer">
                            <label>O evento será pago? </label>
                            <div className="CriarEventoButtons">
                                <button onClick={(e)=>{handleEventoPago(e,true)}}>
                                {!eventoPago ? <Radio/> : <RadioPreenchido />}
                                <p>Sim</p>
                                </button>
                                <button onClick={(e)=>{handleEventoPago(e,false)}}>
                                {eventoPago ? <Radio/> : <RadioPreenchido />}
                                <p>Não</p>
                                </button>
                            </div>
                        </div>
                        {eventoPago 
                            ? (
                            <div>
                                <div className="CriarEventoEventoPagoContainer">
                                    <label>Valor da inscrição?</label>
                                    <input type="text" placeholder="valor da inscrição" autoCapitalize="none"
                            autoCorrect={false} onChange={e => setValorInscricao(e.target.value)} />
                                </div>
                                <button className="buttoAtividadePaga" onClick={(e)=>handleNovaAtividadePaga(e)} ><p> + Nova Atividade Paga</p></button> 
                                <div className="TabelaAtividadesPagas">
                                { atividadesPagas.map((data,index)=>(
                               
                                    <div className="TabelaAtividadesPagasElemento" key={index}>
                                        <input type="text" placeholder={data.nome} value={data.nome} onChange={HandleUpdateFieldChanged(index,'nome')} className="NomeAtividadePaga"/>
                                        <input type="text" placeholder={data.valor} value={data.valor} onChange={HandleUpdateFieldChanged(index,'valor')} className="ValorAtividadePaga"/>
                                        <input type="text" placeholder={data.maxInscrito} value={data.maxInscrito} onChange={HandleUpdateFieldChanged(index,'maxInscrito')} className="MaxInscritosAtividadePaga" />
                                        <button className="deleteAtividadePaga" onClick={handledeleteAtividade(index)}><p>X</p></button>
                                    </div>

                                ))}
                                </div>
                                {atividadesPagas.length>0 ? (
                                    <div className="AtividadePorInscrito">
                                    <label>Número Máximo de Atividades Por Inscrição</label>
                                    <input type="text" placeholder="Máximo de atividade por inscrição" autoCapitalize="none"
                                autoCorrect={false} />
                                </div>
                                ): <> </>}
                            </div>
                            ): <></>}

                            <div className="salvarFromCriarEvento">
                                <button className="eventoButtonConfirmar" onClick={(e)=>{HandleEvento(e)}}>
                                Salvar</button>
                            </div>
                        
                    </form>
                </div>
            </div>
        </div>    
)}
else{
        return(
        <div className="DefaultContainer">
            <h4>Conectando...</h4>
        </div>
        )
    }
}