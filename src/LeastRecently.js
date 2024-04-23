import React, { useState } from 'react';

const LeastRecently = () => {
  const [pageReferences, setPageReferences] = useState([]);
  const [memoryFrames, setMemoryFrames] = useState([]);
  const [faults, setFaults] = useState(0);
  const [numFrames, setNumFrames] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const handleInputChange = (event) => {
    setPageReferences(event.target.value.split(',').map(Number));
  };

  const handleFrameInputChange = (event) => {
    setNumFrames(parseInt(event.target.value));
    setMemoryFrames([]);
    setFaults(0);
    setShowOutput(false);
  };

  const simulateLRU = () => {
   if (numFrames <= 0) {
     alert('Please enter a valid number of memory frames.');
     return;
   }
   
   const frames = [];
   let pageFaults = 0;
   let indexes = new Map();
 
   pageReferences.forEach((page, index) => {
     if (!frames.includes(page)) {
       if (frames.length < numFrames) {
         frames.push(page);
         indexes.set(page, index);
         pageFaults++;
       } else {
         let lruIndex = Infinity;
         let lruPage;
         for (const [frame, idx] of indexes.entries()) {
           if (idx < lruIndex) {
             lruIndex = idx;
             lruPage = frame;
           }
         }
         frames.splice(frames.indexOf(lruPage), 1);
         indexes.delete(lruPage);
         frames.push(page);
         indexes.set(page, index);
         pageFaults++;
       }
     } else {
       indexes.set(page, index);
     }
   });
   
   setFaults(pageFaults);
   setMemoryFrames(frames);
   setShowOutput(true);
 };
 
 

  return (
    <div className="lru">
      <h2>Least Recently Used (LRU) Page Replacement Algorithm</h2>
      <div className="form-row">
      <label>Enter Page References (comma-separated):</label>
      <input type="text" onChange={handleInputChange} required/>
      <label>Number of Memory Frames:</label>
      <input type="number" value={numFrames} onChange={handleFrameInputChange} required/>
      </div>
      <div className="button-container">
      <button onClick={simulateLRU}>Simulate LRU</button>
      </div>
      {showOutput && ( 
        <div >
          <h3>Page Faults: {faults}</h3>
          <h3>Memory Frames: {memoryFrames.join(', ')}</h3>
        </div>
      )}
      </div>
 
  );
};

export default LeastRecently;
































// const LeastRecently = () => {
   
//     return ( 
//         <div className="lru">
//            <h2>Least Recently Used(LRU) Page Replacement Algorithm</h2> 
//         </div>
//      );
// }
 
// export default LeastRecently;