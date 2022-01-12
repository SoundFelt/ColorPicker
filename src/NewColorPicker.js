import * as React from 'react';
import {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import {ChromePicker} from 'react-color'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import chroma from 'chroma-js'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '85%'
    },
    picker: {
        width: '100% !important',
        margin: '20px 0'
    },
    topButtons: {
        width: '50%',
        display: 'inline-block',
        marginTop: '5px',
        fontSize: '0.83rem'
    },
    addColorButton: ({
        width: '100%', 
        height: '3rem', 
        marginTop: '10px',
        color: props => chroma.contrast(props.color, "white") <= 4.5 ? "black" : "white",
        backgroundColor: props => props.color
    }),
})

function NewColorPicker(props) {

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return props.colors.every(colorObj => (
                 colorObj.name.toLowerCase() !== value.toLowerCase()
            )) 
        });
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return props.colors.every(colorObj => (
                 colorObj.color !== props.color
            ))
        });
    })

    const classes = useStyles(props)

    const [colorName, setNewName] = useState('')
    const setInput = (e) => {
      setNewName(e.target.value)
  }

    const handleFormSubmit = () => {
        props.addNewColor({name: colorName, color: props.color})
        setNewName('')
    }

    return (  
        <div className={classes.root}>
        <Typography style={{fontSize: '2rem'}}>Design Your Palette</Typography>
            <div style={{width: '100%'}}>
                <Button className={classes.topButtons} onClick={props.removeAllNewColors} 
                        variant="contained" color="error">Clear Palette</Button>
                <Button className={classes.topButtons} disabled={props.paletteFull} onClick={props.randomColor} 
                        variant="contained" color="primary">Random Color</Button>
            </div>
            <div style={{width: '100%'}}>
        <ChromePicker className={classes.picker} color={props.color} onChange={(newColor) => props.changeColor(newColor)}/>
        </div>
        <ValidatorForm style={{width: '100%'}} instantValidate={false} onSubmit={() => handleFormSubmit()}>
        <TextValidator
          value={colorName}
          onChange={setInput}
          placeholder={'Color Name'}
          style={{width: '100%'}}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['Enter a color name!', 'Color name must be unique!', 'Color can only be chosen once!']}
        />
        <Button disabled={props.paletteFull} type="submit" className={classes.addColorButton} variant="contained">
            {props.paletteFull ? 'Palette Full' : 'Add Color'}
        </Button>
        </ValidatorForm>
        </div>
    );
}

export default NewColorPicker;