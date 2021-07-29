import axios from "axios";
import React, { useState, useEffect } from "react";
import CanvasJSReact from "../assets/canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Covid = () => {
  const traffic2 = [
    {
      name: "Urban Beldum",
      location: "Escuintla",
      age: 4,
      infectedtype: "non-imported",
      state: "symptomatic",
      route: "NATS",
    },
  ];
  const initRegionCase = [
    {
      _id: "asdasdasd",
      name: "Noemi Neumann",
      location: "Indonesia",
      gender: "Female",
      age: 26,
      vaccine_type: "Johnson & Johnsonâ€™s",
      fecha: "2021-07-28T01:54:17.466Z"
    },
  ];
  const initregionTopVac = [
    {
      _id: "asdasdasd",
      count: "0"
    },
  ];
  const initCasosState = [
    {
      label: "symptomatic",
      y: 169,
    },
  ];
  const initAge = [
    {
      label: "0 - 9",
      y: 0,
    },
    {
      label: "10 - 19",
      y: 0,
    },
    {
      label: "20 - 29",
      y: 0,
    },
    {
      label: "30 - 39",
      y: 0,
    },
    {
      label: "40 - 49",
      y: 0,
    },
    {
      label: "50 - 59",
      y: 0,
    },
    {
      label: "60 - 69",
      y: 0,
    },
    {
      label: "70 - 79",
      y: 0,
    },
    {
      label: "80 - 89",
      y: 0,
    },
    {
      label: "90 - 99",
      y: 0,
    },
    {
      label: "mas de 100",
      y: 0,
    }
  ];
  // Declare a new state variable
  const [routeFilter, setrouteFilter] = useState("All");
  const [traffic, settraffic] = useState(traffic2);
  const [regionCase, setregionCase] = useState(initRegionCase);
  const [regionTopVac, setregionTopVac] = useState(initregionTopVac);
  const [casosState, setcasosState] = useState(initCasosState);
  const [ageRange, setageRange] = useState(initAge);

  useEffect(() => {
    const interval = setInterval(() => {
      getRegions();
      getTopVac();
      getCasosState();
      getRange();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ++++++ MONGODB
  const getRegions = async () => {
    try {
      const resp = await axios.get(
        "http://34.67.40.100:3000/data/last"
      );
      setregionCase(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ++++++ REDIS
  const getTopVac = async () => {
    try {
      const resp = await axios.get(
        "http://34.67.40.100:3000/vaccinated/topTenVaccinated"
      );
      setregionTopVac(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDataRoute = async (param: String) => {
    try {
      let routePost = {
        route: param,
      };
      const resp = await axios.post(
        "http://34.71.65.123:3000/covid/byRoute",
        routePost
      );
      settraffic(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ++++++ MONGODB
  const getCasosState = async () => {
    try {
      const resp = await axios.get("http://34.67.40.100:3000/graphs/genderByCountry");
      let casosStateArray = resp.data;
      //console.log(casosStateArray);

      setcasosState(getCasos(casosStateArray));
    } catch (err) {
      console.error(err);
    }
  };

  // ++++++ REDIS
  const getRange = async () => {
    try {
      const resp = await axios.get("http://34.67.40.100:3000/data/last");
      let casoAge = resp.data;

      setageRange(getAge(casoAge));
    } catch (err) {
      console.error(err);
    }
  };

  function getCasos(arrayTemp: []) {
    let arrayReturn: any = [];
    let totalCasos = 0;
    arrayTemp.forEach(function (departament, index) {
      totalCasos += departament["genderCount"];
    });
    arrayTemp.forEach(function (departament, index) {
      var valor: any = departament["_id"];
      console.log('valor', valor)
      let objTop = {
        label: valor.location + '-' + valor.gender,
        y: (departament["genderCount"] * (100 / totalCasos)).toFixed(2),
      };
      arrayReturn.push(objTop);
    });

    return arrayReturn;
  }

  function getAge(arrayTemp: []) {
    let anio0 = 0;
    let anio1 = 0;
    let anio2 = 0;
    let anio3 = 0;
    let anio4 = 0;
    let anio5 = 0;
    let anio6 = 0;
    let anio7 = 0;
    let anio8 = 0;
    let anio9 = 0;
    let anio10 = 0;
    arrayTemp.forEach(function (caso, index) {
      if (caso['age'] <= 9) {
        anio0 = anio0 + 1;
      } else if (caso['age'] > 9 && caso['age'] <= 19) {
        anio1 = anio1 + 1;
      } else if (caso['age'] > 19 && caso['age'] <= 29) {
        anio2 = anio2 + 1;
      } else if (caso['age'] > 29 && caso['age'] <= 39) {
        anio3 = anio3 + 1;
      } else if (caso['age'] > 39 && caso['age'] <= 49) {
        anio4 = anio4 + 1;
      } else if (caso['age'] > 49 && caso['age'] <= 59) {
        anio5 = anio5 + 1;
      } else if (caso['age'] > 59 && caso['age'] <= 69) {
        anio6 = anio6 + 1;
      } else if (caso['age'] > 69 && caso['age'] <= 79) {
        anio7 = anio7 + 1;
      } else if (caso['age'] > 79 && caso['age'] <= 89) {
        anio8 = anio8 + 1;
      } else if (caso['age'] > 89 && caso['age'] <= 99) {
        anio9 = anio9 + 1;
      } else if (caso['age'] > 99) {
        anio10 = anio10 + 1;
      }
    });

    let initAgeNew = [
      {
        label: "0 - 9",
        y: anio0,
      },
      {
        label: "10 - 19",
        y: anio1,
      },
      {
        label: "20 - 29",
        y: anio2,
      },
      {
        label: "30 - 39",
        y: anio3,
      },
      {
        label: "40 - 49",
        y: anio4,
      },
      {
        label: "50 - 59",
        y: anio5,
      },
      {
        label: "60 - 69",
        y: anio6,
      },
      {
        label: "70 - 79",
        y: anio7,
      },
      {
        label: "80 - 89",
        y: anio8,
      },
      {
        label: "90 - 99",
        y: anio9,
      },
      {
        label: "mas de 100",
        y: anio10,
      }
    ];

    return initAgeNew;
    //setageRange(arrayReturn);
  }

  function renderTableHeaderTraffic() {
    return (
      <tr className="table-primary">
        <td>NAME</td>
        <td>LOCATION</td>
        <td>AGE</td>
        <td>INFECTED TYPE</td>
        <td>STATE</td>
        <td>ROUTE</td>
      </tr>
    );
  }

  function renderTableTraffic() {
    return traffic.map((traffic, index) => {
      const { name, location, age, infectedtype, state, route } = traffic;
      return (
        <tr key={index}>
          <td>{name}</td>
          <td>{location}</td>
          <td>{age}</td>
          <td>{infectedtype}</td>
          <td>{state}</td>
          <td>{route}</td>
        </tr>
      );
    });
  }


  function renderTableRegion() {
    return regionCase.map((region, index) => {
      return (
        <tr key={index}>
          <td>{region.location}</td>
          <td>{region.name}</td>
          <td>{region.gender}</td>
          <td>{region.age}</td>
          <td>{region.vaccine_type}</td>
          <td>{region.fecha}</td>
        </tr>
      );
    });
  }

  function renderTableTopVac() {
    return regionTopVac.map((region, index) => {
      return (
        <tr key={index}>
          <td>{region._id}</td>
          <td>{region.count}</td>
        </tr>
      );
    });
  }

  function filter() {
    switch (routeFilter) {
      case "All": {
        getDataRoute("");
        break;
      }
      case "gRPC": {
        getDataRoute("gRPC");
        break;
      }
      case "NATS": {
        getDataRoute("NATS");
        break;
      }
      case "RabbitMQ": {
        getDataRoute("RabbitMQ");
        break;
      }
      case "Google PubSub": {
        getDataRoute("Go PubsSub");
        break;
      }
      default: {
        break;
      }
    }
    //getDataRoute("");
  }

  const optionsState = {
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: casosState,
      },
    ],
  };

  const optionsAge = {

    axisY: {
      title: "Cantidad de Contagiados",
    },
    data: [
      {
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        legendText: "Rango de Edades",
        dataPoints: ageRange,
      },
    ],
  };

  return (
    <>
      <h1>Tabla de datos recopilados</h1>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Example select</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => {
                setrouteFilter(e.target.value);
              }}
            >
              <option>All</option>
              <option>gRPC</option>
              <option>NATS</option>
              <option>RabbitMQ</option>
              <option>Google PubSub</option>
            </select>
          </div>
        </div>
        <div className="col">
          <label htmlFor="exampleFormControlSelect1"></label>
          <div className="col-auto my-1">
            <button className="btn btn-primary" onClick={filter}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <tbody>
          {renderTableHeaderTraffic()}
          {renderTableTraffic()}
        </tbody>
      </table>

      <h1>Datos MongoDb</h1>
      <table className="table table-hover">
        <tbody>
          <tr className="table-primary">
            <th>PAÍS</th>
            <th>NOMBRE</th>
            <th>GENERO</th>
            <th>AÑOS</th>
            <th>VACUNA</th>
            <th>FECHA INGRESO</th>
          </tr>
          {renderTableRegion()}
        </tbody>
      </table>

      <h1>TOP 10 Países vacunados</h1>
      <table className="table table-hover">
        <tbody>
          <tr className="table-primary">
            <th>PAÍS</th>
            <th>VACUNADOS</th>
          </tr>
          {renderTableTopVac()}
        </tbody>
      </table>

      <h1>Casos infectados por State</h1>
      <CanvasJSChart options={optionsState} />
      <br></br>
      <br></br>
      <br></br>
      <h1>Rango de edad de infectados</h1>
      <CanvasJSChart options={optionsAge} />
    </>
  );
};

export default Covid;
