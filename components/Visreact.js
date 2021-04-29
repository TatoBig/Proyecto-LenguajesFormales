import React from "react";
import VisProvider from "vis-network-hook";
import Graph from "./Graph";

const visreact = () => {
    const data = {
        nodes: [
          { id: 1, label: "Node 1" },
          { id: 2, label: "Node 2" },
          { id: 3, label: "Node 3" },
          { id: 4, label: "Node 4" },
          { id: 5, label: "Node 5" }
        ],
        edges: [
          { from: 1, to: 3 },
          { from: 1, to: 2 },
          { from: 2, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 3 }
        ]
      };
    
      return (
        <VisProvider graph={data}>
          <Graph />
        </VisProvider>
      );
}

export default visreact
