import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const FirstCome = () => {
    const [requests, setRequests] = useState([]);
    const [initialHeadPosition, setInitialHeadPosition] = useState('');
    const [totalHeadMovement, setTotalHeadMovement] = useState(null);
    const [inputString, setInputString] = useState('');
    const [chart, setChart] = useState(null);

    const handleInitialHeadPositionChange = (e) => {
        setInitialHeadPosition(e.target.value);
    };

    const handleInputStringChange = (e) => {
        setInputString(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputArray = inputString.split(',').map(item => parseInt(item.trim()));
        setRequests(inputArray);
    };

    const calculateFCFS = () => {
        if (requests.length === 0 || initialHeadPosition === '') {
            return;
        }

        let seekCount = 0;
        let currentHead = parseInt(initialHeadPosition);

        // Array to store disk head movement
        const headMovement = [];

        // Add initial head position as the first point
        headMovement.push({ x: parseInt(initialHeadPosition), y: 0 });

        // Array to store line segments
        const lineSegments = [];

        let prevTrack = parseInt(initialHeadPosition);

        for (let i = 0; i < requests.length; i++) {
            const curTrack = requests[i];
            const distance = Math.abs(curTrack - currentHead);
            seekCount += distance;
            currentHead = curTrack;
            headMovement.push({ x: curTrack, y: i + 1 }); // Track number as x-axis value, positive request number as y-axis value
            lineSegments.push([{ x: prevTrack, y: i }, { x: curTrack, y: i + 1 }]);
            prevTrack = curTrack;
        }

        setTotalHeadMovement(seekCount);
        renderChart(headMovement, lineSegments);
    };

    const renderChart = (data, lineSegments) => {
        if (chart) {
            chart.destroy(); // Destroy existing chart before rendering new one
        }

        if (data.length === 0 || lineSegments.length === 0) {
            return; // Don't render chart if data is empty
        }

        const ctx = document.getElementById('disk-chart');

        const myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Disk Head Movement',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    pointRadius: 5, 
                    pointHoverRadius: 7, 
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    showLine: true,
                }, ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Track Number'
                        },
                        suggestedMin: 0,
                        suggestedMax: 199
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Request Number'
                        },
                    }
                }
            }
        });

        setChart(myChart);
    };

    useEffect(() => {
        if (chart) {
            chart.destroy(); 
        }
    }, []);

    return (
        <div className="fcfs">
            <h2>First Come First Serve Disk Scheduling Algorithm</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row2">
                    <label>Request Sequence:</label>
                    <input type="text" value={inputString} onChange={handleInputStringChange} required />
                    <label>Initial Head Position:</label>
                    <input type="number" value={initialHeadPosition} onChange={handleInitialHeadPositionChange} required />
                </div>
                <div className="button-container">
                    <button type="submit">Set Sequence</button>
                </div>
            </form>
            <div className="button-container">
                <button onClick={calculateFCFS}>Calculate Results</button>
            </div>

            {requests.length > 0 && (
                <div className="fcfs2">
                    <h3>Requests:</h3>
                    <ul>
                        {requests.map((request, index) => (
                            <li key={index}>{request}</li>
                        ))}
                    </ul>
                </div>
            )}

            {totalHeadMovement !== null && (
                <div>
                    <h3>Results:</h3>
                    <div className="headmov">Total Head Movement: {totalHeadMovement}</div>
                </div>
            )}

            <div>
                <canvas id="disk-chart"></canvas>
            </div>
        </div>
    );
};

export default FirstCome;
