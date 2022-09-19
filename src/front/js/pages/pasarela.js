import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../component/user/checkoutForm";
import casa from "../../img/casa-lujo-playa_98.webp";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(
  "pk_test_51Lj2kEBX1sQatE26tEVFI3KL7NotboffCWXx7hIwZNedSfrNrl5k5z4RrTyuSAa8aNtzZMNqMijmyE35fIbjnAyd00uBdyzFFI"
);

export const Pasarela = () => {
  return (
    <div
      className="contenedor-foto container justify-content-center pb-4"
      style={{ backgroundImage: `url(${casa})` }}
    >
      <div className="container pb-4 ">
        <h2 className="fw-bolder text-white">
          Estás en un ambiente seguro y relajado...
        </h2>
      </div>
      <div className="contenedor-pasarela container-fluid d-flex justify-content-center">
        <div className="container col-6 p-4">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};
