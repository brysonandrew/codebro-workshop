import * as React from 'react';
import { addComponentCSS } from '../utils/css_styler';
import { awesomeColors } from '../data/awesomeColors';

addComponentCSS({
    //language=CSS
    default: `
        @keyframes breathe {
            0%   { opacity: 0; }
            100% { opacity: 1; }
        }
    `
});

interface IProps {}

interface IState {
    isActivated: boolean
}

export class Youtube extends React.Component<IProps, IState> {

    array;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isActivated: false
        };
        this.array = Array.apply(null, Array(97)).map(String.prototype.valueOf,"_");
    }

    handleClick() {
        this.setState({
            isActivated: !this.state.isActivated
        })
    }

    render(): JSX.Element {
        let styles = {
            youtube: {
                position: "absolute",
                textAlign: "center",
                top: "50%",
                left: "50%",
                width: 400,
                height: 400,
                transform: "translate(-50%, -50%)"
            },
            youtube__logo: {
                position: "absolute",
                top: "50%",
                left: "50%",
                padding: "4px 10px",
                background: "#eeeeee",
                transform: "translate(-50%, -50%)",
                zIndex: 10
            },
            youtube__logoPic: {
                width: 360,
                height: "auto",
            },
            youtube__box: {
                float: "left",
                position: "relative",
                width: 40,
                height: 40,
                // opacity: this.state.isActivated ? 0 : 1,
                // animation: this.state.isActivated ? "breathe 4000ms" : "none"
            },
            youtube__message: {
                display: "inline-block",
                color: "#212121",
                float: "right",
                height: 40,
                fontSize: 22
            }
        };
        const logo = "https://webassets.mongodb.com/_com_assets/cms/MongoDB-Logo-5c3a7405a85675366beb3a5ec4c032348c390b3f142f5e6dddf1d78e2df5cb5c.png";
        return (
            <div style={styles.youtube} onClick={() => this.handleClick()}>
                <div style={styles.youtube__message}>
                    codebro.io
                </div>
                <div style={styles.youtube__logo}>
                    <img src={logo} style={styles.youtube__logoPic}/>
                    <div>Part 1</div>
                </div>
                {this.array.map((_, i) =>
                    <div key={i}
                         style={Object.assign({},
                                styles.youtube__box,
                                {background: awesomeColors[i]})}/>)}
            </div>
        );
    }
}
