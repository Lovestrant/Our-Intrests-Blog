import React from 'react'
import {CssBaseline,
        AppBar,
        Toolbar,
        Typography,
        makeStyles
 } from '@material-ui/core';
import { Link } from 'react-router-dom';    

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(0),
      display: "flex",
    },
   logo: {
      
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(5),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }));

function Header() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <CssBaseline />
                <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                OurIntrests:
                </Typography>
                <div className={classes.navlinks} class="container">
                    <Link to="/Home" className={classes.link}>
                    Home
                    </Link>
                    <Link to="/myposts" className={classes.link}>
                    myPosts
                    </Link>
        
          </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
