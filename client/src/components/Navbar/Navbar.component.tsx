import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Stack, Tooltip } from "@mui/material";
import shoppingIcon from "../../assets/icons/shopping-icon.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/store";

export const NavbarComponent = (props: any) => {
  const { userCart } = props;
  const [quantity, setQuantity] = useState(0);
  const user = useUserStore((state) => state.user);
  // console.log(user);
  console.log(userCart);
  useEffect(() => {
    let total_quantity = 0;
    userCart.products.forEach(
      (product: any) => (total_quantity += product.quantity)
    );
    setQuantity(total_quantity);
  }, [userCart]);

  const handleLogOut = async () => {
    try {
      const res = await axios.post("/logout");
      console.log(res);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
  const handleProfileNavigation = () => {
    navigate("/dashboard/account");
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
              sx={{
                flexGrow: 1,
                "&:hover": { cursor: "pointer" },
              }}
              onClick={handleHomeNavigation}
            >
              Ecommerce
            </Typography>
            <Stack direction="row" gap={2}>
              <Tooltip title="Products">
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleProductsNavigation()}
                >
                  View products
                </Button>
              </Tooltip>
              <Tooltip title="Cart">
                <IconButton onClick={handleCartNavigation}>
                  <Badge color="secondary" badgeContent={quantity} max={10}>
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton onClick={handleSettingsNavigation}>
                  <SettingsIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              {user && (
                <Tooltip title={user?.full_name}>
                  <Avatar
                    alt={user?.full_name}
                    src={user?.avatar}
                    onClick={handleProfileNavigation}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  />
                </Tooltip>
              )}
              <Button variant="contained" onClick={handleLogOut}>
                Log out
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
