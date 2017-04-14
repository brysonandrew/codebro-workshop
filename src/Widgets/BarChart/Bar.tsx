import * as React from 'react';
import THREE = require('three');
import {IBar} from "../../models";

interface IBarProps {
    bar: IBar
    index: number
    isBarChartMounted: boolean
}

interface IBarState {
}

export class Bar extends React.Component<IBarProps, IBarState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        let { bar, index, isBarChartMounted } = this.props;
        let styles = {
            bar: {
                position: "relative",
                left: 2,
                width: "calc(100% - 4px)"
            },
            bar__heading: {
                position: "absolute",
                left: 10,
                top: index * 16 + 2,
                fontSize: 10,
                color: "#212121",
            },
            bar__quantity: {
                position: "absolute",
                left: 0,
                top: index * 16 + 2,
                background: "#eeeeee",
                height: 14,
                width: `${bar.quantity}%`,
                transform: `scale(${this.props.isBarChartMounted ? 1 : 0}) translateX(${this.props.isBarChartMounted ? "0%" : "-50%"})`,
                transition: "transform 500ms"
            }
        };
        return (
            <div style={ styles.bar }>
                <div style={ styles.bar__quantity }></div>
                <div style={ styles.bar__heading }>{bar.heading}</div>
            </div>
        );
    }
}
