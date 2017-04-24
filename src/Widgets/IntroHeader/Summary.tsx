import * as React from 'react';
import { skills } from "../../data/skills";

interface IProps {}

interface IState {
    isHovered?: boolean
    isMounted?: boolean
}

export class Summary extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isMounted: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isMounted: true
            })
        }, 0)
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
        const { isHovered, isMounted } = this.state;
        const styles = {
            summary: {
                border: isHovered
                            ? "1px solid #757575"
                            : "1px solid #eeeeee",
                padding: 4,
                fontSize: 14,
                background: "#eeeeee",
                color: "#212121",
                transform: isHovered
                            ? "scale(1.05)"
                            : isMounted
                                ? "scale(1)"
                                : "scale(0)",
                cursor: "pointer",
                transition: isMounted
                                ? "transform 200ms"
                                : "transform 400ms",
                transitionDelay: "800ms"
            }
        };
        return (
            <div style={ styles.summary }
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {"Hey, I'm a web-developer who loves creating animations and interesting UIs. I am inspired by UI of popular apps and playstation games."}
            </div>

        );
    }
}
