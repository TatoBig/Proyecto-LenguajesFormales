import React from 'react'
import { Typography, Link, Box, Container} from '@material-ui/core'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Programa desarrollado por Santiago Navas y Luis Damián @ 2021'}        
      </Typography>
    );
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
