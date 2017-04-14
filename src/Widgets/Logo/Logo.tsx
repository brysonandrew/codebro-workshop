import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { Word } from './Word';

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
    isLogoShort?: boolean
}

export class Logo extends React.Component<IProps, IState> {

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
            color: "#eeeeee",
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
                        isLogoHovered={this.state.isHovered}
                    />)}
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
    }
}

export let LogoFromStoreStore = connect(
    mapStateToProps, mapDispatchToProps
)(Logo);
