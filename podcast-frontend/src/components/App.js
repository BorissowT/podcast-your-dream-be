import React from 'react';
import CreatePodcast from './CreatePodcast';
import Header from './Header';
import Playlist from './Playlists';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import User from './User';


const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<Search/>} />
          <Route
            path="/create"
            element={<CreatePodcast/>}
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<User/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;