import * as React from 'react';
import THREE = require('three');
import {Bar} from "./Bar";
import {Loading} from "../Loading";
import {skills} from "../../data/skills";

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
        const styles = {
            barChart: {
                border: "1px solid #eeeeee",
                width: "calc(100% + 4px)",
                height: skills.length * 16 + 2,
                opacity: this.state.isHovered ? 1 : 0.8,
                transition: "opacity 200ms"
            }
        };
        return (
            <div>
                {this.state.isMounted
                    ?   <div style={ styles.barChart }
                               onMouseEnter={() => this.handleMouseEnter()}
                               onMouseLeave={() => this.handleMouseLeave()}>
                            {skills.map((bar, i) =>
                                <Bar key={i} index={i} bar={bar} isBarChartMounted={this.state.isMounted}/>)}
                        </div>
                    :   <Loading
                            loadingMessage={"loading skills"}
                        />}
            </div>

        );
    }
}
