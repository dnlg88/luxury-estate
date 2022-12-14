import React, { useContext } from "react";
import useInput from "./useInput";
import "../../styles/addressInput.css";
import { Context } from "../store/appContext";

export const AddressInput = () => {
  const address = useInput("");
  const { store, actions } = useContext(Context);
  return (
    <>
      <input
        placeholder="Escribe la dirección"
        className="form-control"
        {...address}
      />

      {address.suggestions?.length > 0 && (
        <div className="suggestion-box">
          {address.suggestions.map((suggestion, index) => {
            return (
              <div
                className="suggestion"
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name);
                  localStorage.setItem("pub_longitude", suggestion.center[0]);
                  localStorage.setItem("pub_latitude", suggestion.center[1]);
                  localStorage.setItem("pub_direccion", suggestion.place_name);
                  address.setSuggestions([]);
                  actions.updatePublicarDireccion();
                }}
              >
                {suggestion.place_name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// const Wrapper = styled.div`
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//   margin: 0 auto;
// `;

// const Input = styled.input`
//   width: 400px;
//   background: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 30px;
//   position: relative;
//   display: grid;
//   justify-self: center;
//   &:focus {
//     outline: none;
//     border-radius: ${(props) => props.isTyping && "10px 10px 0px 0px"};
//   }
// `;
