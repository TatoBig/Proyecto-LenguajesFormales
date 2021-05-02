import React from 'react'
import { Typography, Box, Container } from '@material-ui/core'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Programa desarrollado por Santiago Navas, Luis Damián y Paolo Veliz @ 2021'}
    </Typography>
  )
}

const Footer = () => {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box mt={80}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Footer
