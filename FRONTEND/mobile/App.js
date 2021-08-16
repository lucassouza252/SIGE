import React, {Component} from 'react';
import 'react-native-gesture-handler';
import Routes from './src/routes';
import { WebView } from 'react-native-webview';

export default class App extends Component  {
  render(){
  return (
  
    <WebView
        startInLoadingState={true}
        originWhitelist={['*']}
        source = {{uri: 'http://192.168.0.104:3005'}}
          //source = {{uri: 'http://192.168.0.104:3005', baseUrl: 'http://192.168.52.2:3000'}}
        javaScriptEnabled={true}
          
        /> 
    );
  }
}
