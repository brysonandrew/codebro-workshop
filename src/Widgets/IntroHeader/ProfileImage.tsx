import * as React from 'react';
import { skills } from "../../data/skills";

interface IProps {}

interface IState {
    isHovered?: boolean
    isMounted?: boolean
}

export class ProfileImage extends React.Component<IProps, IState> {

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
            profileImage: {
                border: isHovered
                            ? "1px solid #757575"
                            : "1px solid #eeeeee",
                height: skills.length * 16 + 2,
                width: "auto",
                transform: isHovered
                            ? "scale(1.05)"
                            : isMounted
                                ? "scale(1)"
                                : "scale(0)",
                cursor: "pointer",
                transition: isMounted
                                ? "transform 200ms"
                                : "transform 400ms",
            }
        };
        return (
            <img style={ styles.profileImage }
                 src={"/images/personal/thumbnailScaled50.jpg"}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            />

        );
    }
}
