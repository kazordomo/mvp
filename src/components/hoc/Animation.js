import React, { Component } from 'react';

/*
    HOC that determines when to start and clear the animation.
    The "style" of the animation itself is done in the base component.
*/

const withAnimation = (BaseComp, animationDelay = 75) => {
    class AnimationHOC extends Component {

        state = {
            timeout: null,
            activateAnimation: false,
            customDelay: null,
        }
    
        componentDidMount() {
            // Haxx - put last in event loop to get eventual value from customDelay.
            setTimeout(() => {
                const { customDelay } = this.state;
                setTimeout(() => this.setState({ activateAnimation: true }), customDelay ? customDelay : animationDelay);
            }, 0);
        }
    
        componentWillUnmount() {
            const { timeout } = this.state;
            this.setState({ timeout: null }, () => {
                clearTimeout(timeout);
            });
        }

        // Use if multiple elements with different animation-delays.
        setCustomAnimationDelay = customDelay => this.setState({ customDelay });
        
        render () {
            return <BaseComp 
                setCustomAnimationDelay={this.setCustomAnimationDelay} 
                activeAnimation={this.state.activateAnimation} 
                {...this.props} 
            />
        }
    
    }

    return AnimationHOC;
}

export default withAnimation;