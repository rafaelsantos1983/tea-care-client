import React from 'react';
import ReactApexChart from 'react-apexcharts';

// npm install react-apexcharts

class Grafico_linha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
          
      series: [{
          name: "Nível",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      options: {
        chart: {
          toolbar: {
            show: false, 
          },
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
      },
    
    
    };
  }



  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={650}/>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default Grafico_linha;
