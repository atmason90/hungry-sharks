import Chart from 'react-apexcharts';

const Stats = ({data}) => {

    let wins;
    let losses;
    if(data.stats) {
        wins = data.stats.wins;
        losses = data.stats.losses;
    } 
    else {
        wins =0;
        losses = 0;
    }

    return (

        <div className='app  mt-[10%] ml-[25%]'>
            <div className='row'>
                <div className='mixed-chart'>
                    <Chart 
                        options={{
                            chart: {
                                type: 'donut',
                            },
                            labels: ['Wins', 'Losses'],
                            legend: {
                                show: true,
                                showForSingleSeries: true,
                                showForNullSeries: true,
                                showForZeroSeries: true,
                                fontSize: '16px',
                                fontWeight: '600',
                                labels: {
                                    useSeriesColors: true
                                }
                            },
                            colors: ['#00243f', '#cc4501'],
                            tooltip: {
                                style: {
                                    fontSize: '16px'
                                }
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '55%',
                                        labels: {
                                            show: true,
                                            value: {
                                                show: true,
                                                fontSize: '22px',
                                                fontFamily: 'Helvetica, Arial, sans-serif',
                                                fontWeight: '600',
                                                color: 'white',
                                            },
                                            total: {
                                                show: true,
                                                showAlways: true,
                                                label: 'Total Games',
                                                fontSize: '22px',
                                                fontFamily: 'Helvetica, Arial, sans-serif',
                                                fontWeight: '600',
                                                color: 'white',
                                                formatter: function(w) {
                                                    return w.globals.seriesTotals.reduce((a, b) => {
                                                        return a + b
                                                    }, 0)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                        series={[wins , losses]}
                        // series={[0, 0]}
                        type={'donut'}
                        width={'60%'}
                    />
                </div>
            </div>
        </div>
     );
    
}
    
export default Stats;
