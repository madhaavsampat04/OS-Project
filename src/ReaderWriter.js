import React, { useState } from 'react';

function ReadersWriters() {
    const [sharedResource, setSharedResource] = useState('');
    const [readerTime, setReaderTime] = useState('');
    const [writerTime, setWriterTime] = useState('');
    const [readerQueue, setReaderQueue] = useState([]);
    const [writerQueue, setWriterQueue] = useState([]);
    const [writing, setWriting] = useState(false);
    const [readersInQueue, setReadersInQueue] = useState(0);
    const [writersInQueue, setWritersInQueue] = useState(0);

    const addReader = () => {
        const time = parseInt(readerTime);

        const readerInterval = setInterval(() => {
            if (!writing && writersInQueue === 0) {
                setReadersInQueue(prev => prev + 1);
                clearInterval(readerInterval);
                updateResource("Reader entered.");
                setTimeout(() => {
                    setReadersInQueue(prev => prev - 1);
                    updateResource("Reader exited.");
                }, time);
            }
        }, 0);
    };

    const addWriter = () => {
        const time = parseInt(writerTime);

        const writerInterval = setInterval(() => {
            if (!writing && readersInQueue === 0 && writersInQueue === 0) {
                setWriting(true);
                setWritersInQueue(prev => prev + 1);
                clearInterval(writerInterval);
                updateResource("Writer entered.");
                setTimeout(() => {
                    setWriting(false);
                    setWritersInQueue(prev => prev - 1);
                    updateResource("Writer exited.");
                }, time);
            }
        }, 0);
    };

    const updateResource = (message) => {
        setSharedResource(prev => prev + message + "\n");
    };

    return (
        <div className="reader2">
            <h2>Reader Writers Problem</h2>
            <div className="text">
            <textarea
            readOnly
            value={sharedResource}
            style={{ width: '70%', height: '200px', margin: 'auto', display: 'block' }} ></textarea>
            </div>
            <div className="form-row2">
                <label>Reader Time (ms):</label>
                <input type="text" value={readerTime} onChange={(e) => setReaderTime(e.target.value)} />
                <label>Writer Time (ms):</label>
                <input type="text" value={writerTime} onChange={(e) => setWriterTime(e.target.value)} /> 
            </div>
            <div className="button-container">
                <button onClick={addReader}>Add Reader</button>
                </div>
            <div>
            <div className="button-container">
                <button onClick={addWriter}>Add Writer</button>
            </div>
                <ul>
                    {readerQueue.map((item, index) => <li key={index}>{item}</li>)}
                    {writerQueue.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default ReadersWriters;
