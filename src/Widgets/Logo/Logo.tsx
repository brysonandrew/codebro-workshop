import * as React from 'react';
import THREE = require('three');
import { Word } from './Word';

interface ILogoProps {
    isDarkTheme?: boolean
}

interface ILogoState {
    isHovered?: boolean
    isLogoShort?: boolean
}

export class Logo extends React.Component<ILogoProps, ILogoState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isLogoShort: true
        };
    }

    handleClick() {
        this.setState({
            isLogoShort: !this.state.isLogoShort,
            isHovered: false
        });
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    render(): JSX.Element {
        let style = {
            display: "inline-block",
            cursor: "pointer",
            opacity: this.state.isHovered ? 1 : 0.8,
            transition: "opacity 200ms"
        };
        let words = this.state.isLogoShort ? ["c", "b"] : ["code", "bro"];

        return (
            <div style={style}
                 onClick={() => this.handleClick()}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            >
                {words.map((word, i ) =>
                    <Word
                        key={i}
                        word={word}
                        isDarkTheme={this.props.isDarkTheme}
                        isLogoHovered={this.state.isHovered}
                    />)}
            </div>
        );
    }
}
