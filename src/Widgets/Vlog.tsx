import * as React from 'react';
import { addComponentCSS } from '../utils/css_styler';
import { awesomeColors } from '../data/awesomeColors';
import { Logo } from './Logo/Logo'
import { IHomeParams } from '../models';

addComponentCSS({
    //language=CSS
    default: `
        @keyframes breathe {
            0%   { opacity: 0; }
            100% { opacity: 1; }
        }
    `
});

interface IVlogProps {}

interface IVlogState {
    isActivated: boolean
}

export class Vlog extends React.Component<IVlogProps, IVlogState> {

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
            vlog: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "#eeeeee"
            },
            vlog__inner: {
                position: "absolute",
                textAlign: "center",
                top: "20vh",
                left: "10vw",
                width: "80vw",
                height: "100vh"
            },
            vlog__feature: {
                position: "absolute",
                top: "20%",
                left: "50%",
                padding: "4px 10px",
                background: "#eeeeee",
                transform: "translate(-50%, -50%)",
                zIndex: 10
            },
            vlog__featurePic: {
                width: 600,
                height: "auto",
            },
            vlog__box: {
                float: "left",
                position: "relative",
                width: 40,
                height: 40
            },
            vlog__codeBroLogo: {
                position: "absolute",
                left: "4vw",
                top: "2vh",
                height: 100,
                width: "100%",
                textAlign: "left"
            },
            vlog__videoTitle: {
                fontSize: 60,
                width: "100%"
            }
        };
        return (
            <div style={styles.vlog}>
                <div style={styles.vlog__codeBroLogo}>
                    <Logo
                        isDarkTheme={true}
                    />
                </div>
                <div style={styles.vlog__inner} onClick={() => this.handleClick()}>
                    <div style={styles.vlog__feature}>
                        <img style={styles.vlog__featurePic}
                             src={"/images/blogPosts/screenshotsWithPhantomjsAndSlimerjs/phantomjs.png"}
                        />
                        <div style={styles.vlog__videoTitle}>
                            Screenshots with PhantomJS
                        </div>
                    </div>
                    {this.array.map((_, i) =>
                        <div key={i}
                             style={Object.assign({},
                                styles.vlog__box,
                                {background: awesomeColors[i]})}/>)}
                </div>
            </div>
        );
    }
}
