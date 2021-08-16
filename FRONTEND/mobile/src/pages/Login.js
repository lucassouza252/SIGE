import React, {useState} from 'react';
import {View,Text,Image,TextInput, TouchableOpacity,Alert, StyleSheet} from 'react-native';
import {VerificarCodigosMaliciosos,VerificarEmailOrCpf} from '../VerificarCodigos/Funcoes';
import circleCheck from '../Assets/circle_check.png';
import api from '../services/api.js';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../Assets/Logo.png';

export default function Login ({navigation}) {
     async function logar(){
        if(VerificarCodigosMaliciosos(senha,'senha') && VerificarEmailOrCpf(emailOrCpf,'senha ou CPF')){

            const response = await api.post('/login', {
                "login":emailOrCpf,
	            "senha":senha
                })
            if(!response.data.sucess){
                alert(response.data.message)
            }else{
                 AsyncStorage.setItem('@sigeToken',response.data.token)
                  navigation.navigate('Home');
            }    
        }
               
    }
    function handleLoginCad() {
    navigation.navigate('Cadastro');
  }

    const [emailOrCpf,setEmailOrCpf]=useState('');
    const [senha,setSenha]=useState('');
    const [lembrar, setLembrar] = useState(false);

    function handleLembrar(){
        setLembrar(!lembrar);
    }
    return (
        <View style={styles.LoginContainer}>
            <Image source={Logo} style={styles.LoginLogo} />
            <View style={styles.LoginContent}>
                <Text style={styles.LoginContentTexto} >Fazer Login</Text>
                    <Text style={styles.LoginContentTexto}>CPF/E-mail</Text>
                    <TextInput type="text" placeholder="digite seu CPF ou E-mail" onChangeText={setEmailOrCpf} style={styles.LoginContentInput}/>
                    <Text style={styles.LoginContentTexto} >Senha</Text>
                    <TextInput type="password" name="password" placeholder="digite sua Senha" onChangeText={setSenha} style={styles.LoginContentInput}/>
                    <View style={styles.LoginLembrarEEsqueci}>
                    <TouchableOpacity onPress={()=>{handleLembrar()}} style={styles.Lembrar}>    
                    { lembrar ? <Image source={circleCheck} style={styles.LoginCirculoCheckout}/> : <View style={styles.LoginCirculo}/> }
                        <Text style={styles.LoginContentTexto} >Lembrar-me</Text>
                    </TouchableOpacity>
                        <Text style={styles.LoginContentTexto} >Esqueci minha senha</Text>
                    </View>
                    <TouchableOpacity style={styles.LoginButtonLogin} onPress={()=>{logar()} }>
                        <Text style={styles.LoginContentTexto} >Entrar</Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginCad} >
                    <Text style={styles.LinkToCadastro} style={styles.LoginContentTexto} style={styles.LoginLinkCadastro}>É novo aqui? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
LoginContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
   alignItems: 'center',
    height: '100%',
    flex:1,
    backgroundColor: '#1C1818'
    },

LoginLogo:{
    width: 173,
    height: 90,
    marginTop: 20
    },

LoginContent:{
    marginTop: 50,
    flexDirection: 'column',
    width: '100%',
    maxWidth: 450,
    padding: 20,
    },

LoginContentTexto:{
    color:'white',
   fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:5},

LoginContentInput:{
    borderRadius: 8,
    backgroundColor: '#c4c4c4',
    padding: 5},

LoginLembrarEEsqueci:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 10,
    color: 'white',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0,
    justifyContent:'space-between'},


LoginCirculoCheckout:{
   width: 15,
    height: 15,
    marginRight: 2},

LoginCirculo:{
    width: 15,
    height: 15,
   marginRight: 2,
    borderRadius: 10,
    backgroundColor: 'white'},

LoginButtonLogin:{
    backgroundColor: '#04D361',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    },

LoginLinkCadastro:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    width:'100%',
    textDecorationLine: "underline",
    },
Lembrar:{
    display:'flex',
    flexDirection:'row'
}
})
