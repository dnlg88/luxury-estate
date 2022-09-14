import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";

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
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "70vw" }}
        >
          <div
            style={{
              background: "lightgreen",
              height: "80%",
              width: "100%",
              overflowX: "auto",
              overflowY: "auto",
              textAlign: "center",
            }}
          >
            {messages ? (
              messages.map((message, i) => (
                <div
                  className="card text-bg-dark mb-3"
                  style={{ maxWidth: "100%" }}
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
                  <a href="#" className="btn btn-primary">
                    Saber más
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "100vw" }}
        >
          <h5>Loading...</h5>
        </div>
      )}
    </>
  );
};