import React from 'react'
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({  
  appBar: {
    width: `calc(100% - 240px)`,
    marginLeft: 240,
    backgroundColor: '#1E1E1E',
  },
  color: {
    color: '#ffffff',
  }
}))

function Navbar() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.color}>
          <Typography variant="h6" noWrap>
            Proyecto Lenguajes Formales y Automatas
                    </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Navbar
