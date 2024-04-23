import React, { useState } from 'react';

const PriorityScheduling = () => {
    const [processes, setProcesses] = useState([]);
    const [processName, setProcessName] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [priority, setPriority] = useState('');
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

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProcess = {
            processName: processName,
            arrivalTime: parseInt(arrivalTime),
            burstTime: parseInt(burstTime),
            priority: parseInt(priority),
            remainingBurstTime: parseInt(burstTime)
        };
        setProcesses([...processes, newProcess]);

        setProcessName('');
        setArrivalTime('');
        setBurstTime('');
        setPriority('');
    };
    const handlePriorityScheduling = () => {
        let currentTime = 0;
        let totalWaitingTime = 0;
        let totalTurnAroundTime = 0;
        const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime || a.priority - b.priority); // Sorting based on arrival time and priority
    
        const processQueue = [];
        let executedProcesses = [];
    
        while (sortedProcesses.length > 0 || processQueue.length > 0) {
            while (sortedProcesses.length > 0 && sortedProcesses[0].arrivalTime <= currentTime) {
                const newProcess = sortedProcesses.shift();
                processQueue.push(newProcess);
            }
    
            if (processQueue.length > 0) {
                let highestPriorityProcess = processQueue[0];
                for (let i = 1; i < processQueue.length; i++) {
                    if (processQueue[i].priority < highestPriorityProcess.priority) {
                        highestPriorityProcess = processQueue[i];
                    }
                }
    
                highestPriorityProcess.remainingBurstTime--;
                currentTime++;
    
                if (highestPriorityProcess.remainingBurstTime === 0) {
                    highestPriorityProcess.completionTime = currentTime;
                    highestPriorityProcess.waitingTime = currentTime - highestPriorityProcess.arrivalTime - highestPriorityProcess.burstTime;
                    highestPriorityProcess.turnaroundTime=currentTime- highestPriorityProcess.arrivalTime;
                    totalWaitingTime += highestPriorityProcess.waitingTime;
                    totalTurnAroundTime += highestPriorityProcess.turnaroundTime;
                    executedProcesses.push(highestPriorityProcess);
                    processQueue.splice(processQueue.indexOf(highestPriorityProcess), 1);
                } else {
                    // Check if there are any processes arriving with higher priority
                    for (let i = 0; i < processQueue.length; i++) {
                        if (processQueue[i].arrivalTime <= currentTime && processQueue[i].priority < highestPriorityProcess.priority) {
                            highestPriorityProcess = processQueue[i];
                        }
                    }
                }
            } else {
                currentTime++;
            }

        }

        const averageWaitingTime = (totalWaitingTime / processes.length).toFixed(2);
        const averageTurnAroundTime = (totalTurnAroundTime / processes.length).toFixed(2);
        setOutput({
            processes: executedProcesses,
            averageWaitingTime: averageWaitingTime,
            averageTurnAroundTime: averageTurnAroundTime
        });
    };
    

   
    
    

    return (
        <div className="preamptive">
            <h2>Preemptive Priority Scheduling</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Process Name:</label>
                    <input type="text" value={processName} onChange={handleProcessNameChange} required />
                    <label>Arrival Time:</label>
                    <input type="number" value={arrivalTime} onChange={handleArrivalTimeChange} required />
                    <label>Priority:</label>
                    <input type="number" value={priority} onChange={handlePriorityChange} required />
                    <label>Burst Time:</label>
                    <input type="number" value={burstTime} onChange={handleBurstTimeChange} required />
                    
                </div>
                <div className="button-container2">
                    <button type="submit">Add New Process</button>
                </div>
            </form>



            <div className="button-container2">
                <button onClick={handlePriorityScheduling}>Calculate Results</button>
            </div>
            {processes.length > 0 && (
                <div>
                    <h3>Processes:</h3>
                    <table className="table3">
                        <thead>
                            <tr>
                                <th>Process Name</th>
                                <th>Arrival Time</th>
                                <th>Priority</th>
                                <th>Burst Time</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process, index) => (
                                <tr key={index}>
                                    <td>{process.processName}</td>
                                    <td>{process.arrivalTime}</td>
                                    <td>{process.priority}</td>
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
                    <div className="avg">Average Waiting Time: {output.averageWaitingTime}</div>
                    <div className="tat">Average TurnAround Time: {output.averageTurnAroundTime}</div>
                    <table className="table4">
                        <thead>
                            <tr>
                                <th>Process Name</th>
                                <th>Arrival Time</th>
                                <th>Priority</th>
                                <th>Burst Time</th>
                                <th>Waiting Time</th>
                                <th>TurnAround Time</th>
                                <th>Completion Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {output.processes.map((process, index) => (
                                <tr key={index}>
                                    <td>{process.processName}</td>
                                    <td>{process.arrivalTime}</td>
                                    <td>{process.priority}</td>
                                    <td>{process.burstTime}</td>
                                    <td>{process.waitingTime}</td>
                                    <td>{process.turnaroundTime}</td>
                                    <td>{process.completionTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )}
        </div>
    );
};

export default PriorityScheduling;