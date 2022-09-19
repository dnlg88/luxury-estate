import React from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Actions } from "@cloudinary/transformation-builder-sdk";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault(); // previene que el submit refresque la pagina por default, sino que se podra ejecutar el codigo siguiente
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod; // id no es una variable, es una propiedad de objeto importada, por lo que tiene key y value
      await axios
        .post(process.env.BACKEND_URL + "/api/checkout", {
          id, // no requiere darle un value porque id ya tiene key y value pues es una propiedad de paymentMethod (por destructuracion)
          amount: 2990,
        })
        .then((resp) => {
          if (resp.status == 200) {
            console.log(resp);
            localStorage.setItem("pub_premium", true);
            // actions.updatePayment;
          } else {
            console.log("The payment has failed, error: " + resp.status);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body p-4">
      <div className="text-start pb-4">
        <h6>{"Sucripción Luxury Estate Premium:"}</h6>
        <h4>{" 29.90 Euros"}</h4>
        <h6>{"Validez: 30 días"}</h6>
      </div>
      <CardElement />
      <div className="text-center">
        <button className="btn btn-primary btn-sm mt-3">Confirmar Pago</button>
      </div>
    </form>
  );
};
