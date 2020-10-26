import React from 'react';
import CharacterUpload from './character-upload.jsx'
import Alignment from './alignment.jsx'
import './character-creation-page-styles.css'

const CharacterCreatePage = () => (
  <div>
  <div class='title'><h1 class='title'>LET'S MAKE A CHARACTER</h1></div>
  <div className='charactercreatepage'>
    <CharacterUpload/>
    <Alignment/>
  </div>
  </div>
);

export default CharacterCreatePage;