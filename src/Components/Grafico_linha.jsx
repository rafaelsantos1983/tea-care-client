import React from 'react';
import ReactApexChart from 'react-apexcharts';

class Grafico_linha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#043058', '#FF3547'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 3],
          curve: 'straight',
          dashArray: [0, 5],
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set'],
        },
      },
      series: []
    };
  }

  //pegando os dados para formar o gráfico
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data.series !== prevState.series) {
      return {
        series: nextProps.data.series
      };
    }
    return null;
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={650} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default Grafico_linha;
