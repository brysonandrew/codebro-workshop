import * as React from 'react';

interface IProps {
    info: any
}

interface IState {}

export class Sphinx extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        console.log(this.props.info);
    }

    render(): JSX.Element {

        const styles = {
            sphinx: {
                color: "#212121"
            }
        };

        return (
            <div style={styles.sphinx}>
                <h1>Sphinx</h1>
            </div>
        );
    }
}
