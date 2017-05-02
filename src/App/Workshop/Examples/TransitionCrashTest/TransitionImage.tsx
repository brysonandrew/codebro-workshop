import * as React from 'react';

interface IProps {
    isActive: boolean
}

interface IState {
    isMounted: boolean
}

export class TransitionImage extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isActive) {
            this.setState({ isMounted: true })
        }
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ isMounted: true })
        // }, 0)
    }

    handleTransitionEnd() {
        this.setState({
            isMounted: false
        })
    }

    render(): JSX.Element {
        const styles = {
            transitionImage: {
                height: 280,
                width: "auto",
                margin: "10px 0",
                opacity: this.props.isActive ? 1 : 0,
                transition: "opacity 800ms"
            }
        };
        return (
            this.state.isMounted &&
            <img style={ styles.transitionImage }
                 onTransitionEnd={() => this.handleTransitionEnd()}
                 src={"/images/workshop/examples/transition-crash-test/van-damme.png"}/>
        );
    }
}
