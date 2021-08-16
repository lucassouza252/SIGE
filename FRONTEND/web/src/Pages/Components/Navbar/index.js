import { ReactComponent as EventoIcon} from '../../../Assets/svg/calendarPlus.svg';
import { ReactComponent as SubmissaoIcon} from '../../../Assets/svg/edit.svg';
import { ReactComponent as CertificadoIcon} from '../../../Assets/svg/filePdf.svg';
import { ReactComponent as HomeIcon} from '../../../Assets/svg/home.svg';
import { ReactComponent as TrilhaIcon} from '../../../Assets/svg/trilha.svg';
import { ReactComponent as UsuariosIcon} from '../../../Assets/svg/usuarios.svg';
import { ReactComponent as RevisorIcon} from '../../../Assets/svg/revisor.svg';
import { ReactComponent as OrientadorIcon} from '../../../Assets/svg/orientador.svg';
import  HamburguerIcon from '../../../Assets/Hamburguer.png';
import { useHistory } from "react-router";
import {useState} from 'react';
import './Navbar.css'
export default function Navbar(props){
    const [displayNav,setDisplayNav]=useState(false)
    const history = useHistory();
    return (
        <div className="NavBarContainer">
            <button className="buttonShowEHidden" onClick={()=>setDisplayNav(!displayNav)}>
                <img src={HamburguerIcon} />
            </button>
            <div className={`NavBarContent ${displayNav? 'show':''}`}>
                <ul>
                    <li className={`ElementNavabar ${ props.ativo === 'home' ? 'active': ''}`} onClick={()=>history.push('/home')}>
                        <HomeIcon />
                        <p>Home</p>
                    </li>
                    {props.papel===1 ?
                    (<li className={`ElementNavabar notWeb ${ props.ativo === 'criarEvento' ? 'active': ''}`} onClick={()=>history.push('/criarEvento')}>
                        <EventoIcon />
                        <p>Evento</p>
                    </li>) : <> </>
                        }
                    {props.papel===1 ?
                    (<li className={`ElementNavabar notWeb ${ props.ativo === 'trilha' ? 'active': ''}`} onClick={()=>history.push('/criartrilha')}>
                        <TrilhaIcon />
                        <p>Trilha</p>
                    </li>) : <> </>
                        }
                    {props.papel===1 ?
                    (<li className={`ElementNavabar notWeb ${ props.ativo === 'usuarios' ? 'active': ''}`} onClick={()=>history.push('/usuarios')}>
                        <UsuariosIcon />
                        <p>Usuarios</p>
                    </li>) : <> </>
                        }  
                    {props.papel===3 ?                 
                    (<li className={`ElementNavabar ${ props.ativo === 'submissao' ? 'active': ''}`} onClick={()=>history.push('/submissao')}>
                        <SubmissaoIcon />
                        <p>Submissão</p>
                    </li>) : <> </>}
                    <li className={`ElementNavabar ${ props.ativo === 'certificado' ? 'active': ''}`} onClick={()=>history.push('/certificado')}>
                        <CertificadoIcon />
                        <p>Certificado</p>
                    </li>
                    {props.papel===1 || props.papel===2 ?
                    (<li className={`ElementNavabar notWeb ${ props.ativo === 'revisor' ? 'active': ''}`} onClick={()=>history.push('/revisor')}>
                        <RevisorIcon />
                        <p>Revisor</p>
                    </li>) : <> </>
                        } 
                    <li className={`ElementNavabar ${ props.ativo === 'orientador' ? 'active': ''}`} onClick={()=>history.push('/orientador')}>
                        <OrientadorIcon />
                        <p>Orientador</p>
                    </li>    
                    
                </ul>
            </div>
        </div>    
)}
