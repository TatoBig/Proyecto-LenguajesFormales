import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/'

const useStyles = makeStyles({
  table: {
    marginTop: 20,
    width: 1200,
    marginLeft: 260,
  },
})

function Tabla(props) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Palabra</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Linea</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tokens.map((token) => (
            <TableRow key={token.id}>
              <TableCell component="th" scope="row">
                {token.valor}
              </TableCell>
              <TableCell align="right">{token.tipo}</TableCell>
              <TableCell align="right">{token.estado}</TableCell>
              <TableCell align="right">{token.linea}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Tabla