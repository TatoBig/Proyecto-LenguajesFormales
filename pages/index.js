import React, { useState, useMemo, useRef, useCallback } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Compilador from '../components/Compilador'
import { Diccionario } from '../components/Diccionario'
import { TextareaAutosize } from '@material-ui/core'
import { LensTwoTone } from '@material-ui/icons'
import Footer from '../components/Footer'
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
      setOpen(true)
  }
  
  const [open, setOpen] = React.useState(false);

  const cerrarAlerta = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
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
    let simbolo = ''
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
          if(linea.charAt(i)==='<' || linea.charAt(i)==='>' || linea.charAt(i)==='='){
            if(linea.charAt(i+1)==='='){
              simbolo =  linea.charAt(i) + linea.charAt(i+1)
              analizarSimbolo(simbolo,no_linea)
              simbolo = ''
              i++
            }else{
              analizarSimbolo(linea.charAt(i),no_linea)
            }
          }else{
            analizarSimbolo(linea.charAt(i),no_linea)
          }
          
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
          setOpen(true)
      }

    }
    input.click();
    
}

  function Recopilacion(){
    let recopilador='Palabra----Tipo----Estado----Linea\n'
    for (let cont = 0; cont < objetos.length; cont++)
    {
      recopilador=recopilador+objetos[cont].valor+'----'+objetos[cont].tipo+'----'+objetos[cont].estado+'----'+objetos[cont].linea+'\n'
    }
    return recopilador
  }
  
  function saveTabla() {
    var contenidoEnBlob = new Blob([Recopilacion()], {type: 'text/plain'});
    var lector = new FileReader();
    
    lector.onload = function(event) {
    
    var guardar = document.createElement('a');
    guardar.href = event.target.result;
    guardar.target = '_blank';
    guardar.download = 'archivos.txt' || 'archivo.dat';
    var clicEvent = new MouseEvent('click', {
    'bubbles': false,
    'cancelable': true
    });
    
    guardar.dispatchEvent(clicEvent);
    };
    
    lector.readAsDataURL(contenidoEnBlob);
    setOpen(true)
    };
  
  function saveTexto(){
    
    var contenidoEnBlob = new Blob([oracion], {type: 'text/plain'});
    var lector = new FileReader();
    
    lector.onload = function(event) {
    
    var guardar = document.createElement('a');
    guardar.href = event.target.result;
    guardar.target = '_blank';
    guardar.download = 'archivos.txt' || 'archivo.dat';
    var clicEvent = new MouseEvent('click', {
    'bubbles': false,
    'cancelable': true
    });
    
    guardar.dispatchEvent(clicEvent);
    };
    
    lector.readAsDataURL(contenidoEnBlob);
    setOpen(true)
    };
  
    
   

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
      <SideBar newArchivo={limpiar} openArchivo={openText} saveArchivo={saveTabla} saveTexto={saveTexto} open={open} cerrarAlerta={cerrarAlerta}/>
      <Compilador alCambio={handleChange} alClic={handleOnClick} tokens={objetos} defecto={oracion}/>
      <Footer/>
    </React.Fragment>
  )
}
