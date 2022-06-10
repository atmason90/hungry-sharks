import Auth from '../utils/auth';
import { getMe } from '../utils/API'
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Stats = () => {
    const [userData, setUserData] = useState({})
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
            const getUserHighscores = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
                if (!token) {
                return false
                }
                const response = await getMe(token);
                console.log(response)
                if (!response.ok) {
                throw new Error('something is wrong')
                }
                const user = await response.json();
                setUserData(user);
            }
            catch(error) {
            console.log(error);
            };
        }
        console.log(userData)
  
        getUserHighscores();
    },  [userDataLength])
  
    const wins = userData.stats.wins;
    const losses = userData.stats.losses;

    return (
    <div className='app bg-[#030917]'>
        <div className='row'>
            <div className='mixed-chart'>
                <Chart 
                    options={{
                        chart: {
                            type: 'donut'
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
                        colors: ['#c2410c', '#1d4ed8'],
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
                    series={[wins, losses]}
                    // series={[10, 20]}
                    type={'donut'}
                    width={'100%'}
                />
            </div>
        </div>
    </div>
    );
    
}
    
export default Stats;
