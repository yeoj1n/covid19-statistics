//import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

/* React hooks */
const App = () => {
  const [state, setState] = useState({
    global: null,
    countries: [],
    selectedCountry: null
  });

  const getGlobalStatisticAndCountries = async () => {
    const globalData = await axios("https://covid19.mathdro.id/api");
    const country = await axios("https://covid19.mathdro.id/api/countries");

    setState({
      ...state,
      global: {
        confirmed: globalData.data.confirmed.value,
        recovered: globalData.data.recovered.value,
        deaths: globalData.data.deaths.value
      },
      countries: country.data.countries
    });
  };

  useEffect(() => {
    getGlobalStatisticAndCountries();
  },[]);

  const handleCountryData = e => {
    const countryName = e.target.value;

    getCountryData(countryName);
  };

  const getCountryData = async name => {
    const { data } = await axios(
      "https://covid19.mathdro.id/api/countries/" + name
    );

    setState({
      ...state,
      selectedCountry: {
        confirmed: data.confirmed.value,
        recovered: data.recovered.value,
        deaths: data.deaths.value
      }
    });
  };
  const { global, countries, selectedCountry } = state;

  return (
    <>
      {!global && <h1 className="warningMsg">현재 서버와의 통신이 원활하지 않습니다.</h1>}
      {global && (
        <div className="container">
          <h1>Crona19 Statistics</h1>

          <h2> All Countries </h2>
          <div className="flex">
            <div className="box confirmed">
              <h3>Confirmed</h3>
              <h4>{global.confirmed}</h4>
            </div>

            <div className="box recovered">
              <h3>Recovered</h3>
              <h4>{global.recovered}</h4>
            </div>

            <div className="box deaths">
              <h3>Deaths</h3>
              <h4>{global.deaths}</h4>
            </div>
          </div>

          <h2>Select Country</h2>
          <select onChange={handleCountryData}>
            <option defaultValue value="default">
              Select Country Name
            </option>
            {countries &&
              countries.map((country, idx) => {
                return <option key={idx}>{country.name}</option>;
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
      )}
    </>
  );
};
export default App;

/* class 스타일 코드 */
// class App extends Component {
//   state = {
//     global: {
//       confirmed: 0,
//       recovered: 0,
//       deaths: 0
//     },
//     countries: [],
//     selectedCountry: null
//   };

//   getGlobalData = async () => {
//     const res = await axios.get("https://covid19.mathdro.id/api");
//     this.setState({
//       ...this.state,
//       global: {
//         confirmed: res.data.confirmed.value,
//         recovered: res.data.recovered.value,
//         deaths: res.data.deaths.value
//       }
//     });
//   };

//   getCountries = async () => {
//     const resCountries = await axios.get(
//       "https://covid19.mathdro.id/api/countries"
//     );
//     const countries = [];
//     for (let i = 0; i < resCountries.data.countries.length; i++)
//       countries.push(resCountries.data.countries[i].name);

//     this.setState({
//       ...this.state,
//       countries
//     });
//   };

//   componentDidMount() {
//     this.getGlobalData();
//     this.getCountries();
//   }

//   handleCountryData = async e => {
//     if (e.target.value === "default") {
//       this.setState({
//         ...this.state,
//         selectedCountry: null
//       });
//       return;
//     }
//     const country = e.target.value;
//     const countryData = await axios.get(
//       "https://covid19.mathdro.id/api/countries" + "/" + country
//     );

//     this.setState({
//       ...this.state,
//       selectedCountry: {
//         confirmed: countryData.data.confirmed.value,
//         recovered: countryData.data.recovered.value,
//         deaths: countryData.data.deaths.value
//       }
//     });
//   };

//   render() {
//     const { global, countries, selectedCountry } = this.state;

//     return (
//       <div className="container">
//         <h1>Crona19 Statistics</h1>

//         <h2> All Countries </h2>
//         <div className="flex">
//           <div className="box confirmed">
//             <h3>Confirmed</h3>
//             <h4>{global.confirmed}</h4>
//           </div>

//           <div className="box recovered">
//             <h3>Recovered</h3>
//             <h4>{global.recovered}</h4>
//           </div>

//           <div className="box deaths">
//             <h3>Deaths</h3>
//             <h4>{global.deaths}</h4>
//           </div>
//         </div>

//         <h2>Select Country</h2>
//         <select onChange={this.handleCountryData}>
//           <option defaultValue value="default">
//             Select Country Name
//           </option>
//           {countries &&
//             countries.map((country, idx) => {
//               return <option key={idx}>{country}</option>;
//             })}
//         </select>

//         {selectedCountry && (
//           <div className="flex">
//             <div className="box confirmed">
//               <h3>Confirmed</h3>
//               <h4>{selectedCountry.confirmed}</h4>
//             </div>

//             <div className="box recovered">
//               <h3>Recovered</h3>
//               <h4>{selectedCountry.recovered}</h4>
//             </div>

//             <div className="box deaths">
//               <h3>Deaths</h3>
//               <h4>{selectedCountry.deaths}</h4>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
