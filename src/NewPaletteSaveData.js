import {useState, useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function NewPaletteSaveData(props) {

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return props.palettes.every(palette => (
                 palette.paletteName.toLowerCase() !== value.toLowerCase()
            )) 
        });
    }) 

    const [paletteName, setNewName] = useState('')
    const setInput = (e) => {
      setNewName(e.target.value)
    }

    const [firstStage, setStage] = useState(true)
    const handleStageChange = () => {
        setStage(!firstStage)
    }

    const handleSubmit = (emoji) => {
        const newPalette = {paletteName: paletteName, emoji: emoji.native}
        props.handleSavePalette(newPalette)
        props.hideDialog()
    }
  return (
    <div>
      <Dialog open={firstStage} onClose={props.hideDialog}>
      <ValidatorForm onSubmit={handleStageChange}>

        <DialogTitle>Enter Palette Name 🎨</DialogTitle>
        
        <DialogContent>

          <DialogContentText style={{margin: '10px 0'}}>
            Please enter the name of your new palette.
          </DialogContentText>

        <TextValidator
          value={paletteName}
          autoFocus
          onChange={setInput}
          variant='standard'
          label='Palette Name'
          fullWidth
          validators={['required', 'isPaletteNameUnique']}
          errorMessages={['Enter a palette name!', 'Palette name must be unique!']}
        />

        </DialogContent>

        <DialogActions>
            <Button onClick={props.hideDialog}>Cancel</Button>
            <Button type="submit" variant="text">Next</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
     
      <Dialog open={!firstStage} onClose={props.hideDialog}>
        <DialogTitle>Choose a palette emoji!</DialogTitle>

        <Picker onSelect={handleSubmit}/>

        <DialogActions>
        <Button onClick={handleStageChange}>Go Back</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}

export default NewPaletteSaveData