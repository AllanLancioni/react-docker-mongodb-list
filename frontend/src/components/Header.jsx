import { Button, AppBar, Toolbar, makeStyles, IconButton, Hidden, Typography, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 300
  },
  menuLg: {
    flexGrow: 1,
    textAlign: 'right'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function Header() {

  const classes = useStyles();
  const history = useHistory();
  const [openedMenu, setOpenedMenu] = useState(false);

  const toggleDrawer = isOpen => ev => {
    if (ev.type === 'keydown' && (ev.key === 'Tab' || ev.key === 'Shift'))
      return;
    setOpenedMenu(isOpen);
  };

  const navigate = item => _ => history.push(item.link);

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Clientes', link: '/clients' },
    { label: 'Adicionar Cliente', link: '/clients/new' },
  ];

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp={true}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(!openedMenu)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={openedMenu} onClose={toggleDrawer(false)}>
              <div className={clsx(classes.list)} role="presentation"
                onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
                <List>
                  {
                    menuItems.map((item, index) => (
                      <ListItem button onClick={ navigate(item) } key={item.label} >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))
                  }
                </List>
              </div>
            </Drawer>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Hidden smDown={true}>
            <div className={classes.menuLg}>
              {menuItems.map(item => <Button key={item.link} color="inherit" onClick={ navigate(item) }>{item.label}</Button>)
              }
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}