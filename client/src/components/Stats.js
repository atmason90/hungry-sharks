import Auth from '../utils/auth';
import {getHighscores, getMe, getSingleHighscore} from '../utils/API'
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
  
    return (
    <div className='app'>
        <div className='row'>
            <div className='mixed-chart'>
                <Chart 
                    options={{
                        chart: {
                            id: 'basic-bar'
                        },
                        xaxis: {
                            categories: ['wins', 'losses']
                        }
                    }}
                    series={[{
                        name: 'series-1',
                        data: [20, 10]
                    }]}
                    type='bar'
                    width='100%'
                />
            </div>
        </div>
    </div>
    );
    
}
    
export default Stats;
