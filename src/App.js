import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    gloabl: {
      confirmed: 0,
      recovered: 0,
      deaths: 0
    },
    countries: [],
    selectedCountry: null
  };

  getGlobalData = async () => {
    const res = await axios.get("https://covid19.mathdro.id/api");
    this.setState({
      ...this.state,
      gloabl: {
        confirmed: res.data.confirmed.value,
        recovered: res.data.recovered.value,
        deaths: res.data.deaths.value
      }
    });
  };

  getCountries = async () => {
    const resCountries = await axios.get(
      "https://covid19.mathdro.id/api/countries"
    );
    const countries = [];
    for (let i = 0; i < resCountries.data.countries.length; i++)
      countries.push(resCountries.data.countries[i].name);

    this.setState({
      ...this.state,
      countries
    });
  };

  componentDidMount() {
    this.getGlobalData();
    this.getCountries();
  }

  handleCountryData = async e => {
    if (e.target.value === "default") {
      this.setState({
        ...this.state,
        selectedCountry: null
      });
      return;
    }
    const country = e.target.value;
    const countryData = await axios.get(
      "https://covid19.mathdro.id/api/countries" + "/" + country
    );

    this.setState({
      ...this.state,
      selectedCountry: {
        confirmed: countryData.data.confirmed.value,
        recovered: countryData.data.recovered.value,
        deaths: countryData.data.deaths.value
      }
    });
  };

  render() {
    const { gloabl, countries, selectedCountry } = this.state;

    return (
      <div className="container">
        <h1>Crona19 Statistics</h1>

        <h2> All Countries </h2>
        <div className="flex">
          <div className="box confirmed">
            <h3>Confirmed</h3>
            <h4>{gloabl.confirmed}</h4>
          </div>

          <div className="box recovered">
            <h3>Recovered</h3>
            <h4>{gloabl.recovered}</h4>
          </div>

          <div className="box deaths">
            <h3>Deaths</h3>
            <h4>{gloabl.deaths}</h4>
          </div>
        </div>

        <h2>Select Country</h2>
        <select onChange={this.handleCountryData}>
          <option defaultValue value="default">
            Select Country Name
          </option>
          {countries &&
            countries.map((country, idx) => {
              return <option key={idx}>{country}</option>;
            })}
        </select>

        {selectedCountry && (
          <div className="flex">
            <div className="box confirmed">
              <h3>Confirmed</h3>
              <h4>{selectedCountry.confirmed}</h4>
            </div>

            <div className="box recovered">
              <h3>Recovered</h3>
              <h4>{selectedCountry.recovered}</h4>
            </div>

            <div className="box deaths">
              <h3>Deaths</h3>
              <h4>{selectedCountry.deaths}</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
