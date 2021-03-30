import React, { useState, useMemo, useRef, useCallback } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Compilador from '../components/Compilador';
import { Diccionario } from '../components/Diccionario'


export default function Home() {
  const [ objetos, setObjetos ] = useState([])

  let oracion = ''
  let datos = []

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
          if(palabras[i] === Diccionario[j].valor){
            token = {
              valor: palabras[i],
              tipo: Diccionario[j].tipo,
              estado: 'Válido',
              linea: no_linea+1
            }
            datos.push(token)
            break;
          }else if(Diccionario.length === j+1){
            token = {
              valor: palabras[i],
              tipo: 'variable',
              estado: 'Válido',
              linea: no_linea+1
            }
            datos.push(token)          
        }
      }
      setObjetos(datos)
    }
      }
      )
    }
 
    
  const handleChange = e => {
    oracion = e.target.value
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
      <SideBar/>
      <Compilador alCambio={handleChange} alClic={handleOnClick} tokens={objetos} />
    </React.Fragment>
  )
}
