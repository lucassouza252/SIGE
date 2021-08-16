import React, {useState, useEffect} from 'react';
import {View,Text,Image,TextInput, TouchableOpacity,Alert, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Navbar from './Components/Navbar';
import Logo from '../Assets/Logo.png';
import api from '../services/api';


export default function Home ({history}){
    return (
        <View className="HomeContainer">
            <Image source={Logo} className="HomeLogo"/>
            <View className="HomeContent">
            
                <View className="HomeContentHome">
                    <Text>HomePage</Text>
                        
                </View>
            </View>
        </View>
    )
}