/**
 * Created by AllenFeng on 2017/9/15.
 */
import React from 'react';
import ReactDOM from'react-dom';
import PropTypes from 'prop-types';

const createContainer = (DecoratorsComponent) => {
    class Container extends React.Component {

        constructor(props) {
            super(props);
            this.div = null;
        }

        static propTypes = {
            visible: PropTypes.bool
        }

        static defaultProps = {
            visible: false
        }

        removeMask = () => {
            this.div && ReactDOM.unmountComponentAtNode(this.div);
            document.body.removeChild(this.div);
            this.div=null;
        }

        componentWillReceiveProps(nextProps) {
            if (!this.div && nextProps.visible) {
                this.div = document.createElement('div');
                document.body.appendChild(this.div);
            }
            this.div && ReactDOM.render(
                <DecoratorsComponent {...nextProps} removeMask={this.removeMask}>{nextProps.children}</DecoratorsComponent>, this.div);
        }


        render() {
            return null;
        }
    }
    return Container;
}

export default createContainer;