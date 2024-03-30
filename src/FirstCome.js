import React, { useState } from 'react';

const FirstCome = () => {
    const [processes, setProcesses] = useState([]);
    const [processName, setProcessName] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [output, setOutput] = useState({
        processes: [],
        averageWaitingTime: undefined
    });

    const handleProcessNameChange = (e) => {
        setProcessName(e.target.value);
    };

    const handleArrivalTimeChange = (e) => {
        setArrivalTime(e.target.value);
    };

    const handleBurstTimeChange = (e) => {
        setBurstTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProcess = {
            processName: processName,
            arrivalTime: parseInt(arrivalTime),
            burstTime: parseInt(burstTime)
        };
        setProcesses([...processes, newProcess]);

        setProcessName('');
        setArrivalTime('');
        setBurstTime('');
    };

    const handleFCFS = () => {
        const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
        let currentTime = 0;
        let totalWaitingTime = 0;

        sortedProcesses.forEach((process, index) => {
            if (currentTime < process.arrivalTime) {
                currentTime = process.arrivalTime;
            }
            process.waitingTime = currentTime - process.arrivalTime;
            currentTime += process.burstTime;
            process.completionTime = currentTime;
            totalWaitingTime += process.waitingTime;
        });

        const averageWaitingTime = (totalWaitingTime / processes.length).toFixed(2);
        setOutput({
            processes: sortedProcesses,
            averageWaitingTime: averageWaitingTime
        });
    };
    const renderGanttChart = () => {
        const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6610f2', '#28a745', '#007bff', '#dc3545', '#ffc107']; 
        let totalBurstTime = 0;
        for (let i = 0; i < output.processes.length; i++) {
            totalBurstTime += output.processes[i].burstTime;
        }
    
        let startTime=0; 
        const bars = output.processes.map((process, index) => {
            const width = (process.burstTime / totalBurstTime) * 100;
            const color = colors[index % colors.length]; 
            const barStyle = {
                width: `${width}%`, 
                background: color,
                color: '#fff',
                textAlign: 'center',
                border: '2px solid  #333',
                position: 'relative',
            };
    
            // Calculate start time based on completion time of previous process
            let processStartTime = startTime;
            startTime += process.burstTime;
    
            return (
                <div key={index} style={barStyle}>
                    <div>{process.processName}</div>
                    <div style={{textAlign:'left'}}>ST:{processStartTime}</div>
                    <div style={{textAlign:'right'}}>FT:{process.completionTime}</div>
                </div>
            ); 
        });
    
        return (
            <div style={{ display: 'flex', marginTop: '20px' }} className="gantt">
                {bars}
            </div>
        );
    };
    
    

    return (
        <div className="fcfs">
            <h2>First Come First Serve Disk Scheduling Algorithm</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Process Name:</label>
                    <input type="text" value={processName} onChange={handleProcessNameChange} required />
                    <label>Arrival Time:</label>
                    <input type="number" value={arrivalTime} onChange={handleArrivalTimeChange} required />
                    <label>Burst Time:</label>
                    <input type="number" value={burstTime} onChange={handleBurstTimeChange} required />
                </div>
                <div className="button-container">
                    <button type="submit">Add New Process</button>
                </div>
            </form>
            <div className="button-container">
                <button onClick={handleFCFS}>Calculate Results</button>
            </div>

            {processes.length > 0 && (
                <div>
                    <h3>Processes:</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Process Name</th>
                                <th>Arrival Time</th>
                                <th>Burst Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process, index) => (
                                <tr key={index}>
                                    <td>{process.processName}</td>
                                    <td>{process.arrivalTime}</td>
                                    <td>{process.burstTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {output.averageWaitingTime !== undefined && (
                <div>
                    <h3>Results:</h3>
                    <div>Average Waiting Time:{output.averageWaitingTime}</div>
                    <table className="table2">
                        <thead>
                            <tr>
                                <th>Process Name</th>
                                <th>Arrival Time</th>
                                <th>Burst Time</th>
                                <th>Completion Time</th>
                                <th>Waiting Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {output.processes.map((process, index) => (
                                <tr key={index}>
                                    <td>{process.processName}</td>
                                    <td>{process.arrivalTime}</td>
                                    <td>{process.burstTime}</td>
                                    <td>{process.completionTime}</td>
                                    <td>{process.waitingTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Gantt Chart:</h3>
                    {renderGanttChart()}
                </div>
                
            )}
        </div>
    );
};

export default FirstCome;
