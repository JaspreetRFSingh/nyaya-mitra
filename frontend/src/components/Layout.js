import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Gavel,
  Description,
  QuestionAnswer,
  AccountBalance,
  Dashboard,
  Person,
  Login,
  PersonAdd,
  Menu as MenuIcon,
  Logout,
  Folder,
  Event,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout, isAuthenticated, isLawyer } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/lawyers', label: 'Find Lawyers', icon: <Gavel /> },
    { path: '/faqs', label: 'Legal FAQs', icon: <QuestionAnswer /> },
    { path: '/courts', label: 'Courts', icon: <AccountBalance /> },
    { path: '/legal-aid', label: 'Legal Aid', icon: <Description /> },
  ];

  const authLinks = isAuthenticated
    ? [
        { path: '/dashboard', label: 'Dashboard', icon: <Dashboard /> },
        { path: '/consultations', label: 'Consultations', icon: <Event /> },
        { path: '/documents', label: 'Documents', icon: <Folder /> },
        { path: '/cases', label: 'My Cases', icon: <Gavel /> },
        { path: '/profile', label: 'Profile', icon: <Person /> },
      ]
    : [
        { path: '/login', label: 'Login', icon: <Login /> },
        { path: '/register', label: 'Register', icon: <PersonAdd /> },
      ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ⚖️ NyayaMitra
        </Typography>
      </Toolbar>
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.path} component={Link} to={item.path} onClick={handleDrawerToggle}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {authLinks.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            onClick={item.label === 'Logout' ? handleLogout : handleDrawerToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {isLawyer && (
          <ListItem button component={Link} to="/dashboard/lawyer">
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Lawyer Dashboard" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              ⚖️ NyayaMitra
            </Typography>
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                {navLinks.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{ mx: 1 }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={Link} to="/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    <Logout sx={{ mr: 1, fontSize: 18 }} /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button variant="contained" color="secondary" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', py: 3, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                NyayaMitra
              </Typography>
              <Typography variant="body2">
                Your Legal Friend - Making Justice Accessible
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Link to="/faqs" style={{ color: 'white', textDecoration: 'none' }}>Legal FAQs</Link>
                <Link to="/courts" style={{ color: 'white', textDecoration: 'none' }}>Court Directory</Link>
                <Link to="/legal-aid" style={{ color: 'white', textDecoration: 'none' }}>Legal Aid</Link>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">Email: support@nyayamitra.in</Typography>
              <Typography variant="body2">Phone: 1800-123-4567</Typography>
            </Box>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            © 2022 NyayaMitra. All rights reserved. | Disclaimer: This platform provides legal information but does not substitute professional legal advice.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
