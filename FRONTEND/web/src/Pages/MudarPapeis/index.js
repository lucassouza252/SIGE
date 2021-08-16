import Logo from '../../Assets/Logo.png';
import Trash from '../../Assets/trash_full.png';
import Mag from '../../Assets/search.png';
import Card from '../../Assets/id_card.png';
import React,{useState, useEffect} from 'react';
import Navbar from '../Components/Navbar';
import PopUp from "../Components/PopUp";
import api from '../../services/api'
import './mudarpapeis.css'


export default function MudarPapeis ({history}){

	const token = localStorage.getItem('@sige/token')
    const [usuarios,setUsuarios]=useState([])
    const [pointer,setPointer]=useState([])
    const [add,setAdd]=useState([])
    const [papel,setPapel] = useState('')

    useEffect (() =>{
    async function loadUsuarios(){
        const response = await api.post('/gerenciar_user/listar',{"token": token,})
            setUsuarios(response.data)
    }
        loadUsuarios()
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

    async function deleteUsuario(index){
        const response = await api.post('/gerenciar_user/remove',{
            "token": token,
            "id_user": index
        })

        console.log(response.data)

        if(!response.data.sucess){
            alert(response.data.message)
        }else{
            history.push(`/mudarpapeis`);
        }
    }

    async function mudarUsuario(index,tipo){
        const response = await api.post('/gerenciar_user/papel',{
            "token": token,
            "id_user": index,
            "novo_papel": tipo
        })

        console.log(response.data)

        if(!response.data.sucess){
            alert(response.data.message)
        }else{
            history.push(`/mudarpapeis`);
        }
    }

	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = (index) => e => {
		setPointer(usuarios[index])
		setIsOpen(!isOpen);
	}

    const HandleUpdateFieldChanged = (index,props) => e => {
        let newArray = [...usuarios]; 
        newArray[index][props] = e.target.value;
    
        setUsuarios(newArray);
    }
  
    const handledeleteUsuario = index => e => {
        let newArray = [...usuarios];
        newArray.splice(index, 1);
        deleteUsuario(usuarios[index].id)
        setUsuarios(newArray);
        e.preventDefault();
    }

    const trocarTipoUsuarios = index => e =>{

        console.log(add);
        if(add == 0){
            alert("Selecione uma opção");
        }
        else{
        mudarUsuario(index,add);
        setIsOpen(!isOpen);
        setAdd(0);
        }

        e.preventDefault();


    }

    const myChangeHandler = e => {
    	var x = e.target.value;
    	setAdd(x)
    }

     if(papel!==''){
		return(
			<div className="papeisContainer">
				<img src={Logo} className="SiteLogo" alt="myimage"/>
				<h4>Painel Adiministrativo</h4>
				<h5>Mudança de Papeis</h5>
					<div className="papeisContent">
	                	<Navbar papel={papel} ativo='usuarios' />
	                		<div className="papeisForm">
	                			<div className="buscarForm">
						            <form>
						                <input type="text" placeholder="Buscar por nome...." autoCapitalize="none"
						                 autoCorrect={false} />
						                <button type="submit"><img className= "LogoSearch" src= {Mag} alt="myimage" /></button>
						            </form>

						            <div className="telaListaUsuarios">
	                                {usuarios.map((data,index)=>(
	                                    <div className="usuariosForm" key={index}>
	                                        <input type="text" placeholder={data.nome} disabled="disabled"  value={data.nome} onChange={HandleUpdateFieldChanged(index,'nome')} className="nomeParticipante"/>
	                                        <input type="text" placeholder={data.email} disabled="disabled" value={data.email} onChange={HandleUpdateFieldChanged(index,'email')} className="emailParticipante"/>
	                                        <input type="text" placeholder={data.papel} disabled="disabled" value={data.papel} onChange={HandleUpdateFieldChanged(index,'papel')} className="tipoParticipante" />
	                                        <button className="deleteUsuarioButton" onClick={handledeleteUsuario(index)}> <img className= "LogoSearch" src= {Trash} alt="myimage" /></button>
	                                        <button className="mudarPapelButton"><img className= "LogoSearch" src= {Card} alt="myimage" onClick={togglePopup(index)} /></button>
	                                        {isOpen && <PopUp content={<>
	        									<b>Mudar Atribuição do Usuario {pointer.nome}</b> 
													<div className="CriarEventoPresencialButtons">
													    <input type="radio" name="tipoUsu" value="1" onChange={myChangeHandler}/>
													    <label for="a">Administrador</label>
													    <input type="radio" name="tipoUsu" value="2" onChange={myChangeHandler}/>
													    <label for="b">Revisor</label>
													    <input type="radio" name="tipoUsu" value="3" onChange={myChangeHandler}/>
													    <label for="c">Usuario</label>
													</div>
                                                    <div className="CadastroFooterConatiner">
                                                        <button type="submit" className="popButtonCancelar" onClick={togglePopup(index)}>
                                                            <p>Cancelar</p>
                                                        </button>   
                                                        <button type="submit" className="popButtonConfirmar" onClick={trocarTipoUsuarios(pointer.id)} >
                                                            <p>Confirmar</p>
                                                        </button>   
													</div>
											</>}
	    										handleClose={togglePopup}/>}
	                                    </div>
	                                ))}
	                                </div>
					            </div>
	                		</div>
					</div>
			</div>
		)
	}
	else{
        return(
            <div className="DefaultContainer">
                <h4>Conectando...</h4>
            </div>
        )
    }
    
}