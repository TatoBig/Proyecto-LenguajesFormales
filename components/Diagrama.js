import React from 'react'
import Typography from '@material-ui/core/Typography'

const Diagrama = (props) => {
    return (
        <React.Fragment>
            <Typography variant="h4" color="initial">
                {props.regex}
            </Typography>
        </React.Fragment>
    )
}

export default Diagrama
