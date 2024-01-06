import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import Checkout from "../CheckOut/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import useCartData from "../../Coustom Hook/useCartData";

const Payment = () => {
  const [cartData, cartLoading, refetch] = useCartData();
  if (cartLoading) {
    return <>loading...</>;
  }
  const grandtotal = cartData
    .reduce((acc, cartData) => acc + cartData.priceperquentity, 0)
    .toFixed(2);
  const stripeKey = loadStripe(
    "pk_test_51NHhJ1CXFqVc1y5FqKlALuvyhYHdxO9Sv4dt0kI2lwejHcTf15vTzsJxJwhWq8fSGXuo3cLC2uEFPwVCh9JwKy1Z00a6sMsYly",
  );

  return (
    <Elements stripe={stripeKey}>
      <Checkout grandtotal={grandtotal} cartData={cartData} />
    </Elements>
  );
};

export default Payment;
