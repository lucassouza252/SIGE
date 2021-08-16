import {useState, useEffect} from 'react';
import Logo from '../../Assets/Logo.png';
import Navbar from '../Components/Navbar';
import CustomSelect from '../Components/CustomSelect';
import './CriarTrilha.css';
import api from '../../services/api'

export default function CriarTrilha ({history}){


    const token = localStorage.getItem('@sige/token')
    const [eventos,setEventos]=useState([])
    const [nome,setNomeTrilha]=useState('');
    const [eventoNome,setEventoNome]=useState('')
    const [eventoIndex,setEventoIndex]=useState('')
    const [papel,setPapel] = useState('');

    useEffect (() =>{
    async function loadEvento(){
        const response = await api.post('submissao/evento/listar',{})
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



    const [perguntasAbertas,setPerguntasAbertas] = useState([]) 
    const [perguntasFechadas,setPerguntasFechadas] = useState([])

    function handleperguntasAbertas(e){
        var novaPerguntaAberta = {
            pergunta: 'digite aqui a pergunta que deseja fazer no formulario de submissão'
        }
        setPerguntasAbertas(perguntasAbertas=>[...perguntasAbertas, novaPerguntaAberta])
        e.preventDefault();
    }
    const HandleUpdateFieldChangedAbertas = index => e => {
        let newArray = [...perguntasAbertas]; 
        newArray[index] = e.target.value;
    
        setPerguntasAbertas(newArray);
    }
    const handleDeleteperguntaAbertas = index => e => {
        let newArray = [...perguntasAbertas];
        newArray.splice(index, 1);
        setPerguntasAbertas(newArray);
        e.preventDefault();
    }

    function handleperguntasFechadas(e){
        var novaPerguntaFechada = {
            pergunta: 'digite aqui a pergunta que deseja fazer no formulario de submissão',
            opcao1: 'digite a opção 1',
            opcao2: 'digite a opção 2',
        }
        setPerguntasFechadas(perguntasFechadas=>[...perguntasFechadas, novaPerguntaFechada])
        e.preventDefault();
    }
    const HandleUpdateFieldChangedFechadas = (index,props) => e => {
        let newArray = [...perguntasFechadas]; 
        newArray[index][props] = e.target.value;
    
        setPerguntasFechadas(newArray);
    }
    const handleDeleteperguntaFechadas = index => e => {
        let newArray = [...perguntasFechadas];
        newArray.splice(index, 1);
        setPerguntasFechadas(newArray);
        e.preventDefault();
    }

    async function HandleTrilha(e){
        e.preventDefault();
        
        if(eventoIndex===''){
            alert('porfavor selecione um evento antes')
        }
        else{
           const response = await api.post('/evento/trilha/new', {
               "token": token,
               "nome": nome,
               "eventoId": (eventoIndex+1),
               "perguntas": perguntasAbertas
           })
       
        console.log(response.data)

        if(!response.data.sucess){
            alert(response.data.message)
        }else{
            history.push(`/home`);
        }
    }
    }

  function onChangeCustomSelect(value){
        setEventoIndex(value.value)
        setEventoNome(value.label)
        console.log(value.value)
    }

    if(papel!==''){
    return (
        <div className="CriarTrilhaContainer">
            <img src={Logo} className="CriarTrilhaLogo"/>
            <div className="CriarTrilhaContent">
                <Navbar papel={papel} ativo='trilha' />
                <div className="CriarTrilhaForm">
                    <form>
                    <label>Nome da Trilha</label>
                    <input type="text" placeholder="digite o nome da Trilha" autoCapitalize="none"
                        autoCorrect={false} onChange={e => setNomeTrilha(e.target.value)} />
                    <label>Para qual evento deseja criar essa trilha?</label>

                    <CustomSelect label={'Nome do Evento'} options={options} onChange={onChangeCustomSelect}  />

                    <h5>perguntas Adicionais Abertas</h5>
                    <button className="buttonNovaPergunta" onClick={(e)=>handleperguntasAbertas(e)} ><p> + Nova Pergunta Aberta</p></button> 
                    <div className="TabelaPerguntas">
                        { perguntasAbertas.map((data,index)=>(
                            <div className="TabelaPerguntasAbertas" key={index}>
                                <textarea value={data.pergunta} onChange={HandleUpdateFieldChangedAbertas(index,'maxInscrito')} ></textarea>
                                <div className="contentButtonAberta">
                                    <button className="deletarPergunta" onClick={handleDeleteperguntaAbertas(index)}><p>Excluir</p></button>
                                </div>
                            </div>
                        ))}    
                    </div>
                    <h5>perguntas Adicionais Fechadas</h5>
                    <button className="buttonNovaPergunta" onClick={(e)=>handleperguntasFechadas(e)} ><p> + Nova Pergunta Fechada</p></button> 
                    <div className="TabelaPerguntas">
                        { perguntasFechadas.map((data,index)=>(
                            <div className="TabelaPerguntasFechadas" key={index}>
                                <textarea value={data.pergunta} onChange={HandleUpdateFieldChangedFechadas(index,'pergunta')} ></textarea>
                                <div className="contentButtonFechada">
                                    <input type="text" placeholder={data.opcao1} value={data.opcao1} onChange={HandleUpdateFieldChangedFechadas(index,'opcao1')}/>
                                    <input type="text" placeholder={data.opcao2} value={data.opcao2} onChange={HandleUpdateFieldChangedFechadas(index,'opcao2')} />
                                    <button className="deletarPergunta" onClick={handleDeleteperguntaFechadas(index)}><p>Excluir</p></button>
                                </div>
                            </div>
                         ))}    
                     </div>
                     <div className="salvarFromCriarTrilha">
                                <button onClick={(e)=>{HandleTrilha(e)}}>Salvar</button>
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