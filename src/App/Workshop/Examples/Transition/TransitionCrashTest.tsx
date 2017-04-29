import * as React from 'react';
import {Button} from '../../../../Widgets/Button/Button';

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
                height: 280,
                width: "auto",
                margin: "10px 0",
                opacity: 1,
                transform: this.state.isActive
                            ? "rotate(2070deg)"
                            : "rotate(0deg)",
                transition: "transform 800ms"
            }
        };
        return (
            <div style={ styles.transitionCrashTest }>
                <img style={ styles.transitionCrashTest__subject }
                     src={"https://vignette3.wikia.nocookie.net/vsbattles/images/4/4b/Van_Damme.png/revision/latest?cb=20160527131716"}/>
                <Button
                    text={"Transition It"}
                    onClick={() => this.handleClick()}
                />
            </div>
        );
    }
}
