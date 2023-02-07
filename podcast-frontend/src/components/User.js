import React, { useState, useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useSearchParams, Link } from "react-router-dom";
import "../styles/User.css";


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Podcast from './Podcast';

const PLAYLISTS_QUERY = gql`
query {
    playlists{
      id
      title
      podcasts{
        id
        title
        linkToApi
      }  
    }
    me{
      id
      username
      isStaff
      email
    }
}
`
;


const USER_QUERY = gql`
query{
  me{
    id
    username
    isStaff
    email
  }
}
`
;

const User = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  var title = searchParams.get("__title");
  var link = searchParams.get("__link");
  var playlistId = 4;

  const CREATE_PODCAST_MUTATION  = gql`
  mutation CreatePodcast($title: String!, $linkToApi: String!){
    createPodcast(title: $title, linkToApi: $linkToApi) {
        title
        linkToApi
    }
  }
  `;

  const [CreatePodcast] = useMutation(CREATE_PODCAST_MUTATION, {
    variables: {
      title: title,
      linkToApi: link,
      playlistId: playlistId
    },
    onError: (error) => {
      console.log(error)
    },
  })

  // const [QueryUser]  = useQuery(USER_QUERY,{
  //   onCompleted: ({ data }) => {
  //    console.log(data)
  //   },
  //   onError: (error) => {
  //     console.log(error)
  //   },
  // });

  useEffect(() => {
    let ignore = false;
    
    if (!ignore) { 
      if(title!=null){
        CreatePodcast();
      }
    } 
    return () => { ignore = true; }
    },[]);



    const { loading, error, data } = useQuery(PLAYLISTS_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    var likedPodcasts = null;
    data.playlists.forEach(element => {
      if(element.id==4){
        likedPodcasts = element;
      }
    });
    var me = data.me;

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  <p className="text-muted mb-1">
                  {me.isStaff ? "Admin":"Regular User"}</p>

              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nickname</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{me.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{me.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody data-mdb-perfect-scrollbar="true" className="liked-card">

                    <MDBCardText className="mb-4">Liked Podcasts</MDBCardText>
                    { likedPodcasts.podcasts.map((podcast) => (
                    <div class="d-flex justify-content-between align-items-center flex-row">
                    <div class=""><MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{podcast.title}</MDBCardText></div>
                      <div class="d-flex  align-items-center flex-row">
                    
                        <MDBBtn color='light' rippleColor='dark' >
                          Info
                        </MDBBtn>
                        <button id={podcast.id} type="button" class="btn-close mx-1" aria-label="Close"></button>
                      </div>
                    </div>
                    ))}    

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default User;