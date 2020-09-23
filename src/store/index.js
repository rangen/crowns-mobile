import React from 'react';
import { action, observable, flow, computed } from 'mobx';
import api from '../services';

export default class Store {
    @observable normalizedAddress = '';
    @observable addressInput = '2502 buffalo pass austin tx';
    @observable checkingAddress = false;
    @observable retrievingData = false;
    @observable state = null;
    @observable district = null;
    @observable reps = [];
    @observable senators = [];
    @observable geoJSON = {};
    @observable mapScriptLoaded = false;
    gMap = null;

    checkAddress = flow(function* () {
        const store = this;

        store.checkingAddress = true;
        const addressReply = yield api.checkAddress(store.addressInput);
        store.checkingAddress = false;

        if (addressReply.ok) {
            store.state = addressReply.state;
            store.district = addressReply.cd;
            store.normalizedAddress = addressReply.normalizedAddress;
            store.getDistrictData();
            store.getStateData();
            store.getDistrictGeoJSON();
        } else {
            store.addressError = true;
        }

    }).bind(this);

    @action setAddressInput(data) {
        this.addressInput = data;
        this.addressError = false;
        this.state = null;
        this.district = null;
        this.normalizedAddress = '';
        this.reps = [];
        this.senators = [];
        this.geoJSON = {};
    }

    @action async getDistrictData() {
        this.reps = await api.getDistrictData(this.state, this.district);
    }

    @action async getStateData() {
        this.senators = await api.getStateData(this.state);
    }

    @action async getDistrictGeoJSON() {
        this.geoJSON = await api.getDistrictGeoJSON(this.state, this.district);
    }

    @computed get senatorsLoaded() {return !!this.senators.length}

    @computed get repsLoaded() {return !!this.reps.length}

    @computed get polygonLoaded() {return !!this.geoJSON.geometry}
    
    @computed get addressResolved() {return !!this.normalizedAddress}
}

const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

export const useStore = () => React.useContext(StoreContext);

export const withStore = (Component) => props => {
    return <Component {...props} store={useStore()} />;
}
