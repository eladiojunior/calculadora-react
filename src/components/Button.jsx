import React from "react";
import "./Button.css";
const componente = (props) => 
{
    const label = props.label || '?';
    const isOperation = props.operation || false;
    const span = props.span || 0;
    let classes = 'button';
    classes += (isOperation ? ' operation' : '');
    classes += (span===2 ? ' double' : '');
    classes += (span===3 ? ' triple' : '');
    return (
        <button onClick={event => props.click && props.click(label)} className={classes}>{label}</button>
    );
};
export default componente;