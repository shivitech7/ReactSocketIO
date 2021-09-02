import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import { Dashboard } from './chatComponents/Dashboard';
import { Store } from './chatComponents/Store';

function App() {
  const LOADING_TIME = 5000;
  const [loading, isLoading] = useState(true);

  // useEffect(()=> {
  //   setTimeout(() => isLoading(false), LOADING_TIME);
  // },[])

  // if(loading) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }

  return (
    <div className="App">
      <Store >
        <Dashboard/>
      </Store>


    </div>
  );
}

export default App;
