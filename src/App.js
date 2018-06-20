import React, { Component } from 'react';
import './App.css';
//For API requests
import axios from 'axios';
import {LineChart} from 'react-easy-chart';
import Selector from './Selector';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sequence :  [
        {selector:
      <Selector onChangeCallback={this.handleCurrency}
     values={["USD", "EUR", "RUB"]}/>,
    convertor: this.btcToUsd}
    ,
    {selector:

      <Selector onChangeCallback={this.handleSelectCrypto}
       values={["BTC", "ETH", "IOT"]}/>,
       convertor: this.moneyToCrypto}
     ],
      cryptos: [],
      currency:"USD",
    quantity:1,
    selectedCrypto:"BTC",
      histogram:[],
      chartData:[]
    };
    setInterval(()=> {
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD,EUR,RUB')
      .then(res => this.setState({cryptos: res.data}))
    },
      5000
    )

    this.handleCurrency = this.handleCurrency.bind(this);
    this.handlePeriod = this.handlePeriod.bind(this);
  }
  convert= (unix_timestamp, period) => new Date(unix_timestamp);
  handleExchange = (e) =>
    this.setState({sequence:[this.state.sequence[1], this.state.sequence[0]]})
  handleQuantity = (e) =>  this.setState({quantity: e.target.value});
  handleSelectCrypto = (e) =>  this.setState({selectedCrypto: e.target.value});
  handleCurrency = (e) => this.setState({currency:  e.target.value});

  btcToUsd = () =>
    this.state.cryptos[this.state.selectedCrypto][this.state.currency];
  moneyToCrypto = () =>
    1/this.state.cryptos[this.state.selectedCrypto][this.state.currency];

  handlePeriod = (e) => {
    const period = e.target.value
    axios
    .get('https://min-api.cryptocompare.com/data/' + period +'?fsym=BTC&tsym=' + this.state.currency)
    .then(res=>
      this.setState({
        histogram: res.data.Data,
        chartData: Object.values(res.data.Data)
        .map((val) => ({x: this.convert(val.time), y:val.high}))
      }))
    }

  render() {
    return Object.keys(this.state.cryptos).length?(
      <div className="App">

        <div id="selection">
        <h3>Auto:USD, 5 sec refresh time </h3>
        <select onChange={this.handleCurrency}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
        </div>

        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right">{this.state.cryptos[key][this.state.currency]}</span>
          </div>
        ))}
        <div id="convertor">
          <h3>currency convertor</h3>
          <div className="inputCount">
            <input className="count" e={this.state.quantity}
            onChange={this.handleQuantity}/>
            <button onClick={this.handleExchange}>change side</button>
            </div>

          <div className="cardLeft">
            {this.state.sequence[0].selector}
            <p>{this.state.quantity}</p>
          </div>


          <div className="cardRight">
            {this.state.sequence[1].selector}
            <p>{this.state.quantity*this.state.sequence[1].convertor()}</p>
          </div>
          </div>
        <div id="periodChart">
          <h3>Choose a period</h3>
          <select onChange={this.handlePeriod}>
            <option value="">select period</option>
            <option value="histominute">minute</option>
            <option value="histohour">hour</option>
            <option value="histoday">day</option>
          </select>
        </div>
        <div id="charts">
          <LineChart
          axes
            margin={{top: 10, right: 10, bottom: 50, left: 50}}
            axisLabels={{x: this.state.currency, y: 'My y Axis'}}
            width={600}
            height={300}
            data = {[this.state.chartData]}
          />
        </div>

            </div>
    ) :null ;
}
}
export default App;
