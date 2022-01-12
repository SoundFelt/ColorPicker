import chroma from 'chroma-js'

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    }
    for (let level of levels) {
        newPalette.colors[level] = []
    }
    for (let color of starterPalette.colors) {
        let scale = getScale(color.color, 10)

        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase(),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css('rgba')
            })
        }
    }
    return newPalette
}

function getScale(hexColor, noOfColors) {
    return chroma
    .scale(['white', hexColor, chroma(hexColor).darken(2).hex()])
    .mode('lab')
    .colors(noOfColors)
}

export {generatePalette}
