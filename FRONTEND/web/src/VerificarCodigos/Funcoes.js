//VerificarCodigosMaliciosos
export function VerificarCodigosMaliciosos(texto,nome){
    if(texto===''){
        alert(`${nome} não preenchida`)
        return false
    }else if(texto.includes('<') || texto.includes(`'`) || texto.includes(`"`) || texto.includes('>') || texto.includes('`')){
        alert(`Formato de ${nome} invalido`)
        return false
    }else{
        return true
    }
}
//Verificar Email ou CPF
export function VerificarEmailOrCpf(texto,nome){
        
    if(texto===''){
        alert(`${nome} não preenchida`)
        return false
    }else if(texto.includes('<') || texto.includes(`'`) || texto.includes(`"`) || texto.includes('>') || texto.includes('`')){
        alert(`Formato de ${nome} invalido`)
        return false
    }else if(!(texto.includes('@') && texto.includes('.com')) /*|| verificarSeSóTemNumero */){
        if(VerificarCPF(texto,nome)){
            return true
        }
        return false
    }else{
        return true
    }
    
}

export function VerificarCPF(texto,nome){

    var gapNumero = /^[0-9]+$/;

        if(gapNumero.test(texto) && texto.length === 11){
            return true
        }

    alert(`Formato de ${nome} invalido`)
    return false

}

export function VerificarEmail(texto,nome){

    if(texto===''){
        alert(`${nome} não preenchida`)
        return false
    }else if(texto.includes('<') || texto.includes(`'`) || texto.includes(`"`) || texto.includes('>') || texto.includes('`')){
        alert(`Formato de ${nome} invalido`)
        return false
    }else if(!(texto.includes('@') && texto.includes('.com')) /*|| verificarSeSóTemNumero */){
        alert(`Formato de ${nome} invalido`)
        return false
    }else{
        return true
    }

}