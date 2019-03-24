import React, { Component } from 'react';

export default class A2HS extends Component {

    state = {
        deferredPrompt: null,
    }

    componentDidMount() {
        window.addEventListener('beforeinstallprompt', e => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.setState({ deferredPrompt: e }, this.showA2HS);
        });
    
        window.addEventListener('appinstalled', () => {
            console.log('A2HS', 'installed');
        });
    }

    showA2HS = () => {
        const button = document.querySelector('#A2HS');
        button.style.display = 'block';
        button.addEventListener('click', this.onA2HS);
    }

    onA2HS = async () => {  
        const button = document.querySelector('#A2HS');
        button.style.display = 'none';
        this.deferredPrompt.prompt(); 
        const choiceResult = await this.deferredPrompt.userChoice();
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        this.setState({ deferredPrompt: null });
    }

    render () {
        return <button id="A2HS" style={{ display: 'none' }}>Add to homescreen</button>;
    }
}