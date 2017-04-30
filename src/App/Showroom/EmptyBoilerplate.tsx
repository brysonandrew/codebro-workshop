import * as React from 'react';

interface IProps {}

interface IState {}

export class EmptyBoilerplate extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {

    }

    render(): JSX.Element {
        return (
            <div>
            </div>
        );
    }
}
