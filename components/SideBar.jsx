import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Snackbar } from '@material-ui/core/'
import { Save, AddCircle, FolderOpen } from '@material-ui/icons/'
import { Alert } from '@material-ui/lab/'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    background: "#36393f",
    color: "#C6C6C5"
  },
  icon: {
    color: "#868C96",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    background: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />        
        <Divider />
      </Drawer>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={props.cerrarAlerta}>
        <Alert onClose={props.cerrarAlerta} severity="success" elevation={6} variant="filled" >
          Acción exitosa
        </Alert>
      </Snackbar>
    </div>
  );
}