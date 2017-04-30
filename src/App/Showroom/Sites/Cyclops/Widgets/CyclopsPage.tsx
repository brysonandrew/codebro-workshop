import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../redux/main_reducer';
import { IPage, ISavedParams } from "../cyclopsData/models";
import { saveParams } from '../CyclopsActionCreators';

interface IProperties {
    width?: number
    activePageIndex?: number
    isMenuOpen?: boolean
    savedParams?: ISavedParams
}

interface ICallbacks {
    onSaveParams?: (nextSavedParams: ISavedParams) => void
}

interface IProps extends IProperties, ICallbacks {
    pageIndex?: number
    content?: IPage
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    animateCount?: number
}

export class CyclopsPage extends React.Component<IProps, IState> {

    timerId;
    pageRef;
    scroll;
    animateId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            animateCount: 0
        }
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({
                isMounted: true
            })
        }, 0);
    }

    componentWillReceiveProps(nextProps) {
        let { content } = this.props;

        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            const isSelected = nextProps.savedParams.activePagePath
                === this.nameToPath(content.name);
            const needsAction = nextProps.savedParams.needsAction;
            if (needsAction && isSelected) {
                if (document.body) {
                    this.scroll = {y: document.body.scrollTop};
                } else {
                    this.scroll = {y: document.documentElement.scrollTop};
                }
                this.animate();
                //reset action
                const nextSavedParams = {
                    activePagePath: nextProps.savedParams,
                    needsAction: false
                };
                this.props.onSaveParams(nextSavedParams);
            }
        }
    }


    componentWillUnmount() {
        cancelAnimationFrame(this.animateId);
    }

    nameToPath(string) {
        return string.replace(/\s/g, "-") //replace spaces with hyphens
            .replace(/,/g, "")   //remove commas
            .toLowerCase();
    }

    animate() {
        const { animateCount } = this.state;
        const headerHeight = 0;
        this.animateId = requestAnimationFrame( this.animate.bind(this) );
        if (animateCount <= 20) {
            if (document.body) {
                document.body.scrollTop = this.scroll.y
                    //current scroll pos
                    + (this.pageRef.offsetTop
                    - this.scroll.y - headerHeight) * animateCount
                    //scroll distance to travel
                    / 20;
                //animation factor
            } else {
                document.documentElement.scrollTop = this.scroll.y
                    //current scroll pos
                    + (this.pageRef.offsetTop
                    - this.scroll.y - headerHeight) * animateCount
                    //scroll distance to travel
                    / 20;
                //animation factor
            }
            this.setState({ animateCount: animateCount + 1 });
        } else {
            this.setState({ animateCount: 0 });
            cancelAnimationFrame(this.animateId);
        }
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { content } = this.props;

        const styles = {
            cyclopsPage: {
                position: "relative",
                background: "#fafafa",
                padding: "100px 20vw 0 20vw",
                width: "60vw",
                height: "100vh",
                textAlign: "center",
                opacity: isMounted ? 1 : 0,
                transition: "opacity 1000ms"
            },
            cyclopsPage__inner: {
                fontSize: 18
            }
        };
        return (
            <div style={ styles.cyclopsPage } ref={el => this.pageRef = el}>
                <div style={ styles.cyclopsPage__inner }>
                    {content.textContent.map((paragraph, i) =>
                        <p key={i}>
                            {paragraph}
                        </p>)}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.sphinxStore.width,
        isMenuOpen: state.sphinxStore.isMenuOpen,
        activePageIndex: state.sphinxStore.activePageIndex,
        savedParams: state.cyclopsStore.savedParams
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onSaveParams: (nextSavedParams) => {
            dispatch(saveParams(nextSavedParams));
        }
    }
}

export let CyclopsPageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(CyclopsPage);
