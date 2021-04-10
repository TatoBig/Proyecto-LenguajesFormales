import React, { useState, useMemo, useRef, useCallback } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Compilador from '../components/Compilador'
import { Diccionario } from '../components/Diccionario'
import { TextareaAutosize } from '@material-ui/core'


export default function Home() {
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
    let token = {
      valor: 'defecto',
      tipo: 'defecto',
      estado: 'defecto',
      linea: 0
    }
    const lineas = oracion.replace(/\r/g, "").split(/\n/)
    console.log(lineas)
    lineas.map((linea,no_linea) => {
      const palabras = linea.trim().split(" ")
      for(let i = 0; i<palabras.length;i++){
        for(let j = 0; j<Diccionario.length; j++){
            if(Busqueda(palabras[i])){
              for(let l = 0; l<Diccionario.length; l++){
                  if(palabras[i]===Diccionario[l].valor){
                    token = {
                      valor: palabras[i],
                      tipo: Diccionario[l].tipo,
                      estado: 'Válido',
                      linea: no_linea+1
                    }
                  }
              }
              datos.push(token)
              break;
            }else if(palabras[i].charAt(0)>="a" || palabras[i].charAt(0)>="A"){
              for(let k = 0; k<palabras[i].length; k++){
                if (palabras[i].charAt(0)>="a" || palabras[i].charAt(0)>="A") {
                  token = {
                  valor: palabras[i],
                  tipo: 'Identificador',
                  estado: 'Válido',
                  linea: no_linea+1
                }
                  break;
                }
              }
              datos.push(token) 
              break;         
          }
          else if(palabras[i]>=0)
          {
            token = {
              valor: palabras[i],
              tipo: 'Numeros',
              estado: 'Válido',
              linea: no_linea+1
            }
            datos.push(token)
            break; 
          }
          else{ 
            var flag=false
            if(palabras[i].charAt(0)>="0"){
              for(let g=0;g<palabras[i].length;g++)
              {
                if(palabras[i].charAt(g)>="a" || palabras[i].charAt(g)>="A")
                {

                console.log("funciona")
                  token = {
                    valor: palabras[i],
                    tipo: 'ERROR',
                    estado: 'Invalido',
                    linea: no_linea+1
                  }
                  flag=true
                  break;
                }
              }
              if(flag)
              {
                datos.push(token)
                break;
              }
            }
            
          }
    }}
    setObjetos(datos)
    }
  
   
   )
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
    console.log(`${oracion}`)
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
