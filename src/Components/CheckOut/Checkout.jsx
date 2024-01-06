import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "./../AuthProvider/AuthProvider";
import useSaller from "./../../Coustom Hook/useSaller";

const Checkout = ({ grandtotal, cartData }) => {
  console.log(cartData);
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [process, setProcess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
          },
        },
      })
      .then((res) => {
        console.log(res.paymentIntent.id);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    if (confirmError) {
      console.log(confirmError);
    }
    setProcess(false);
    console.log("pay", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const data = {
        email: user?.email,
        totalItem: cartData?.length,
        transition: paymentIntent?.id,
        date: new Date(),
        status: "pending",
        items: cartData.map((cartdatas) => ({
          id: cartdatas.menuId,
          quantity: cartdatas.bag,
        })),
      };
      axios
        .post("http://localhost:3000/payment", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/create-payment-intent", { grandtotal })
      .then((res) => {
        setProcess(true);
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!stripe || !clientSecret || !process}
      >
        Pay
      </button>
    </form>
  );
};

export default Checkout;
