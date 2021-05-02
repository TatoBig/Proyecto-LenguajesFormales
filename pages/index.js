import React, { useState, useMemo, useRef, useCallback } from "react"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import Diagrama from "../components/Diagrama"
import { Diccionario } from "../components/Diccionario"
import Footer from "../components/Footer"
import { useForm } from "react-hook-form"
import { makeStyles, Button, Paper, Typography, TextField, Snackbar } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import styles from "../styles/Home.module.css"
import ReactDOM from "react-dom"
import VisReact from "../components/Visreact"
import { AddAlarm } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: `calc(100% - 240px)`,
    marginLeft: 260,
    marginTop: 80
  },
  button: {
    display: "flex",
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
    marginTop: 80
  },
  button: {
    color: "#233044",
    flexShrink: 1,
    marginRight: 5
  },
  paper: {
    margin: theme.spacing(1),
    spacing: 2,
    width: 900,
    height: "100%"
  },
  rooteeer: {
    flexGrow: 1,
    padding: 20,
    margin: theme.spacing(4)
  },
  input: {
    margin: theme.spacing(2)
  },
  rooter: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  form: {
    margin: theme.spacing(2),
  }
}))

export default function Home() {
  //  ---- EXPRESIONES REGULARES ----
  let identificadores = /[a-z]([a-z]|[0-9])*/
  let numeros = /[0-9][0-9]*/

  const classes = useStyles()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [alertMessage, setAlertMessage] = useState({})
  const [objetos, setObjetos] = useState([])
  const [oracion, setOracion] = useState("")
  const [regex, setRegex] = useState("")
  const [tokensState, setTokensState] = useState([])

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  let palabra = "Dibujo"
  let datos = []
  let tokens = []

  const limpiar = () => {
    setObjetos([])
    setOracion("")
    setOpen(true)
  }

  const [open, setOpen] = useState(false)

  const cerrarAlerta = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  const crearArrayOracion = () => {
    let no_linea = 0
    let simbolo = ""
    const lineas = oracion.replace(/\r/g, "").split(/\n/)
    lineas.map((linea) => {
      no_linea += 1
      let palabra = ""
      for (let i = 0; i < linea.length + 1; i++) {
        console.log("CARACTER " + palabra)
        console.log(`CARACTER SIGUIENTE ${linea[i + 1]}`)
        if (linea.charAt(i) !== " ") {
          console.log(linea.charAt(i) !== " ")
          if (esCaracterEspecial(linea.charAt(i)) === true) {
            console.log(`Analizando palabra: ${palabra}`)
            analizar(palabra, no_linea)
            if (
              linea.charAt(i) === "<" ||
              linea.charAt(i) === ">" ||
              linea.charAt(i) === "="
            ) {
              if (linea.charAt(i + 1) === "=") {
                simbolo = linea.charAt(i) + linea.charAt(i + 1)
                analizarSimbolo(simbolo, no_linea)
                simbolo = ""
                i++
              } else {
                analizarSimbolo(linea.charAt(i), no_linea)
              }
            } else {
              analizarSimbolo(linea.charAt(i), no_linea)
            }
            console.log(`Caracter: ${linea.charAt(i)}`)
            palabra = ""
          } else if (linea[i] === undefined) {
            console.log(`Analizando palabra: ${palabra}`)
            analizar(palabra, no_linea)
            palabra = ""
          } else {
            console.log("Continua")
            palabra = palabra + linea.charAt(i)
          }
        } else {
          console.log(`Analizando palabra: ${palabra}`)
          analizar(palabra, no_linea)
          palabra = ""
        }
      }
      setObjetos(datos)
    })
  }

  const esCaracterEspecial = (caracter) => {
    for (let i = 0; i < Diccionario.length; i++) {
      if (caracter === Diccionario[i].valor) {
        console.log(`Caracter especial detectado: ${Diccionario[i].valor}`)
        return true
      }
    }
  }
  const analizarSimbolo = (caracter, no_linea) => {
    for (let i = 0; i < Diccionario.length; i++) {
      if (caracter === Diccionario[i].valor) {
        const token = {
          valor: Diccionario[i].valor,
          tipo: Diccionario[i].tipo,
          estado: "Válido",
          linea: no_linea
        }
        datos.push(token)
        console.log(`Caracter especial detectado: ${Diccionario[i].valor}`)
        return true
      }
    }
  };
  const analizar = (palabra, no_linea) => {
    palabra = palabra.trim();
    palabra = palabra.toLowerCase();
    for (let i = 0; i < Diccionario.length; i++) {
      //Si la palabra es palabra reservada
      if (palabra === Diccionario[i].valor) {
        const token = {
          valor: Diccionario[i].valor,
          tipo: Diccionario[i].tipo,
          estado: "Válido",
          linea: no_linea
        };
        console.log(`Palabra reservada correctamente guardada`);
        datos.push(token);
        palabra = "";
        return true;
      }
    }
    if (palabra !== "") {
      console.log(`Saber que será esta palabra uste: ${palabra}`);
      const resultadoId = identificadores.exec(palabra);
      const resultadoNum = numeros.exec(palabra);
      try {
        if (resultadoId !== null) {
          if (resultadoId[0] === palabra) {
            console.log(`Palabra valida`);
            const token = {
              valor: palabra,
              tipo: "Identificador",
              estado: "Válido",
              linea: no_linea
            };
            datos.push(token);
            palabra = "";
            return true;
          }
        } else if (resultadoNum !== null) {
          if (resultadoNum[0] === palabra) {
            console.log(`Palabra numeros`);
            const token = {
              valor: palabra,
              tipo: "Número",
              estado: "Válido",
              linea: no_linea
            };
            datos.push(token);
            palabra = "";
            return true;
          }
        }
      } catch (e) { }
    }
    if (palabra !== "") {
      const token = {
        valor: palabra,
        tipo: "Error",
        estado: "Inválidado",
        linea: no_linea
      };
      datos.push(token);
      console.log("Palabra invalida");
      palabra = "";
      return true;
    }
  };

  const openText = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0]

      var reader = new FileReader()
      reader.readAsText(file)

      reader.onload = (readerEvent) => {
        var content = readerEvent.target.result
        limpiar()
        setOracion(content)
        setOpen(true)
      }
    }
    input.click()
  }

  function Recopilacion() {
    let recopilador = "Palabra----Tipo----Estado----Linea\n"
    for (let cont = 0; cont < objetos.length; cont++) {
      recopilador =
        recopilador +
        objetos[cont].valor +
        "----" +
        objetos[cont].tipo +
        "----" +
        objetos[cont].estado +
        "----" +
        objetos[cont].linea +
        "\n"
    }
    return recopilador
  }

  function saveTabla() {
    var contenidoEnBlob = new Blob([Recopilacion()], { type: "text/plain" })
    var lector = new FileReader()

    lector.onload = function (event) {
      var guardar = document.createElement("a")
      guardar.href = event.target.result
      guardar.target = "_blank"
      guardar.download = "tabla.txt" || "tabla.dat"
      var clicEvent = new MouseEvent("click", {
        bubbles: false,
        cancelable: true
      })

      guardar.dispatchEvent(clicEvent)
    }

    lector.readAsDataURL(contenidoEnBlob)
    setOpen(true)
  }

  function saveTexto() {
    var contenidoEnBlob = new Blob([oracion], { type: "text/plain" })
    var lector = new FileReader()

    lector.onload = function (event) {
      var guardar = document.createElement("a")
      guardar.href = event.target.result
      guardar.target = "_blank"
      guardar.download = "texto.txt" || "texto.dat"
      var clicEvent = new MouseEvent("click", {
        bubbles: false,
        cancelable: true
      })

      guardar.dispatchEvent(clicEvent)
    }

    lector.readAsDataURL(contenidoEnBlob)
    setOpen(true)
  }

  const handleChange = (e) => {
    setOracion(e.target.value)
    console.log(oracion)
    console.log({
      value: e.target.value
    })
  }

  const handleOnClick = (e) => {
    crearArrayOracion()
  }

  const onSubmit = (data) => {    
    if (data.example !== undefined && data.example.length !== 0) {
      try {
        setRegex(data.regex)
        const expresion = new RegExp(data.regex)
        const result = expresion.exec(data.example)
        if (result !== null) {
          if (result[0] === data.example) {
            setAlertMessage({
              severity: 'success',
              message: `La palabra ingresada es válida`
            })
            setOpenSnackBar(true)
          } else {
            setAlertMessage({
              severity: 'error',
              message: `La palabra ingresada es inválida`
            })
            setOpenSnackBar(true)
          }
        } else {
          setAlertMessage({
            severity: 'error',
            message: `La palabra ingresada es inválida`
          })
          setOpenSnackBar(true)
        }
        separarCadena(data.regex)
      } catch (e) {
        console.log(e)
        console.log("La expresión regular que ingresó es inválida")
      }
    }else {
      separarCadena(data.regex)
    }
  }

  const separarCadena = (regex) => {
    let parentesis = ''
    let token = ''
    for (let i = 0; i < regex.length; i++) {
      if (regex[i] === '(') {
        tokens.push(token)
        token = ''
        for (let j = i + 1; j < regex.length; j++) {
          if (regex[j] === ')') {
            if (regex[j + 1] === '*') {
              tokens.push(`(${parentesis})*`)
              i += 2
              parentesis = ''
              break;
            } else {
              tokens.push(`(${parentesis})`)
              parentesis = ''
              i++
              break;
            }

          } else {
            parentesis = parentesis + regex[j]
            i++
          }
        }
      } else {
        token = token + regex[i]
      }
    }
    tokens.push(token)
    setTokensState(tokens)
  }

  return (
    <React.Fragment>
      <Navbar />
      <SideBar
        newArchivo={limpiar}
        openArchivo={openText}
        saveArchivo={saveTabla}
        saveTexto={saveTexto}
        open={open}
        cerrarAlerta={cerrarAlerta}
      />
      {/* */}
      <div className={styles.container}>
        <div className={classes.paper}>
          <Paper elevation={3} className={classes.rooteeer}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <TextField
                id="regex"
                label="Expresión regular"
                {...register("regex")}
                className={classes.form}
              />
              <TextField
                id="example"
                label="Ejemplo"
                {...register("example")}
                className={classes.form}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Visualizar
              </Button>
            </form>
          </Paper>
          <Paper elevation={3} className={classes.rooteeer}>
            <div className="vis-react">
              <VisReact
                tokensState={tokensState}
              />
            </div>
            <Diagrama enviado={"palabra"} regex={regex} />
          </Paper>
        </div>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity={alertMessage.severity} elevation={6} variant="filled">
          {alertMessage.message}
        </Alert>
      </Snackbar>
      <Footer />
      {/* */}
    </React.Fragment>
  )
}
