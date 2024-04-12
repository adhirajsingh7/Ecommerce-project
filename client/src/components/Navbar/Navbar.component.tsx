import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";

const NavbarComponent = (props: any) => {
  const { userCart } = props;

  let total_quantity = 0;
  userCart[0].products.forEach(
    (product: any) => (total_quantity += product.quantity)
  );
  // console.log(total_quantity);

  const navigate = useNavigate();
  const handleHomeNavigation = () => {
    navigate("/");
  };
  const handleCartNavigation = () => {
    navigate("/cart");
  };
  const handleSettingsNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#000000" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
              onClick={handleHomeNavigation}
            >
              Ecommerce
            </Typography>
            <IconButton onClick={handleCartNavigation}>
              <Badge color="secondary" badgeContent={total_quantity} max={10}>
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleSettingsNavigation}>
              <SettingsIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavbarComponent;
