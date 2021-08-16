import { ReactComponent as EventoIcon} from '../../Assets/svg/calendarPlus.svg';
import { ReactComponent as SubmissaoIcon} from '../../Assets/svg/edit.svg';
import { ReactComponent as CertificadoIcon} from '../../Assets/svg/filePdf.svg';
import { ReactComponent as HomeIcon} from '../../Assets/svg/home.svg';
import { ReactComponent as TrilhaIcon} from '../../Assets/svg/trilha.svg';
import { ReactComponent as UsuariosIcon} from '../../Assets/svg/usuarios.svg';
import { ReactComponent as RevisorIcon} from '../../Assets/svg/revisor.svg';
import { ReactComponent as OrientadorIcon} from '../../Assets/svg/orientador.svg';
import  HamburguerIcon from '../../Assets/Hamburguer.png';
import { useNavigation } from '@react-navigation/native';
import {View,Text,Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

export default function Navbar(props){
    const [displayNav,setDisplayNav]=useState(false)
    return (
        <View className="NavBarContainer">
            <TouchableOpacity className="buttonShowEHidden" onPress={()=>setDisplayNav(!displayNav)}>
                <Image source={HamburguerIcon} />
            </TouchableOpacity>
            <View className={`NavBarContent ${displayNav? 'show':''}`}>
                <View>
                    <View  onPress={()=>navigation.navigate('home')}>
                        <HomeIcon />
                        <Text>Home</Text>
                    </View>
                    <View onPress={()=>navigation.navigate('submissao')}>
                        <SubmissaoIcon />
                        <Text>Submissão</Text>
                    </View>
                    <View  onPress={()=>navigation.navigate('certificado')}>
                        <CertificadoIcon />
                        <Text>Certificado</Text>
                    </View>
                    <View  onPress={()=>navigation.navigate('orientador')}>
                        <OrientadorIcon />
                        <Text>Orientador</Text>
                    </View>    
                    
                </View>
            </View>
        </View>    
)}
