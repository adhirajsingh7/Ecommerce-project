import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Stack } from "@mui/material";
import shoppingIcon from "../../assets/icons/shopping-icon.svg";

export const NavbarComponent = (props: any) => {
  const { userCart } = props;

  let total_quantity = 0;
  userCart[0]?.products.forEach(
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
  const handleProductsNavigation = () => {
    navigate("/products");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#000000" }}>
          <Toolbar>
            <img
              src={shoppingIcon}
              alt=""
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
              onClick={handleHomeNavigation}
            >
              Ecommerce
            </Typography>
            <Stack direction="row" gap={2}>
              <Button
                sx={{ color: "white" }}
                onClick={() => handleProductsNavigation()}
              >
                View products
              </Button>
              <IconButton onClick={handleCartNavigation}>
                <Badge color="secondary" badgeContent={total_quantity} max={10}>
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleSettingsNavigation}>
                <SettingsIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
