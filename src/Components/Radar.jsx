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
          categories: [
            "Comunicação",
            "Alimentação",
            "Habilidades Sociais",
            "Comportamento",
            "Autonomia E Autoregulação",
            "Habilidades Motoras E Práxicas",
            "Habilidades Acadêmicas"
          ],
        },
        yaxis: {
          min: 0,
          max: 5,
          tickAmount: 6,
          show: false, // Esconde as labels do eixo y no gráfico
          labels: {
            show: false, // Assegura que as labels do eixo y não serão renderizadas
            formatter: function(val) {
              if (val >= 0 && val < 1) {
                return 'Muito Ruim';
              } else if (val >= 1 && val < 2) {
                return 'Ruim';
              } else if (val >= 2 && val < 3) {
                return 'Médio';
              } else if (val >= 3 && val < 4) {
                return 'Bom';
              } else if (val >= 4 && val <= 5) {
                return 'Excelente';
              } else {
                return '';
              }
            }
          }
        },
        legend: {
          show: false // Esconde a legenda padrão
        }
      },
    };
  }

  render() {
    const categories = [
      "Comunicação",
      "Alimentação",
      "Habilidades Sociais",
      "Comportamento",
      "Autonomia E Autoregulação",
      "Habilidades Motoras E Práxicas",
      "Habilidades Acadêmicas"
    ];

    const yLabels = [
      { label: 'Muito Ruim', color: '#ff0000' },
      { label: 'Ruim', color: '#ff8000' },
      { label: 'Médio', color: '#ffff00' },
      { label: 'Bom', color: '#80ff00' },
      { label: 'Excelente', color: '#00ff00' }
    ];

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="radar" width={450} height={300}/>
        </div>
        <div id="yaxis-labels" style={{ textAlign: 'center', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          {yLabels.map((item, index) => (
            <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
              <span style={{ backgroundColor: item.color, color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div id="categories" style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map((category, index) => (
            <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
              <span style={{ backgroundColor: '#043058', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>{category}</span>
            </div>
          ))}
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default Radar;
