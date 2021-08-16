import React, {useState, useEffect} from 'react';
import {View,Text,Image,TextInput, TouchableOpacity,Alert, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Logo from '../Assets/Logo.png';
import radioPreenchido from '../Assets/radioFilled.png';
import radioNaoPreenchido from '../Assets/radio.png';
import checkbox from '../Assets/checkbox.png';
import checkboxCheck from '../Assets/checkbox_checked.png';
import api from '../services/api'
import {VerificarCodigosMaliciosos,VerificarEmail,VerificarCPF} from '../VerificarCodigos/Funcoes';

export default function Cadastro ({navigation}){
    const [nome,setNome]=useState('');
    const [cpf,setCpf]=useState('');
    const [email,setEmail]=useState('');
    const [senha,setSenha]=useState('');
    const [confirmarSenha,setConfirmarSenha]=useState('');
    const [deficiencia, setDeficiencia] = useState(false);
    const [deficienciaFisica, setDeficienciaFisica] = useState(false);
    const [deficienciaAuditiva, setDeficienciaAuditiva] = useState(false);
    const [deficienciaVisual, setDeficienciaVisual] = useState(false);
    const [solicitacao,setSolicitacao]=useState('')
   

    function handleDeficiencia(state){
        setDeficiencia(state);
    }
    async function HandleCadastro(){
        if( senha===confirmarSenha){
            if(
                VerificarCodigosMaliciosos(senha) &&
                VerificarEmail(email,'email') &&
                VerificarCPF(cpf, 'cpf')
            ){
                const deficienciaString = `${deficienciaAuditiva? 'auditiva,':''} ${deficienciaFisica? 'fisica,':' ' } ${deficienciaVisual?'visual':''} / ${solicitacao}`
                 const response = await api.post('/cadastro', {
                    "nome":nome,
	                "cpf":cpf,
	                "email":email,
	                "senha":senha,
	                "deficiencia":deficiencia,
	                "tipo_deficiencia": deficienciaString,
                    }) 

                    console.log(response.data)
                if(!response.data.sucess){
                    alert(response.data.message)
                }else{
                    navigation.push('Login');
                }
    
            }
        }
            
    }
    return (
        <SafeAreaView>
        <ScrollView>
        <View style={styles.CadastroContainer}>
            <Image source={Logo} style={styles.CadastroLogo}/>
            <View style={styles.CadastroContent}>
                <Text style={styles.CadastroContentTexto}>É novo aqui? Crie uma conta</Text>
                    <Text style={styles.CadastroContentTexto} >Nome Completo</Text>
                    <TextInput style={styles.CadastroContentInput} type="text" placeholder="digite seu Nome Completo" autoCapitalize="none"
                        autoCorrect={false} onChangeText={setNome}/>
                    <Text style={styles.CadastroContentTexto} >CPF</Text>
                    <TextInput style={styles.CadastroContentInput} type="text" placeholder="digite seu CPF" autoCapitalize="none"
                        autoCorrect={false} onChangeText={setCpf} />
                    <Text style={styles.CadastroContentTexto} >E-mail</Text>
                    <TextInput style={styles.CadastroContentInput} type="email" placeholder="digite seu E-mail" autoCapitalize="none"
                        autoCorrect={false} onChangeText={setEmail} />
                    <Text style={styles.CadastroContentTexto} >Senha</Text>
                    <TextInput  style={styles.CadastroContentInput} type="password" name="password" placeholder="digite sua Senha" autoCapitalize="none"
                        autoCorrect={false} secureTextEntry={true} onChangeText={setSenha}/>
                    <Text style={styles.CadastroContentTexto} >Confirmar Senha</Text>
                    <TextInput style={styles.CadastroContentInput} type="password" name="password" placeholder="digite sua Senha Novamente" autoCapitalize="none"
                        autoCorrect={false} secureTextEntry={true} onChangeText={setConfirmarSenha}/>
                   
                    
                        
                        {deficiencia ? (
                        <View style={styles.CadastroPossuiDeficienciaContainer}>
                            <Text style={styles.CadastroContentTexto} >Possui Alguma Deficiência?</Text>
                            <View style={styles.CadastroPossuiDeficienciaButtons}>
                                <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>handleDeficiencia(false)}>
                                    <Image source={radioNaoPreenchido} />
                                    <Text style={styles.CadastroContentTexto} >Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>handleDeficiencia(true)}>
                                    <Image source={radioPreenchido} />
                                    <Text style={styles.CadastroContentTexto} >Sim</Text>
                                </TouchableOpacity>
                            </View> 
                            <View className="CadastroDefiecienciaContent">
                                <View className="CadastroOptionDeficiencia">
                                    <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>{setDeficienciaFisica(!deficienciaFisica)}} value={deficienciaFisica}>
                                     <Text style={styles.CadastroContentTexto} >Deficiencia Fisica</Text>
                                    {deficienciaFisica ?  <Image source={checkboxCheck}/>: <Image source={checkbox}/>}
                                    </TouchableOpacity>
                                </View>
                                <View className="CadastroOptionDeficiencia">
                                    <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>{setDeficienciaAuditiva(!deficienciaAuditiva)}} value={deficienciaAuditiva}>
                                     <Text style={styles.CadastroContentTexto}>Deficiencia Auditiva</Text>
                                    {deficienciaAuditiva ?  <Image source={checkboxCheck}/>: <Image source={checkbox}/>}
                                    </TouchableOpacity>
                                </View>
                                <View className="CadastroOptionDeficiencia">
                                    <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>{setDeficienciaVisual(!deficienciaVisual)}} value={deficienciaVisual}>
                                    <Text style={styles.CadastroContentTexto}>Deficiencia Visual</Text>
                                    {deficienciaVisual ?  <Image source={checkboxCheck}/>: <Image source={checkbox}/>}
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    className="CadastroSolicitacao"
                                    placeholder="digite sua solicitação"
                                    onChangeText={setSolicitacao}
                                    style={styles.textArea}>
                                </TextInput>
                           
                            </View>
                        </View>):(
                        <View className="CadastroPossuiDeficienciaContainer">
                            <Text style={styles.CadastroContentTexto} >Possui Alguma Deficiência?</Text>
                            <View style={styles.CadastroPossuiDeficienciaButtons}>
                                <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>handleDeficiencia(false)}>
                                    <Image source={radioPreenchido} />
                                    <Text style={styles.CadastroContentTexto}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.CadastroPossuiDeficienciaButton} onPress={()=>handleDeficiencia(true)}>
                                    <Image source={radioNaoPreenchido} />
                                    <Text style={styles.CadastroContentTexto}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )}
                          <View style={styles.CadastroFooterConatiner}>
                            <TouchableOpacity type="submit" 
                            style={styles.CadastroTouchableOpacityCancelar} onPress={()=>{navigation.push('Login')}} >
                                <Text style={styles.CadastroContentTexto} >Cancelar</Text>
                            </TouchableOpacity>   
                            <TouchableOpacity type="submit" style={styles.CadastroTouchableOpacityConfirmar} onPress={()=>{HandleCadastro()}} >
                                <Text style={styles.CadastroContentTexto} >Confirmar</Text>
                            </TouchableOpacity>   
                          </View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
CadastroContainer:{
    backgroundColor: '#1C1818',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex:1
},
CadastroLogo:{
    width: 173,
    height: 90,
    marginTop: 50,
},
CadastroContent:{
    marginTop: 50,
    flexDirection: 'column',
    width: '100%',
    maxWidth: 450,
    padding: 20,
},
CadastroContentTexto:{
    color:'white',
   fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:5,
    marginTop:15,
    marginRight:5},
CadastroContentInput:{
    borderRadius: 8,
    backgroundColor: '#c4c4c4',
    padding: 5},
CadastroPossuiDeficienciaButtons:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'
},
CadastroPossuiDeficienciaButton:{
    display: 'flex',
    flexDirection: 'row', 
    alignItems:'center',
    justifyContent:'space-between'
},
textArea:{
    backgroundColor:'#c4c4c4',
    borderRadius:10,
    height:100,
},
CadastroFooterConatiner:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
},
CadastroTouchableOpacityCancelar:{
    backgroundColor: '#D20B0B',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15
},
CadastroTouchableOpacityConfirmar:{
    backgroundColor: '#0B1FD2',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10
}  
})