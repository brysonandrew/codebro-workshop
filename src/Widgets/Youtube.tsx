import * as React from 'react';
import { addComponentCSS } from '../utils/css_styler';
import { awesomeColors } from '../data/awesomeColors';
import { Logo } from './Logo/Logo'

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
        this.array = Array.apply(null, Array(2000)).map(String.prototype.valueOf,"_");
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
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "#eeeeee"
            },
            youtube__inner: {
                position: "absolute",
                textAlign: "center",
                top: "20vh",
                left: "10vw",
                width: "80vw",
                height: "100vh"
            },
            youtube__feature: {
                position: "absolute",
                top: "20%",
                left: "50%",
                padding: "4px 10px",
                background: "#eeeeee",
                transform: "translate(-50%, -50%)",
                zIndex: 10
            },
            youtube__featurePic: {
                width: 600,
                height: "auto",
            },
            youtube__box: {
                float: "left",
                position: "relative",
                width: 40,
                height: 40
            },
            youtube__codeBroLogo: {
                position: "absolute",
                left: "4vw",
                top: "2vh",
                height: 100,
                width: "100%",
                textAlign: "left"
            },
            youtube__videoTitle: {
                fontSize: 60,
                width: "100%"
            }
        };
        return (
            <div style={styles.youtube}>
                <div style={styles.youtube__codeBroLogo}>
                    <Logo
                        isDarkTheme={true}
                    />
                </div>
                <div style={styles.youtube__inner} onClick={() => this.handleClick()}>
                    <div style={styles.youtube__feature}>
                        <img src={"/images/blogPosts/screenshotsWithPhantomjsAndSlimerjs/phantomjs.png"} style={styles.youtube__featurePic}/>
                        <div style={styles.youtube__videoTitle}>Screenshots with PhantomJS</div>
                    </div>
                    {this.array.map((_, i) =>
                        <div key={i}
                             style={Object.assign({},
                                styles.youtube__box,
                                {background: awesomeColors[i]})}/>)}
                </div>
            </div>
        );
    }
}
