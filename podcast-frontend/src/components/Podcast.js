import React from 'react';
import { useQuery, gql } from '@apollo/client';

const PODCASTS_QUERY = gql`
query{
  podcasts{
    id
    title
    linkToApi
  }
}
`
;

const Podcast = () => {
  const { loading, error, data } = useQuery(PODCASTS_QUERY);
  console.log(data);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {data && (
        <>
          {data.podcasts.map((podcast) => (<div className="podcast">
              <div id="id">{podcast.id}</div>
              <div id="linkToApi">{podcast.linkToApi}</div>
              <div id="title">{podcast.title}</div>
              <br></br>
             </div>
          ))}
        </>
      )}
    </div>
  );
};
  
  export default Podcast;