// dataStore.js

class DataStore {
    constructor() {
        this.data = {};
    }

    // Method to set data
    set(key, value) {
        this.data[key] = value;
    }

    // Method to get data
    get(key) {
        return this.data[key];
    }

    // Method to remove data
    remove(key) {
        delete this.data[key];
    }

    // Method to clear all data
    clear() {
        this.data = {};
    }
}

module.exports = DataStore;