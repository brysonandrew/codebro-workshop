import * as React from 'react';
import THREE = require('three');
import { Bar } from "./Bar";
import { Loading } from "../../Loading";
import { skills } from "../../../data/skills";

interface IProps {}

interface IState {
    isHovered?: boolean
    isMounted?: boolean
}

export class BarChart extends React.Component<IProps, IState> {

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
            barChart: {
                border: isHovered
                    ? "1px solid #757575"
                    : "1px solid #eeeeee",
                height: skills.length * 16 + 2,
                width: "calc(100% + 4px)",
                transform: isHovered
                            ? "scale(1.05)"
                            : isMounted
                                ? "scale(1)"
                                : "scale(0)",
                cursor: "pointer",
                transition: isMounted
                                ? "transform 200ms"
                                : "transform 400ms",
                transitionDelay: "400ms"
            }
        };
        return (
            <div style={ styles.barChart }
               onMouseEnter={() => this.handleMouseEnter()}
               onMouseLeave={() => this.handleMouseLeave()}>
                {skills.map((bar, i) =>
                    <Bar key={i}
                         index={i}
                         bar={bar}
                         isBarChartMounted={this.state.isMounted}/>)}
            </div>
        );
    }
}
