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
  const options = {
    layout: {
      randomSeed: 2
    },
    nodes: {
      scaling: {
        customScalingFunction: function (min, max, total, value) {
          return value / total;
        },
        min: 5,
        max: 150,
      },
      color: {
        background: "#ffffff",
        border: "#87a6aa",
        highlight: {
          border: "#87a6aa",
          background: "#ffffff"
        },
        hover: {
          border: "#87a6aa",
          background: "#ffffff"
        }
      },
      fixed: {
        x: false,
        y: false
      },
      shape: "circle",
      size: 13,
      borderWidth: 1.5,
      borderWidthSelected: 2,
      font: {
        size: 15,
        align: "center",
        bold: {
          color: "#bbbdc0",
          size: 15,
          vadjust: 0,
          mod: "bold"
        }
      }
    },
    edges: {
      width: 0.01,
      color: {
        color: "#D3D3D3",
        highlight: "#797979",
        hover: "#797979",
        opacity: 3.0
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
        middle: { enabled: false, scaleFactor: 1 },
        from: { enabled: false, scaleFactor: 1 }
      }
    },
    physics: {
      barnesHut: {
        gravitationalConstant: -1800,
        centralGravity: 1,
        springLength: 30,
        avoidOverlap: 1
      },
      stabilization: { iterations: 2500 }
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      selectable: true,
      selectConnectedEdges: true,
      dragView: true
    }
  };
  return (
    <VisProvider graph={data} options={options}>
      <Graph />
    </VisProvider>
  );
}

export default visreact
