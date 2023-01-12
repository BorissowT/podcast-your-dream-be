import React from 'react';
import Podcast from './Podcast';
import { useQuery, gql } from '@apollo/client';

const PLAYLISTS_QUERY = gql`
query {
    playlists{
      id
      title
      podcasts{
        id
        title
      }  
    }
}
`
;

const Playlist = () => {
    const { loading, error, data } = useQuery(PLAYLISTS_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    console.log(data);
    return (
      <div>
        { data.playlists.map((playlist) => (
        <div className="playlist">
          <div id="id">{playlist.id}</div>
          <div id="title">{playlist.title}</div>
          { playlist.podcasts.map((podcast) => (<Podcast key={podcast.id} podcast={podcast} />))}
          <br></br>
         </div>
        ))}
      </div>
    );
  };
  
  export default Playlist;