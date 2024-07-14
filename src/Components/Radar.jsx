import React from 'react';
import ReactApexChart from 'react-apexcharts';

class Radar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Categoria',
        data: props.evolution, // Valores correspondentes aos níveis: ruim, médio, bom, excelente
      }],
      options: {
        chart: {
          height: 300,
          type: 'radar',
          events: {
            markerClick: (event, context, { seriesIndex, dataPointIndex }) => {
              const category = this.state.options.xaxis.categories[dataPointIndex];
              const level = this.state.series[seriesIndex].data[dataPointIndex];
              this.props.onCategoryClick(category, level);
            }
          }
        },
        toolbar: {
          show: false,
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
            size: 120,
            polygons: {
              strokeColors: '#e9e9e9',
              fill: {
                colors: ['#f8f8f8', '#fff']
              }
            }
          }
        },
        colors: ['#043058'],
        markers: {
          size: 4,
          colors: ['#043058'],
          strokeColor: '#043058',
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        xaxis: {
          categories: ['Alimentação', 'Comportamento', 'Autonomia', 'Habilidades Acadêmicas', 'Socialização', 'Comunicação'],
        },
        yaxis: {
          min: 0,
          max: 5,
          tickAmount: 6,
          labels: {
            formatter: function(val) {
              if (val === 1) {
                return 'Ruim';
              } else if (val === 2) {
                return 'Médio';
              } else if (val === 3) {
                return 'Bom';
              } else if (val === 4) {
                return 'Excelente';
              } else {
                return '';
              }
            }
          }
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="radar" width={450} height={300}/>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default Radar;
