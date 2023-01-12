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

const Podcast = (props) => {
  const { podcast } = props;

  return (
    <div className="podcast">
      <div id="id">{podcast.id}</div>
      <div id="linkToApi">{podcast.linkToApi}</div>
      <div id="title">{podcast.title}</div>
      <br></br>
    </div>
  );
};
  
  export default Podcast;