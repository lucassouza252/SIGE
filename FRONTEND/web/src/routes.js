import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import CriarEvento from './Pages/CriarEvento';
import Home from './Pages/Home';
import CriarTrilha from './Pages/CriarTrilha';
import Submissao from './Pages/Submissao';
import Certificado from './Pages/Certificado';
import MudarPapeis from './Pages/MudarPapeis';
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact/>
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/criarEvento" component={CriarEvento} />
                <Route path="/home" component={Home} />
                <Route path="/criarTrilha" component={CriarTrilha} />
                <Route path="/submissao" component={Submissao} />
                <Route path="/certificado" component={Certificado} />
                <Route path="/mudarPapeis" component={MudarPapeis} />
            </Switch>
        </BrowserRouter>
    )
}