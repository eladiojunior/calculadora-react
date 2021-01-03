import React, { Component } from "react";
import "./Calculadora.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    indexValue: 0
}
export default class Caluladora extends Component
{
    state = {...initialState};
    constructor(props) {
        super(props);
        this.limparCalculo = this.limparCalculo.bind(this);
        this.setOperacao = this.setOperacao.bind(this);
        this.adicionarValor = this.adicionarValor.bind(this);
    }

    limparCalculo() {
        this.setState({...initialState});
    }
    setOperacao(operacao) {

        if (this.state.indexValue === 0) {
            this.setState({ operation: operacao, indexValue: 1, clearDisplay: true })
        } else {
            const isEqual = operacao === '=';
            const operacaoCorrente = this.state.operation;
            const valores = [...this.state.values];
            try {
                switch (operacaoCorrente) {
                case '/':
                    valores[0] = valores[0] / valores[1];
                    break;
                case '+':
                    valores[0] = valores[0] + valores[1];
                    break;
                case '-':
                    valores[0] = valores[0] - valores[1];
                    break;
                case '*':
                    valores[0] = valores[0] * valores[1];
                    break;
                default:
                    valores[0] = this.state.values[0];
                    break;
                }
                //Ajustado o EVAL
                //valores[0] = eval(`${valores[0]} ${operacaoCorrente} ${valores[1]}`);
            } catch(e) {
                valores[0] = this.state.values[0];
            }
            valores[1] = 0;
            this.setState({
                displayValue: valores[0],
                operation: isEqual ? null : operacao,
                indexValue: isEqual ? 0 : 1,
                clearDisplay: !isEqual,
                values: valores
            })
        }

    }
    adicionarValor(valor) {
        
        //Evitar dois pontos.
        if (valor === '.' && this.state.displayValue.includes('.')) {
            return;
        }
        
        const limparDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const valorCorrente = limparDisplay ? '' : this.state.displayValue;
        const novoValor = valorCorrente + valor;
        this.setState({displayValue: novoValor, clearDisplay: false });

        if (valor !== ".") {
            const idx = this.state.indexValue;
            const floatValor = parseFloat(novoValor);
            const valores = [...this.state.values];
            valores[idx] = floatValor;
            this.setState({ values: valores });
        }

    }

    render() {
        return (
            <div className="calculadora">
                <Display valor={this.state.displayValue}/>
                <Button label="AC" span={3} click={this.limparCalculo}/>
                <Button label="/" operation={true} click={this.setOperacao}/>
                <Button label="7" click={this.adicionarValor}/>
                <Button label="8" click={this.adicionarValor}/>
                <Button label="9" click={this.adicionarValor}/>
                <Button label="*" operation={true} click={this.setOperacao}/>
                <Button label="4" click={this.adicionarValor}/>
                <Button label="5" click={this.adicionarValor}/>
                <Button label="6" click={this.adicionarValor}/>
                <Button label="-" operation={true} click={this.setOperacao}/>
                <Button label="1" click={this.adicionarValor}/>
                <Button label="2" click={this.adicionarValor}/>
                <Button label="3" click={this.adicionarValor}/>
                <Button label="+" operation={true} click={this.setOperacao}/>
                <Button label="0" span={2} click={this.adicionarValor}/>
                <Button label="." click={this.adicionarValor}/>
                <Button label="=" operation={true} click={this.setOperacao}/>
            </div>
        );
    };
};