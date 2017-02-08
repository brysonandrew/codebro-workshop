import * as React from 'react';
import {addComponentCSS} from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
        @font-face {
            font-family: Oxygen;
            src: url(/fonts/Oxygen/Oxygen-Regular.ttf);
        }
        
        @font-face {
            font-family: Poppins;
            src: url(/fonts/Poppins/Poppins-Regular.ttf);
        }
        
        @font-face {
            font-family: UrbanJungle;
            src: url(/fonts/UrbanJungle/UrbanJungle.otf);
        }
        
        @font-face {
            font-family: Shock;
            src: url(/fonts/Shock/Shock.otf);
        }
        
        @font-face {
            font-family: Teko;
            src: url(/fonts/Teko/Teko-Light.ttf);
        }

        * {
            margin: 0; 
            padding: 0;
            font-family: Oxygen, 'arial', sans-serif;
            -webkit-appearance: none 
        }
        
        body {
            background: #212121;
        }

        button, input, a {
            background: none;
            border: none;
            outline: none;
            text-decoration: none;
        }
        p {
            margin: 2vh 0;
        }
    `
});


export class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
