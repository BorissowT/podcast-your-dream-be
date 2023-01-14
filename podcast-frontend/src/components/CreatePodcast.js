import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CREATE_PODCAST_MUTATION  = gql`
mutation CreatePodcast($title: String!, $linkToApi: String!){
  createPodcast(title: $title, linkToApi: $linkToApi) {
      title
      linkToApi
  }
}
`;


const CreatePodcast = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    linkToApi: '',
    title: ''
  });

  const [CreatePodcast] = useMutation(CREATE_PODCAST_MUTATION, {
    variables: {
      title: formState.title,
      linkToApi: formState.linkToApi
    },
    onCompleted: () => navigate('/')
  })

  return (
    <div>
      <form
      onSubmit={(e) => {
        e.preventDefault();
        CreatePodcast();
      }}
      >

        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.title}
            onChange={(e) =>
              setFormState({
                ...formState,
                title: e.target.value
              })
            }
            type="text"
            placeholder="A title for the podcast"
          />
          <input
            className="mb2"
            value={formState.linkToApi}
            onChange={(e) =>
              setFormState({
                ...formState,
                linkToApi: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the podcast"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePodcast;
