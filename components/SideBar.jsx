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
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary="Nuevo Archivo"/>
          </ListItem>
          <ListItem button onClick={props.openArchivo}>
            <ListItemIcon><FolderOpenIcon /></ListItemIcon>
            <ListItemText primary="Abrir Archivo"/>
          </ListItem>      
          <ListItem button onClick={props.saveArchivo}>
            <ListItemIcon><SaveIcon /></ListItemIcon>
            <ListItemText primary="Guardar Archivo"/>
          </ListItem>   
        </List>
        <Divider />        
      </Drawer>      
    </div>
  );
}