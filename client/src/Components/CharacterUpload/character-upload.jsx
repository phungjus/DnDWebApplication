import React from 'react';
import character from '../../images/character.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './character-upload-styles.css';
import { addImage } from "../../Actions/Characters";

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
                <img className='character-image' alt="This is your character." src = { this.state.selectedPic }/>
                <div className = 'side-bar'>
                    <form className="image-form" onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target)
                        addImage(e.target);
                    }}>
                        <div class="image-form__field">
                            <label>Image:</label>
                            <input name="image" type="file" onChange={this.picSelectedHandler}/>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="image-form__submit-button"
                        >
                            Upload
                        </Button>
                    </form>
                </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Character Name"
                    variant="filled"
                    InputProps={{
                        color: "white"
                      }}
                    onChange={this.props.onNameChange}
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Personality Traits"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={this.props.onPersonalityChange}
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Ideals"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={this.props.onIdealsChange}
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Bonds"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={this.props.onBondsChange}
                    />
                    </div>
                    <div className = 'side-bar'>
                    <TextField
                    className='input'
                    label="Flaws"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={this.props.onFlawsChange}
                    />
                </div>
            </div>
        );
    }
}

export default CharacterUpload;


