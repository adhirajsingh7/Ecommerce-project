import { useUserStore } from "@/store/store";
import React from "react";

const MerchantsPage = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return <div>MerchantsPage</div>;
};

export default MerchantsPage;
