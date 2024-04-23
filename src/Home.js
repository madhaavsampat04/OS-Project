import {Link} from 'react-router-dom';
const Home = () => {
    return ( 
        <div className="home">    
        <h1>Operating System Algorithms</h1>
        <nav classname="links">
<Link to='/preamptive'>Preemptive Priority Scheduling Algorithm</Link><br/>
<Link to='/reader'>Readers-Writers Problem</Link><br/> 
<Link to='/fcfs'>First Come First Serve Disk Scheduling Algorithm</Link><br/>
<Link to='/lru'>Least Recently Used Page Replacement Algorithm</Link><br/>

        </nav> 
        </div>
     );
}
 
export default Home;
