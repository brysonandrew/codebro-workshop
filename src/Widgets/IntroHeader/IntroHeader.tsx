import * as React from 'react';
import THREE = require('three');
import { addComponentCSS} from '../../utils/css_styler';
import { BarChart } from './BarChart/BarChart';
import { skills } from "../../data/skills";
import { ProfileImage } from "./ProfileImage";
import { Summary } from "./Summary";


addComponentCSS({
    //language=CSS
    default: `
    .introHeader {
    }
    `
});

interface IIntroHeaderProps {
    isOnFrontPage: boolean
}

interface IIntroHeaderState {
    isHovered?: boolean
    isMounted?: boolean
    isVisible?: boolean
}

export class IntroHeader extends React.Component<IIntroHeaderProps, IIntroHeaderState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isMounted: false,
            isVisible: this.props.isOnFrontPage
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOnFrontPage !== this.props.isOnFrontPage) {
            this.setState({
                isVisible: nextProps.isOnFrontPage
            });
        }
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({
                isMounted: true
            })
        }, 0)
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        })
    }

    render(): JSX.Element {
        const styles = {
            introHeader: {
                opacity: this.state.isVisible && this.state.isMounted ? 1 : 0,
                transition: "opacity 800ms"
            },
            introHeader__profileImage: {
                display: "inline-block",
                width: "auto"
            },
            introHeader__barChart: {
                display: "inline-block",
                width: 200
            },
            introHeader__summary: {
                position: "relative",
                left: 2,
                width: 314
            }
        };
        return (
            <div style={ styles.introHeader }>
                <div>
                    <div style={ styles.introHeader__profileImage }>
                        <ProfileImage/>
                    </div>
                    <div style={ styles.introHeader__barChart }>
                        <BarChart/>
                    </div>
                </div>
                <div style={ styles.introHeader__summary }>
                    <Summary/>
                </div>
            </div>
        );
    }
}
