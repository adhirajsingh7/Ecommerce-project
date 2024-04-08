import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CartCheckoutComponent = (props: any) => {
  const { products, _id: cart_id } = props;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let total_amount = 0;
    products.map((product) => (total_amount += product.total_price));
    setAmount(total_amount);
  }, [products]);

  return (
    <Stack direction="column" gap={4} sx={{ p: 4 }} component={Paper}>
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="body1">Total Amount - {amount}</Typography>
      <Button variant="contained">Checkout</Button>
    </Stack>
  );
};

export default CartCheckoutComponent;
