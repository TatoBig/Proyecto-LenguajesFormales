import React, { useEffect, useState } from "react";
import VisProvider from "vis-network-hook";
import Graph from "./Graph";

const visreact = ({ tokensState }) => {

  const [data, setData] = useState({})
  const localData = {
    nodes: [],
    edges: []
  }


  useEffect(() => {
    if (tokensState) {
      console.log(tokensState)
      procesarTokens()
    }
  }, [tokensState])

  const procesarTokens = () => {
    let contadorDeNodos = 1
    try {
      tokensState.map((token, index) => {
        let kliene = false
        let newToken = token
        if (index === 0) {
          localData.nodes.push({
            id: 0, label: "q0"
          })
        } 
        for (let i = 0; i < token.length; i++) {
          if (token[i] === '|') {
            newToken = newToken.replace('|', ',')
            newToken = newToken.replace('(', ' ')
            newToken = newToken.replace(')', ' ')
          }
          if (token[i] === '*') {
            newToken = newToken.replace('*', ' ')
            localData.edges.push({
              from: contadorDeNodos-1, to: contadorDeNodos-1, label: `${newToken}`
            })
            kliene = true
          }
        }
        if (kliene === false) {
          localData.nodes.push({
            id: contadorDeNodos, label: `q${contadorDeNodos}`
          })
          localData.edges.push({
            from: contadorDeNodos-1, to: contadorDeNodos, label: `${newToken}`
          })
          contadorDeNodos++
        } else {
          kliene = false
        }
        
      })
    } catch (e) {

    }
    setData(localData)
  }

  return (
    <VisProvider graph={data}>
      <Graph />
    </VisProvider>
  );
}

export default visreact
