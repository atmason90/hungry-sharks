import React, { Component } from 'react'
import Chart from 'react-apexcharts';

class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'basic-bar'
                },
                xaxis: {
                    categories: ['wins', 'losses']
                }
            },
            series: [
                {
                name: 'series-1',
                data: [20, 10]
                }
            ]
        };
    }
  
    render () {
        return (
        <div className='app'>
            <div className='row'>
                <div className='mixed-chart'>
                    <Chart 
                        options={this.state.options}
                        series={this.state.series}
                        type='bar'
                        width='100%'
                    />
                </div>
            </div>
        </div>
        );
    }
}
    
export default Stats;
