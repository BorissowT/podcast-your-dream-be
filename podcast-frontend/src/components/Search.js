import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Search.css";
import $ from 'jquery';


const Search = () => {

const myInterests = [];

function checkIfItemInInterests(item){
    var state = true;
    myInterests.forEach((element)=>{
      if(element==item){
        state = false;
      }
    })
    return state;
}

function removeItemFromInterests(info, $item){
  $item.remove();
  for(var i = 0; i < myInterests.length; i++){
    if(myInterests[i] == info)
      myInterests.splice(i,1);
    }
  renderList();
}

function disableGetPodcastsButton(){
  $("#getPlaylistBtn").attr("disabled","");
}

function enableGetPodcastsButton(){
  $("#getPlaylistBtn").removeAttr("disabled");
}

function renderList(){
  if(myInterests.length==1 && $('#interests_title').length==0){
    $("#tags-box-title").append($("<h3 id='interests_title'>My tags:</h3>"));
  }
  if(myInterests.length==0){
    disableGetPodcastsButton();
  }
  if(myInterests.length>0){
    enableGetPodcastsButton();
  }
  $('#tags-box').empty();
  for (const tag of myInterests) {
    const $item = $('<div class="item"></div>').text(tag);
    $item.on('click', ()=>removeItemFromInterests(tag, $item))
    $('#tags-box').append($item)
  }
}

function addToMyIntersts(info){
    if(checkIfItemInInterests(info)){
    myInterests.push(info);
    renderList();
    }
    else
      throw "Element is already added";
}  

function addTagFromField(){
    return new Promise((resolve, reject)=>{
      const info = $('#tagsField').eq(0).val();
      if(info.length > 2){
        addToMyIntersts(info);
        $('#tagsField').eq(0).val('');
        return resolve(info);
      }
      else{
  
        return reject("error");
      }
  });
}

function handleClick() {
  addTagFromField();
  }

  return (
    <div class="search-container">
      <div class="title"><h1 >Search Engine</h1></div>
      <div class="d-flex flex-row justify-content-center">
        <input
          type="text"
          class="form-control "
          id="tagsField"
          placeholder="Anything you are interseted in..."
        />
        <span class="input-group-btn">
          <button onClick={handleClick} id="addButton" class="btn btn-light" type="button">
            Add!
          </button>
        </span>
      </div>
      <div class="d-flex justify-content-center px-2 mt-3">
            <button id="getPlaylistBtn"  class="btn btn-light btn-lg" disabled>
              Get podcasts
            </button>
      </div>
      <div id="tags-box-title" class="m-2 d-flex flex-row justify-content-center"></div>
      <div id="tags-box" class="d-flex flex-wrap"></div>
    </div>
  );
};

export default Search;
