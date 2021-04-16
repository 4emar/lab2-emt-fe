import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import {NavLink} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const ResponsiveDrawer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        EMT Lab2
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {['Books', 'Categories'].map((text) => (
                        <NavLink to={`/${text.toLowerCase()}`}
                                 key={text}
                                 activeStyle={{backgroundColor: "#dddddd"}}>
                            <ListItem button>
                                <ListItemIcon>{text === "Books" ? <LocalLibraryOutlinedIcon/> :
                                    <CategoryOutlinedIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar}/>

            </main>
        </div>
    );
};

export default ResponsiveDrawer;