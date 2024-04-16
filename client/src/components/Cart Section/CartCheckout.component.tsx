import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutModalComponent from "./CheckoutModal.component";

const CartCheckoutComponent = (props: any) => {
  const { products, _id: cart_id } = props;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let total_amount = 0;
    products.map((product) => (total_amount += product.total_price));
    setAmount(total_amount);
  }, [products]);

  return (
    <Stack
      direction="column"
      gap={4}
      sx={{ p: 4, maxHeight: "300px" }}
      component={Paper}
    >
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="body1">Total Amount - <span style={{fontWeight: 600}}>${amount}</span></Typography>
      <CheckoutModalComponent amount={amount} cartId={cart_id} />
    </Stack>
  );
};

export default CartCheckoutComponent;
