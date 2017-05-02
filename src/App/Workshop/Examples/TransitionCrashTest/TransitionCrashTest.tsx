import * as React from 'react';
import { Button } from '../../../../Widgets/Button/Button';
import { TransitionImage } from './TransitionImage';

interface IProps {}

interface IState {
    // isMounted: boolean
    isActive: boolean
}

export class TransitionCrashTest extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            // isMounted: false,
            isActive: false
        }
    }

    componentDidMount() {
        // this.setState({
        //     isMounted: true
        // })
    }

    handleClick() {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render(): JSX.Element {
        const styles = {
            transitionCrashTest: {
                textAlign: "center"
            },
            transitionCrashTest__subject: {
            }
        };
        return (
            <div style={ styles.transitionCrashTest }>
                <TransitionImage
                    isActive={this.state.isActive}
                />
                <Button
                    text={"Transition It"}
                    onClick={() => this.handleClick()}
                />
            </div>
        );
    }
}
