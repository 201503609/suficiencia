import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../assets/canvasjs.react'
import axios from 'axios';
import Process from "./process";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

var totalCpu: any;
var usageCpu: any;

const Grafica = () => {

  const [dataRam, setDataRam] = useState([
    { y: 50, label: "FREE" },
    { y: 50, label: "USED" }
  ]);

  const [dataRamm, setDataRamm] = useState([
    { x: new Date(), y: 20, label: "" },
    { x: new Date(), y: 20, label: "" },
    { x: new Date(), y: 20, label: "" },
    { x: new Date(), y: 40, label: "" },
    { x: new Date(), y: 40, label: "" },
    { x: new Date(), y: 50, label: "" },
    { x: new Date(), y: 50, label: "" },
  ]);

  const [dataProcs, setDataProcs] = useState<any>(
    [
      {
        Nombre: "",
        Pid: "",
        PidPadre: "",
        Estado: "",
      }
    ]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      sendGetRequest();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendGetRequest = async () => {
    try {
      const resp = await axios.get('http://34.67.40.100:3000/ram');
      console.log('Time', new Date().toLocaleTimeString());
      let newDataRam = [
        { y: resp.data.freeRam * 0.0001, label: "FREE" },
        { y: resp.data.usedRam * 0.0001, label: "USED" }
      ];
      let temRam = dataRamm;
      if (temRam.length < 8)
        temRam.push({ x: new Date(), y: resp.data.freeRam * 0.0001, label: "" });
      else {
        temRam.push({ x: new Date(), y: resp.data.freeRam * 0.0001, label: "" });
        temRam.shift();
      }


      setDataRamm(temRam);
      setDataRam(newDataRam);

      const resp1 = await axios.get<any>('http://34.67.40.100:3000/procs');
      const resp2 = await axios.get<any>('http://34.67.40.100:3000/cpu');

      const rr1 = JSON.parse(resp1.data.replace('body', '"body"')).body;
      totalCpu = resp2.data.total;
      usageCpu = resp2.data.usage;

      setDataProcs(rr1);

      //const resp2 = await axios.get<Processes>('http://34.71.65.123:3000/procs');
      //setDataProcs(resp2.data);

    } catch (err) {
      // Handle Error Here
      console.error('Err', err);
    }
  };

  const options = {
    title: {
      text: "RAM"
    },
    data: [{
      type: "doughnut",
      indexLabel: "{label} {y}%",
      dataPoints: dataRam
    }]
  }



  const options2 = {
    animationEnabled: true,
    title: {
      text: "RAM"
    },
    axisX: {
      valueFormatString: "HH:MM:ss"
    },
    axisY: {
      titleFontColor: "#4F81BC",
      includeZero: true,
      suffix: "%",
      maximum: 100
    },
    data: [{
      indexLabelFontColor: "darkSlateGray",
      name: "views",
      type: "area",
      yValueFormatString: "##,00%",
      dataPoints: dataRamm
    }]
  }

  return (
    <>
      <h1>SYSTEM MONITOR</h1>
      <div className="row">
        <div className="col-9"><CanvasJSChart options={options2} /></div>
        <div className="col-3"><CanvasJSChart options={options} /></div>
      </div>
      <br /><br />

      <h2>CPU</h2>
      <div className="row" style={{ backgroundColor: "#C0504E", color: "white" }}>
        <div className="col-5">Total</div>
        <div className="col-5">Usage</div>
      </div>
      <div className="row" style={{ backgroundColor: "#C050EE", color: "white" }}>
        <div className="col-5">{totalCpu}</div>
        <div className="col-5">{usageCpu}</div>
      </div>

      <div className="row">
        <div className="col-10">
          <Process procs={dataProcs} />
        </div>
      </div>
    </>
  );
}

export default Grafica;