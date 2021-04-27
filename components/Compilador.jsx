import React from 'react'
import { makeStyles, TextareaAutosize, Button } from '@material-ui/core'
import Tabla from './Tabla'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: `calc(100% - 240px)`,
    marginLeft: 260,
    marginTop: 80,
  },
  button: {
    display: 'flex',
    width: "120px",
    marginLeft: 260,
    color: "#ffffff",
    backgroundColor: "#1E1E1E"
  },
  textarea: {
    width: "50%",
    height: "150px",
    padding: "12px 20px",
    boxSizing: "border-box",
    border: "2px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f8f8f8",
    resize: "none",
    marginLeft: 260,
    marginTop: 80,
  }
}))

function Compilador(props) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <TextareaAutosize
        className={classes.textarea}
        rowsMax={4}
        aria-label="maximum height"
        placeholder="Escribir el código"
        value={props.defecto}
        onChange={props.alCambio}
      />
      <Button className={classes.button} onClick={props.alClic} variant="contained" >
        Comprobar
      </Button>
      <Tabla tokens={props.tokens} />
    </React.Fragment>
  )
}

export default Compilador
