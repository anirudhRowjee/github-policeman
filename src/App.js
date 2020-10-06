import React, { useState, useContext } from 'react';
import './App.css';
import RepoList from './components/RepoList';

function App() {

  const [username, setUsername] = useState("");
  const [search, setSearch] = useState(false);

  return (
    <div className='m-10 App'>
      <h1 className='m-1 text-5xl text-center section-header-text word-wrap'>
        Github Policeman
      </h1>
      <p className='m-5 text-xl text-center'>
        Find out which of your Github Repositories don't have a license.
      </p>

      <div>
         <input 
           className="flex-1 w-full p-3 m-1 border border-blue-500 rounded" 
           id="username" 
           type="text" 
           placeholder="Username" 
           value={username}
           onChange={e => setUsername(e.target.value)}
         />

        <button 
          className='flex-1 w-full p-3 m-1 text-white bg-blue-500 border border-blue-500 rounded'
          onClick={() => setSearch(!search)}
        > 
          Search 
        </button>


        {(username && search) && <RepoList username={username}/>}

      </div>

    </div>
  );
}

export default App;
