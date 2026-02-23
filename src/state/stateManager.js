'use strict';

class StateManager {
    constructor() {
        this.state = {};
    }

    // Method to get the state
    getState() {
        return this.state;
    }

    // Method to set the state
    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    // Method to subscribe to changes
    subscribe(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    }

    // Notify all listeners about state change
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

export default StateManager;
