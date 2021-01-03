import React from "react";
import "./Display.css";
const componente = (props) => 
{
    const valor = props.valor || '0';
    return (
        <div className="display">{valor}</div>
    );
};
export default componente;