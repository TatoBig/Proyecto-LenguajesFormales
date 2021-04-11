import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab/';

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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    background: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

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
        <List>
          <ListItem button onClick={props.newArchivo}>
            <ListItemIcon><AddCircleIcon className={classes.icon}/></ListItemIcon>
            <ListItemText primary="Nuevo Archivo"/>
          </ListItem>
          <ListItem button onClick={props.openArchivo}>
            <ListItemIcon><FolderOpenIcon className={classes.icon}/></ListItemIcon>
            <ListItemText primary="Abrir Archivo"/>
          </ListItem>      
          <ListItem button onClick={props.saveArchivo}>
            <ListItemIcon><SaveIcon className={classes.icon} /></ListItemIcon>
            <ListItemText primary="Guardar Tabla"/>
          </ListItem>
          <ListItem button onClick={props.saveTexto}>
            <ListItemIcon><SaveIcon className={classes.icon}/></ListItemIcon>
            <ListItemText primary="Guardar Texto"/>
          </ListItem>   
        </List>
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