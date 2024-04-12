import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SellIcon from "@mui/icons-material/Sell";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./DashboardSidebar.styles.scss";

const DashboardSidebar = () => {
  const dashboard_sidebar_options = [
    { label: "Profile", slug: "profile", icon: PersonIcon },
    { label: "Addresses", slug: "addresses", icon: HomeIcon },
    { label: "View Orders", slug: "view-orders", icon: ShoppingBagIcon },
    { label: "Sell Products", slug: "sell-products", icon: SellIcon },
    { label: "View Merchants", slug: "merchants", icon: StorefrontIcon },
  ];

  return (
    <>
      <Stack direction="column" sx={{ width: 1 / 5 }}>
        <Typography variant="h5">Settings</Typography>
        <List>
          {dashboard_sidebar_options.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`${item.slug}`}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  replace
                  children={({ isActive }) => {
                    return (
                      <>
                        <ListItem
                          disablePadding
                          className={isActive ? "active" : "inactive"}
                          sx={{ color: "black" }}
                        >
                          <ListItemButton>
                            <ListItemIcon>{<item.icon />}</ListItemIcon>
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </ListItem>
                      </>
                    );
                  }}
                ></NavLink>
              </React.Fragment>
            );
          })}
        </List>
      </Stack>
      <Divider orientation="vertical" />
    </>
  );
};

export default DashboardSidebar;
