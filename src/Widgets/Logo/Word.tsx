import * as React from 'react';
import {Letter} from "./Letter";

interface IProps {
    word: string
    isLogoHovered: boolean
    isDarkTheme?: boolean
}

interface IState {
}

export class Word extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const style = {
            display: "inline-block"
        };
        let word = this.props.word.split('');
        return (
            <div style={style}>
                {word.map((letter, i) =>
                    <Letter
                        key={i}
                        letter={letter}
                        isLogoHovered={this.props.isLogoHovered}
                        isDarkTheme={this.props.isDarkTheme}
                    />)}
            </div>
        );
    }
}
