import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/messages.css";
import swal from "sweetalert";

export const Message = () => {
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      await actions.getMessages();
      setMessages(JSON.parse(localStorage.getItem("messages")));
      setIsLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <>
      {!isloading ? (
        <div className="w-90 contenedor-mensajes mb-5">
          {messages ? (
            messages.map((message, i) => (
              <div
                className="card card-mensaje text-bg-dark mb-2 w-100"
                key={i}
              >
                <div className="card-header">{message.sender_name}</div>
                <div className="card-body">
                  <h5 className="card-title">{message.sender_email}</h5>
                  <h5 className="card-title text-muted">
                    {message.sender_phone}
                  </h5>
                  <p className="card-text">{message.body}</p>
                </div>
              </div>
            ))
          ) : (
            <div
              className="card text-bg-dark mb-3"
              style={{ maxWidth: "100%" }}
            >
              <div className="card-body">
                <h5 className="card-title">No tienes mensajes aún...</h5>
                <p className="card-text">
                  Quieres darle mayor visibilidad a tu anuncio?
                </p>
                <button
                  onClick={() => {
                    swal(
                      "Publica un anuncio Premium",
                      "Ahora por 29.90 Euros. Solo tienes que ir a la sección Mis Inmuebles y dar click en el enlace de pago del inmueble que quieras visibilizar"
                    );
                  }}
                  className="btn btn-primary"
                >
                  Saber más
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};
