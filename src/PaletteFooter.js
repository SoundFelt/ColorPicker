function PaletteFooter(props) {
    return ( 
        <div className="footer-container">
                <footer>
                    <p>{props.paletteName}</p>
                    <span>{props.emoji}</span>
                </footer>
            </div>
     );
}

export default PaletteFooter;