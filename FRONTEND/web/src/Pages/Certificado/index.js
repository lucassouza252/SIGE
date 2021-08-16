import Logo from '../../Assets/Logo.png';
import Mag from '../../Assets/search.png';
import Trash from '../../Assets/trash_full.png';
import Down from '../../Assets/download.png';
import {useState, useEffect} from 'react';
import Navbar from '../Components/Navbar';
import api from '../../services/api'
import './certificado.css';
import Axios from 'axios';
import fileDownload from 'js-file-download';

export default function Certificado({history}){

    function download(url: string, filename: string) {
  Axios.get(url, {
    responseType: 'blob',
  }).then(res => {
    fileDownload(res.data, filename);
  });
}   

	const [certicados,setCerticados]=useState([])
	const token = localStorage.getItem('@sige/token')
    const [papel,setPapel] = useState('');


    useEffect (() =>{
    async function loadCertificados(){
        const response = await api.post('/certificado/listar',{
        	"token": token
        })
            setCerticados(response.data)
    }
    loadCertificados()
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
},[]);

	function myfunction() {
    	console.log("Teste");
 	}

 	async function gerarCertificado(id){

        //alert(id)
        const response = await api.post('/certificado/gerar',{
        	"token": token,
        	"id_certificado": id
        })

        console.log(response.data)
        if(!response){
            alert('aguarde, isso pode levar alguns segundos...')
        }

        if(!response.data.sucess){
            alert(response.data.message)
        }else{
            download(`http://localhost:3000${response.data.link}`,'certificado.pdf')
          
        }
    }

 	function handleNovoCertificado(e){
 		var novoCerticado = {
            evento: 'nome do evento',
            codigo: 'codigo do evento',
            tipo: 'tipo'
        }
        setCerticados(certicados=>[...certicados, novoCerticado])
        e.preventDefault();
    }

    const HandleUpdateFieldChanged = (index,props) => e => {
        let newArray = [...certicados]; 
        newArray[index][props] = e.target.value;
    
        setCerticados(newArray);
    }
    const handledeleteCertificado = index => e => {
        let newArray = [...certicados];
        newArray.splice(index, 1);
        setCerticados(newArray);
        e.preventDefault();
    }
    if(papel!==''){
    return (
        <div className="CertificadoContainer">
        	<img src={Logo} className="SiteLogo"/>
	        	<div className="Nav">
	        		<Navbar papel={papel} ativo='certificado' />
		        		<div className="CertificadoContent">
				 			<h3>Certificados</h3>
				            <div className="Test">
					            <form>
					                <input type="text" placeholder="Buscar certificado...." autoCapitalize="none"
					                 autoCorrect={false} />
					                <button type="submit"><img className= "LogoSearch" src= {Mag} alt="myimage" onClick={myfunction} /></button>
					            </form>
				            </div>

							<h4>Codigo do Certificado</h4>

								<h4>Evento   Tipo</h4>

					        <div className="TabelaCertificados2">
						        { certicados.map((data,index)=>(
					                <div className="TabelaCertificados" key={index}>
					                <form>
					                    <div className="CodigoIn">
					                    	 <input type="text" placeholder={data.codigo} disabled="disabled" value={data.codigo} onChange={HandleUpdateFieldChanged(index,'codigo')} className="codigoCertificado"/>
					                    </div>
					                    <div className="EventoIn">	
						                    <input type="text" placeholder={data.nome_evento} disabled="disabled" value={data.nome_evento} onChange={HandleUpdateFieldChanged(index,'nome_evento')} className="eventoCertificado"/>
						                    <input type="text" placeholder={data.participante} disabled="disabled" value={data.participante} onChange={HandleUpdateFieldChanged(index,'participante')} className="tipoCertificado" />
					                    </div>
					                </form>
					                	<div className="ButtonIn">	                   
					                    	<button className="downloadEvento" onClick={ () => gerarCertificado(data.id)}> <img className= "LogoSearch" src= {Down} alt="myimage" /><p>Download</p></button> 
						                    <button className="deleteEvento" onClick={handledeleteCertificado(index)}><img className= "LogoSearch" src= {Trash} alt="myimage" /><p>Excluir</p></button>
					                    </div>
					                </div>
						         ))}
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