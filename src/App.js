import './App.css';
import React from 'react';
import { COLUMNS } from './components/columns';
import MOCK_DATA from './components/MOCK_DATA.json';
import { BasicTable } from './components/BasicTable';


function App() {

  return (
    
      
        
        <div>
          <BasicTable columns={COLUMNS} data={MOCK_DATA} />
        </div>
    
  );
}

export default App;
