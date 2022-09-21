import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Properties = () => {
  const { store, actions } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      await actions.getUserProperties();
      setProperties(JSON.parse(localStorage.getItem("userProperties")));
      setIsLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <div className="w-90 mb-5">
      {!isloading ? (
        <div className="contenedor-propiedades">
          {properties ? (
            properties.map((property, i) => (
              <div className="card-propiedad card text-bg-dark mb-3" key={i}>
                <div className="card-header">
                  {/* <div className="col-3">
                      {`Anuncio ${
                        property.premium == true ? "Premium" : "Gratuito"
                      }`}
                    </div> */}

                  <div className="">
                    <h3>{property.comunidad}</h3>
                    {property.direccion}
                  </div>

                  {/* <div className="col-3">
                      {property.premium == false ? (
                        <button className="btn btn-success">
                          Cambiar a Premium
                        </button>
                      ) : (
                        ""
                      )}
                    </div> */}
                </div>

                <div className="card-body">
                  <img
                    src={property.fotos[0]}
                    className="img-thumbnail rounded float-start"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div className="d-flex justify-content-evenly">
                    <h5 className="card-title">{property.tipo_operacion}</h5>
                    <h5 className="card-title">{property.tipo_vivienda}</h5>
                    <h5 className="card-title">{property.habitaciones} hab.</h5>
                    <h5 className="card-title ">{property.baños} baños</h5>
                  </div>
                  <div className="d-flex justify-content-center">
                    <h5 className="text-muted">
                      <br /> {property.descripcion}
                    </h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No hay propiedades</div>
          )}
        </div>
      ) : (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};
