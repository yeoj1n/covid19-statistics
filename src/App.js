import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.getCountryData = this.getCountryData.bind(this);
  }
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: [],
    selectCountryData : null
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const resApi = await axios.get("https://covid19.mathdro.id/api");
    const resCountries = await axios.get("https://covid19.mathdro.id/api/countries")
    // countries 대신 index만 보여서 배열에 넣어서 처리
    const countries = [];
    for(let i=0; i<resCountries.data.countries.length; i++)
      countries.push(resCountries.data.countries[i].name);

    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      countries
    });
  };

  renderCountryOptions() {
    return this.state.countries.map((country,idx) => {
      return <option key={idx}>
        {country}
      </option>
    });
  }

  async getCountryData(e) {
    const country = e.target.value;
    const countryApi = await axios.get("https://covid19.mathdro.id/api/countries" + "/" + country)

    this.setState({
      selectCountryData : {
        confirmed: countryApi.data.confirmed.value,
        recovered: countryApi.data.recovered.value,
        deaths: countryApi.data.deaths.value
      }
    })
  };
  render() {
    const { confirmed, recovered, deaths, selectCountryData  } = this.state;
    const { getCountryData } = this;

    return (
      <div className="container">
        <h1>Crona19 Statistics</h1>

        <h2> All Countries </h2>
        <div className="flex">
          <div className="box confirmed">
            <h3>Confirmed case</h3>
            <h4>{confirmed}</h4>
          </div>

          <div className="box recovered">
            <h3>Recovered case</h3>
            <h4>{recovered}</h4>
          </div>

          <div className="box deaths">
            <h3>Deaths case</h3>
            <h4>{deaths}</h4>
          </div>
        </div>

      {/*
        <h2> Select Country </h2>
        <select onChange={getCountryData}>
          {this.renderCountryOptions()}
        </select>
      
         {selectCountryData &&
        (
          <div className="flex">
          <div className="box confirmed">
            <h3>Confirmed case</h3>
            <h4>{confirmed}</h4>
          </div>

          <div className="box recovered">
            <h3>Recovered case</h3>
            <h4>{recovered}</h4>
          </div>

          <div className="box deaths">
            <h3>Deaths case</h3>
            <h4>{deaths}</h4>
          </div>
        </div>
        )} */}
      </div>
    )
  }
}

export default App;