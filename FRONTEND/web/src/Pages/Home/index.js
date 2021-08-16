import Navbar from '../Components/Navbar';
import Logo from '../../Assets/Logo.png';
import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import './Home.css'
export default function Home ({history}){
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
},[]);

    if(papel!==''){
    return (
        <div className="HomeContainer">
            <img src={Logo} className="HomeLogo"/>
            <div className="HomeContent">
                <Navbar papel={papel} ativo='home' />
                <div className="HomeContentHome">
                    <h3>HomePage</h3>
                        
                </div>
            </div>
        </div>
    )
    }else{
        return(
        <div className="DefaultContainer">
            <h4>Conectando...</h4>
        </div>
        )
    }
}