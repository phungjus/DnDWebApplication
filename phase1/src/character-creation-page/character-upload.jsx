import React from 'react';
import character from '../images/character.jpg'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './character-upload-styles.css'

const CharacterUpload = () => (
    <div className='character-upload'>
        <img className='character-image' src = { character }/>
        <div className = 'side-bar'>
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
        </div>
        <div className = 'side-bar'>
        <TextField
          id="filled-multiline-static"
          className='input'
          label="Personality Traits"
          multiline
          rows={4}
          variant="filled"
        />
        </div>
        <div className = 'side-bar'>
        <TextField
          id="filled-multiline-static"
          className='input'
          label="Ideals"
          multiline
          rows={4}
          variant="filled"
        />
        </div>
        <div className = 'side-bar'>
        <TextField
          id="filled-multiline-static"
          className='input'
          label="Bonds"
          multiline
          rows={4}
          variant="filled"
        />
        </div>
        <div className = 'side-bar'>
        <TextField
          id="filled-multiline-static"
          className='input'
          label="Flaws"
          multiline
          rows={4}
          variant="filled"
        />
        </div>
    </div>
);

export default CharacterUpload;
