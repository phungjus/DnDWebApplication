import React from 'react';
import character from '../../images/character.jpg'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './character-upload-styles.css'

class CharacterUpload extends React.Component {
    state = {
        selectedPic: character // default pic 
    }

    picSelectedHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({selectedPic: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    render() {
        return (
            <div className='character-upload'>
                <img className='character-image' src = { this.state.selectedPic }/>
                <div className = 'side-bar'>
                    <input
                    accept="image/*"
                    className="pic-upload"
                    id="contained-button-file"
                    type="file"
                    onChange={this.picSelectedHandler}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                    Upload Picture 
                    </Button>
                </label>
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Character Name"
                    variant="filled"
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Personality Traits"
                    multiline
                    rows={4}
                    variant="filled"
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Ideals"
                    multiline
                    rows={4}
                    variant="filled"
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Bonds"
                    multiline
                    rows={4}
                    variant="filled"
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Flaws"
                    multiline
                    rows={4}
                    variant="filled"
                    />
                </div>
            </div>
        );
    }
}

export default CharacterUpload;


