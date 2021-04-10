import React, { useState, useMemo, useRef, useCallback } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Compilador from '../components/Compilador'
import { Diccionario } from '../components/Diccionario'
import { TextareaAutosize } from '@material-ui/core'
import { LensTwoTone } from '@material-ui/icons'

export default function Home() {
  //  ---- EXPRESIONES REGULARES ----
  let identificadores = /[a-z]([a-z]|[0-9])*/ 
  let numeros = /[0-9][0-9]*/

  const [ objetos, setObjetos ] = useState([])
  const [ oracion, setOracion ] = useState('')
  let datos = []
  
  const limpiar = () => {
      setObjetos([])
      setOracion('')
  }

  // const abrirArchivo = () => {
  //   oracion = stringDelArchivo.
  // }
  function Busqueda(pal){
    for(let s = 0; s<Diccionario.length; s++){
      if(pal === Diccionario[s].valor){
        return true
      }
  }
  return false
}
  const crearArrayOracion = () => {
    let no_linea = 0    
    const lineas = oracion.replace(/\r/g, "").split(/\n/)
    lineas.map((linea) => {
    no_linea += 1
    let palabra = ''
    for (let i = 0; i < linea.length+1; i++) {
      console.log('CARACTER '+ palabra)
      console.log(`CARACTER SIGUIENTE ${linea[i+1]}`)
      if(linea.charAt(i) !== ' '){
        console.log(linea.charAt(i) !== ' ')
        if(esCaracterEspecial(linea.charAt(i)) === true){
          console.log(`Analizando palabra: ${palabra}`)
          analizar(palabra, no_linea)
          analizarSimbolo(linea.charAt(i),no_linea)
          console.log(`Caracter: ${linea.charAt(i)}`)
          palabra = ''
        }
        else if(linea[i] === undefined){
          console.log(`Analizando palabra: ${palabra}`)
          analizar(palabra, no_linea)
          palabra = ''
        }else{
          console.log('Continua')
          palabra = palabra + linea.charAt(i)
        }        
      }else{
        console.log(`Analizando palabra: ${palabra}`)
        analizar(palabra, no_linea)
        palabra = ''
      }
    }
    setObjetos(datos)
  })
}

  const esCaracterEspecial = (caracter) => {
    for (let i = 0; i < Diccionario.length; i++) {
      if(caracter === Diccionario[i].valor){
        console.log(`Caracter especial detectado: ${Diccionario[i].valor}`)
        return true
      }
    }
  }
  const analizarSimbolo = (caracter, no_linea) => {
    for (let i = 0; i < Diccionario.length; i++) {
      if(caracter === Diccionario[i].valor){
        const token = {
          valor: Diccionario[i].valor,
          tipo: Diccionario[i].tipo,
          estado: 'Válido',
          linea: no_linea
        }
        datos.push(token)
        console.log(`Caracter especial detectado: ${Diccionario[i].valor}`)
        return true
      }
    }
  }
  const analizar = (palabra, no_linea) => {
    palabra = palabra.trim()
    palabra = palabra.toLowerCase()
    for (let i = 0; i < Diccionario.length; i++) {
      //Si la palabra es palabra reservada
      if(palabra === Diccionario[i].valor){
        const token = {
          valor: Diccionario[i].valor,
          tipo: Diccionario[i].tipo,
          estado: 'Válido',
          linea: no_linea
        }
        console.log(`Palabra reservada correctamente guardada`)
        datos.push(token)
        palabra = ''
        return true
      }
    }
    if(palabra !== ''){
      console.log(`Saber que será esta palabra uste: ${palabra}`)
      const resultadoId = identificadores.exec(palabra)
      const resultadoNum = numeros.exec(palabra)
      try{
        if(resultadoId !== null){
          if(resultadoId[0] === palabra){
            console.log(`Palabra valida`)
            const token = {
              valor: palabra,
              tipo: 'Identificador',
              estado: 'Válido',
              linea: no_linea
            }
            datos.push(token)
            palabra = ''
            return true
          }
        }else if(resultadoNum !== null){
          if(resultadoNum[0] === palabra){
            console.log(`Palabra numeros`)
            const token = {
              valor: palabra,
              tipo: 'Número',
              estado: 'Válido',
              linea: no_linea
            }
            datos.push(token)
            palabra = ''
            return true
          }
        }       
      }catch (e){}     
    }
    if(palabra !== ''){
      const token = {
        valor: palabra,
        tipo: 'Error',
        estado: 'Inválidado',
        linea: no_linea
      }
      datos.push(token)
      console.log('Palabra invalida')
      palabra = ''
      return true
    }
  }

  const openText=()=>{
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 

      // getting a hold of the file reference
      var file = e.target.files[0]; 

      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file); // this is reading as data url

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
          var content = readerEvent.target.result; // this is the content!
          setOracion(content)
      }

    }
    input.click();
}


  const handleChange = e => {
  setOracion(e.target.value)
  console.log(oracion)
  console.log({      
    value: e.target.value
  })
} 

  const handleOnClick = e => {
    crearArrayOracion()
  }

  return (
    <React.Fragment>
      <Navbar/>
      <SideBar newArchivo={limpiar} openArchivo={openText}/>
      <Compilador alCambio={handleChange} alClic={handleOnClick} tokens={objetos} defecto={oracion}/>
    </React.Fragment>
  )
}


    //   for(let i = 0; i<palabras.length;i++){
    //     for(let j = 0; j<Diccionario.length; j++){
    //         if(Busqueda(palabras[i])){
    //           for(let l = 0; l<Diccionario.length; l++){
    //               if(palabras[i]===Diccionario[l].valor){
    //                 token = {
    //                   valor: palabras[i],
    //                   tipo: Diccionario[l].tipo,
    //                   estado: 'Válido',
    //                   linea: no_linea+1
    //                 }
    //               }
    //           }
    //           datos.push(token)
    //           break;
    //         }else if(palabras[i].charAt(0)>="a" || palabras[i].charAt(0)>="A" || palabras[i].charAt(palabras.length-1)>=Diccionario[j].valor){
    //           let conjunto=''
    //           for(let k = 0; k<palabras[i].length; k++){
    //             /////////////////////////////////////////////
    //                   if ((palabras[i].charAt(k)>="a" && palabras[i].charAt(k)<="z") || (palabras[i].charAt(k)>="A" && palabras[i].charAt(k)<="Z") || (palabras[i].charAt(k)>=0 && palabras[i].charAt(k)<=9)) {
    //                   conjunto=conjunto+palabras[i].charAt(k)
    //                   if(conjunto.charAt(0)>=0 && conjunto.charAt(0)<=9){
    //                     token = {
    //                       valor: conjunto,
    //                       tipo: 'Numeros',
    //                       estado: 'Válido',
    //                       linea: no_linea+1
    //                     }
    //                   }
    //                   else{
    //                   token = {
    //                   valor: conjunto,
    //                   tipo: 'Identificador',
    //                   estado: 'Válido',
    //                   linea: no_linea+1
    //                 }
    //               }
    //             }
    //             //////////////////////////////////////////////
    //             else{
    //               datos.push(token)
    //               conjunto=''
    //               token = {
    //                 valor: palabras[i].charAt(k),
    //                 tipo: 'Signo',
    //                 estado: 'Válido',
    //                 linea: no_linea+1
    //               }
    //               conjunto=''
    //             }
    //           }
    //           datos.push(token) 
    //           break;         
    //       }
    //       else if(palabras[i]>=0)
    //       {
    //         token = {
    //           valor: palabras[i],
    //           tipo: 'Numeros',
    //           estado: 'Válido',
    //           linea: no_linea+1
    //         }
    //         datos.push(token)
    //         break; 
    //       }
    //       else{ 
    //         var flag=false
    //         if(palabras[i].charAt(0)>="0"){
    //           for(let g=0;g<palabras[i].length;g++)
    //           {
    //             if(palabras[i].charAt(g)>="a" || palabras[i].charAt(g)>="A")
    //             {

    //             console.log("funciona")
    //               token = {
    //                 valor: palabras[i],
    //                 tipo: 'ERROR',
    //                 estado: 'Invalido',
    //                 linea: no_linea+1
    //               }
    //               flag=true
    //               break;
    //             }
    //           }
    //           if(flag)
    //           {
    //             datos.push(token)
    //             break;
    //           }
    //         }
            
    //       }
    // }}
    // setObjetos(datos)
    // }