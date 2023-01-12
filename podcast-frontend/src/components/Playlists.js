import React from 'react';
import Podcast from './Podcast';
import { useQuery, gql } from '@apollo/client';

const PLAYLISTS_QUERY = gql`
query {
    playlists{
      id
      title
      user{
        id
        username
      }
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
    console.log(data);
    return (
      <div>
        { data.playlists.map((playlist) => (
          playlist.id
        ))}
      </div>
    );
  };
  
  export default Playlist;