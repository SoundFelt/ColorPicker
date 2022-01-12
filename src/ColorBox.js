import './ColorBox.css'
import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Link} from 'react-router-dom'
import chroma from 'chroma-js'

function ColorBox({background, name, moreUrl, useLink}) {
    const [copying, setCopying] = useState(false)
    const copyingIsTrue = () => {
        setCopying(true)
        setTimeout(() => setCopying(false), 1500)
    }

    const contrastClass = chroma.contrast(background, "white") <= 4.5 ? "dark-text" : "light-text"

    return (
        <CopyToClipboard text={background} onCopy={copyingIsTrue}>
        <div className="color-box" style={{backgroundColor: background}}>
            <div className={`color-box-grow ${copying && "show"}`} style={{backgroundColor: background}}></div>
            <div className={`color-box-copied-text ${copying && "show"}`}>
                <h1 className={contrastClass}>COPIED!</h1>
                <p className={contrastClass}>{background}</p>
            </div>
            <button className={`color-copy ${contrastClass}`}>COPY</button>
            <div className="color-box-content">
                <span className={`color-title ${contrastClass}`}>{name}</span>
                {useLink &&
                <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
                <span className={`color-more ${contrastClass}`}>MORE</span>
                </Link>
                }
            </div>
        </div>
        </CopyToClipboard>
    )
}

export default ColorBox