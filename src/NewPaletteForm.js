import * as React from 'react';
import seedColors from './seedColors'
import NewPaletteNav from './NewPaletteNav'
import NewColorPicker from './NewColorPicker'
import DraggableColorBoxList from './DraggableColorBoxList'
import {useState,} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {arrayMoveImmutable} from 'array-move'

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)", 
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NewPaletteForm(props) {

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  }

  const [color, setColor] = useState('purple')
    const changeColor = (newColor) => {
    setColor(newColor.hex)
    }

  const [colors, setColors] = useState(seedColors[0].colors)
  const addNewColor = (colorObj) => {
    setColors([...colors, colorObj])
  }

  const deleteNewColor = (name) => {
    setColors(colors.filter(color => (
      name !== color.name
    )))
  }

  const removeAllNewColors = () => {
    setColors([])
  }

  const randomColor = () => {
    const everyColor = props.palettes.map(palette => palette.colors).flat()
    const randIdx = Math.floor(Math.random() * everyColor.length)
    const chosenColor = everyColor[randIdx]
    if (colors.some(color => color.name === chosenColor.name)) {
      randomColor()
    }
    else {
      setColors([...colors, {name: chosenColor.name, color: chosenColor.color}])
    }
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
  };

  const handleSavePalette = (paletteInfo) => {
    const paletteName = paletteInfo.paletteName
    const paletteId = paletteInfo.paletteName.toLowerCase().replace(/ /g, "-")
    const emoji = paletteInfo.emoji
    const newPalette = {colors: colors, paletteName: paletteName, id: paletteId, emoji: emoji}
    props.savePalette(newPalette)
    props.history.push('/')
  }

  const maxColors = 20;
  const paletteFull = colors.length >= maxColors;
  
  return (
    <Box sx={{ display: 'flex'}}>

      <NewPaletteNav open={open} palettes={props.palettes} 
        handleDrawerOpen={handleDrawerOpen} handleSavePalette={handleSavePalette}/>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </DrawerHeader>

        <NewColorPicker colors={colors} changeColor={changeColor} color={color} paletteFull={paletteFull} addNewColor={addNewColor}
          removeAllNewColors={removeAllNewColors} randomColor={randomColor}/>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
          <DraggableColorBoxList distance={20} onSortEnd={onSortEnd} axis='xy' 
            colors={colors} deleteNewColor={deleteNewColor}/>
      </Main>

    </Box>
  );
}

export default NewPaletteForm