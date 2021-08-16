import Navbar from '../Components/Navbar';
import { ReactComponent as TrilhaIcon} from '../../Assets/svg/trilha.svg';
import { ReactComponent as Radio} from '../../Assets/svg/radio.svg';
import { ReactComponent as RadioPreenchido} from '../../Assets/svg/radioFilled.svg';
import {VerificarCodigosMaliciosos} from '../../VerificarCodigos/Funcoes'
import api from '../../services/api';
import CustomSelect from '../Components/CustomSelect';
import React,{useState, useEffect} from 'react';
import Logo from '../../Assets/Logo.png';
import './Submissao.css';


export default function Submissao (history){
    const token = localStorage.getItem('@sige/token')
    const [papel,setPapel] = useState('');
    const [eventos,setEventos]=useState([])
    const [eventoNome,setEventoNome]=useState('')
    const [eventoIndex,setEventoIndex]=useState('')
    const [trilhas,setTrilhas]=useState([])
    const [perguntasExtras,setPerguntasExtras]=useState('')
    const [activeTrilha,setActiveTrilha]=useState(0)
    const [titulo,setTitulo]=useState('')
    const [texto,setTexto]=useState('')
    const [palavrasChaves,setPalavrasChaves]=useState('')
    const [autores,setAutores]=useState([])
    const [cpfOrientador,setCpfOrientador]=useState(0)
    const [tipoDeApresentacao,setTipoDeApresentacao]=useState('')
    const [areaDoConhecimento,setAreaDoConhecimento]=useState('')
    const [respostas,setRespostas]=useState([])
    const [trilhaSelecionada,setTrilhaSelecionada]=useState(false)



    useEffect (() =>{
        async function loadEvento(){
            const response = await api.post('/submissao/evento/listar',{})
            setEventos(response.data)
        }
        loadEvento()
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
   
    const options = eventos.map(
        ({nome},index)=>({label:nome,value:index})
      )
   
    const options2=[
        { label:'Ciências Exatas e da Terra', value:'Ciências Exatas e da Terra'},
        { label:'Ciências Biológicas', value:'Ciências Biológicas'},
        { label:'Engenharias', value:'Engenharias'},
        { label:'Ciências da Saúde', value:'Ciências da Saúde'},
        { label:'Ciências Agrarias', value:'Ciências Agrarias'},
        { label:'Ciências Sociais Aplicadas', value:'Ciências Sociais Aplicadas'},
        { label:'Ciências Humanas', value:'Ciências Humanas'},
        { label:'Linguística, Letras e Artes', value:'Linguística, Letras e Artes'},
        { label:'Outros', value:'Outros'}

    ]
  function onChangeCustomSelect(value){
        setEventoIndex(value.value)
        setEventoNome(value.label)
    }
    function onChangeCustomSelect2(value){
        setAreaDoConhecimento(value.label)
    }
    async function requestTrilha(e){
        e.preventDefault();
        if(eventoIndex===''){
            alert('porfavor selecione um evento antes')
        }else{
        const response = await api.post('/submissao/trilha/listar',{
            "eventoId": eventos[eventoIndex].id
        })
        setTrilhas(response.data)
        if(response.data.length==0){
            alert("Não tem trilhas cadastradas pra esse evento")
        }
        }
    }
    function handleChangeActiveTrilha(e,number){
        setActiveTrilha(number);
        e.preventDefault();
    }
    async function requestPerguntasExtras(e){
        e.preventDefault();
        if(activeTrilha===0){
            alert("porfavor selecione uma trilha antes")
        }else{
        const response = await api.post('/submissao/trilha/perguntas/listar',{
            "id_trilha":activeTrilha
        })
        response.data.map((index)=>{handleAdicionarResposta(e)})
        setPerguntasExtras(response.data)
        setTrilhaSelecionada(true)
    }
    }
    function handleAdicionarAutor(e){
        var novoAutor = {
            nome: 'nome do Autor',
        }
        setAutores(autores=>[...autores, novoAutor])
        e.preventDefault();
    }
    function handleTipoDeApresentacao(e,tipo){
        setTipoDeApresentacao(tipo)
        e.preventDefault();
    }
    const HandleUpdateAutores = index => e => {
        let newArray = [...autores]; 
        newArray[index] = e.target.value;
    
        setAutores(newArray);
    }
    const handledeleteAutores = index => e => {
        let newArray = [...autores];
        newArray.splice(index, 1);
        setAutores(newArray);
        e.preventDefault();
    }
    function handleAdicionarResposta(e){
        var novaResposta = {
            perguntaId:0,
			resposta_aberta:"",
			resposta_radio:""
        }
        setRespostas(respostas=>[...respostas, novaResposta])
        e.preventDefault();
    }
    function HandleUpdateRespostaAberta(e,index){
        let newArray = [...respostas]; 
        newArray[index].perguntaId=index;
        newArray[index].resposta_aberta = e.target.value;
        setRespostas(newArray)
    }
    function handleUpdateRespostaFechada(e,index,props){
        let newArray = [...respostas];
        newArray[index].perguntaId=index; 
        newArray[index].resposta_radio = props;
        setRespostas(newArray)
        e.preventDefault();
    }
    async function EnviarSubmissao(e){
        e.preventDefault();
        if( VerificarCodigosMaliciosos(titulo,'titulo') &&
        VerificarCodigosMaliciosos(texto,'texto') && 
        VerificarCodigosMaliciosos(palavrasChaves,'palavras-chaves')
        //Verificar todos os campos
        ){
            const response = await api.post('submissao/enviar',{
                token:token,
		        titulo: titulo,
		        texto: texto,
		        palavra_chave: palavrasChaves,
		        autores: autores,
		        cpf_orientador: cpfOrientador,
		        tipo_apresentacao: tipoDeApresentacao,
		        area_conhecimento:areaDoConhecimento,
		        eventoId:eventoIndex+1,
                trilhaId:activeTrilha,
                respostas: respostas
            })
            alert(response.data.message);
            console.log(response.data)
        }
    }
if(papel!==''){    
return(
    <div className="SubmissaoContainer">
    <img src={Logo} className="SubmissaoLogo"/>
    <div className="SubmissaoContent">
        <Navbar papel={papel} ativo='submissao' />
        <div className="SubmissaoForm">
        <form>

        {trilhas.length !==0 ?(
            <div>
                <h2>Nome do Evento:{eventoNome}</h2>
            </div>
        ):<> </>}
        
        
        {trilhas.length===0 ?(
            <div className="Configurarbiblioteca">
           <CustomSelect label={'Nome do Evento'} options={options} onChange={onChangeCustomSelect} />
            </div>
        ): <> </>
        }
        {eventoIndex !== '' && trilhas.length !==0 && !trilhaSelecionada ?(
            <div className="ScrollDeTrilha">
                {trilhas.map((data,index)=>(
                    <button onClick={(e)=>handleChangeActiveTrilha(e,data.id)} className={activeTrilha===data.id ? 'active' : ''} key={index}>
                        <TrilhaIcon />
                <p>{data.nome}</p>
                    </button>
                ))}
            </div>):<> </>}

            {eventoIndex !== '' && trilhas.length !==0 && trilhaSelecionada ?(
            <div className={"TrilhaSelecionada"}>
                <button className={'active'}>
                    <TrilhaIcon />
            <p>{trilhas[activeTrilha-1].nome}</p>
                </button>
            </div>    
             ):<> </>}

            {eventoIndex !=='' && trilhas.length !==0 && trilhaSelecionada ? (
            <div>
                <label>Titulo da Submissão</label>
                <input type="text" placeholder="digite o Titulo da Submissão" autoCorrect={false} onChange={e => setTitulo(e.target.value)}/>
                <label> Texto da Submissao</label>       
                <textarea placeholder="digite o resumo da Submissao" className="TextArea" onChange={e => setTexto(e.target.value)}></textarea>          
                <label>Palavras Chaves</label>
                <input type="text" placeholder="digite as palavras chaves" autoCorrect={false} onChange={e => setPalavrasChaves(e.target.value)} />
                <div className="configAutores">
                    <label>Autores</label>
                    <button className="buttonAutores" onClick={(e)=>handleAdicionarAutor(e)} ><p> +Adicionar Autores</p></button> 
                </div>
                <div className="TabelaAdicionarAutor">
                { autores.map((data,index)=>(
                    <div className="TabelaAdicionarAutorElemento" key={index}>
                        <input type="text" placeholder={data.nome} value={data.nome} onChange={HandleUpdateAutores(index)} className="NomeAutores"/>
                        <button className="deleteAutor" onClick={handledeleteAutores(index)}><p>X</p></button>
                    </div>
                ))}
                </div>
                <div className="Configurarbiblioteca">
                    <CustomSelect label={'Area de Pesquisa'} options={options2} onChange={onChangeCustomSelect2} />
                </div>
                <label>CPF do Orientador</label>
                <input type="text" placeholder="digite o cpf do Orientador" autoCorrect={false} onChange={e => setCpfOrientador(e.target.value)} />
                <div className="SubmissaoButtonsContainer">
                    <label>Tipo de Apresentação </label>
                    <div className="SubmissaoButtons">
                        <button onClick={(e)=>{handleTipoDeApresentacao(e,'post')}}>
                        {tipoDeApresentacao==='post' ? <RadioPreenchido />: <Radio/>}
                        <p>Post</p>
                        </button>
                        <button onClick={(e)=>{handleTipoDeApresentacao(e,'palestra')}}>
                        {tipoDeApresentacao==='palestra' ?  <RadioPreenchido />:<Radio/>}
                        <p>Palestra</p>
                        </button>
                    </div>
                    </div>
                    {perguntasExtras.map((data,index)=>(
                        <div key={data.index} className="perguntasExtrasContainer">
                            <label>{data.pergunta}</label>
                            {data.opcaoPergunta?(
                                <input type="text" placeholder="digite a resposta"
                                autoCorrect={false} value={respostas[index].resposta_aberta} onChange={(e)=>HandleUpdateRespostaAberta(e,index)}/>
                            ):(
                                <div className="SubmissaoButtons">
                                <button onClick={(e)=>{handleUpdateRespostaFechada(e,index,data.campoUm)}}>
                                {respostas[index].resposta_radio===data.campoUm ? <RadioPreenchido />: <Radio/>}
                                <p>{data.campoUm}</p>
                                </button>
                                <button onClick={(e)=>{handleUpdateRespostaFechada(e,index,data.campoDois)}}>
                                {respostas[index].resposta_radio===data.campoDois ?  <RadioPreenchido />:<Radio/>}
                                <p>{data.campoDois}</p>
                                </button>
                            </div>
                            )}
                            
                        </div>
                    ))}
                        
            </div>):<></>}             


            {trilhas.length===0?
            (<div className="buttonsContinuacao">
            <button type="submit" className="ProximoButton" onClick={e=>{requestTrilha(e)} } >       
            <p>Proximo</p>
            </button>
            </div>):<></>}
            
            {trilhas.length !==0 && !trilhaSelecionada?
            (<div className="buttonsContinuacaoGrupo">
            <button type="submit" className="VoltarButton" onClick={e=>{setTrilhas([])} } >       
            <p>Voltar</p>
            </button>
            <button type="submit" className="ProximoButton" onClick={e=>{requestPerguntasExtras(e)} } >       
            <p>Proximo</p>
            </button>
            </div>):<></>}
            {eventoIndex !=='' && trilhas.length !==0 && trilhaSelecionada?(
                <div className="buttonsContinuacaoGrupo">
                <button type="submit" className="VoltarButton" onClick={e=>{setTrilhaSelecionada(false)} } >       
                <p>Voltar</p>
                </button>
                <button type="submit" className="EnviarSubmissaoButton" onClick={e=>{EnviarSubmissao(e)} } >       
                <p>Enviar Submissao</p>
                </button>
                </div>
            ):<></>}
            
        </form>
        </div>
    </div>
</div>
) }else{
    return(
    <div className="DefaultContainer">
        <h4>Conectando...</h4>
    </div>
    )
}

}