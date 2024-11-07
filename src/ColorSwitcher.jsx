import React from "react";

 function ColorSwitcher ({toggleTheme}) {
    return(
        <button className="color-toggle-btn" onClick={toggleTheme}
        >Cambiar Tema</button>
    );
}

export default ColorSwitcher;