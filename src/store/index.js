import React from 'react';
import { action, observable, flow } from 'mobx';
import api from '../services';

export default class Store {
    @observable normalizedAddress = '';
    @observable addressInput = '2502 buffalo pass austin tx';
    @observable checkingAddress = false;
    @observable retrievingData = false;
    @observable state = null;
    @observable district = null;

    checkAddress = flow(function* () {
        const store = this;

        store.checkingAddress = true;
        const addressReply = yield api.checkAddress(store.addressInput);
        store.checkingAddress = false;

        if (addressReply.ok) {
            store.state = addressReply.state;
            store.district = addressReply.cd;
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
    }

    @action getDistrictData() {
        api.getDistrictData(this.state, this.district);
    }

    @action getStateData() {
        api.getStateData(this.state);
    }

    @action getDistrictGeoJSON() {
        api.getDistrictGeoJSON(this.state, this.district);
    }
}

const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

export const useStore = () => React.useContext(StoreContext);

export const withStore = (Component) => props => {
    return <Component {...props} store={useStore()} />;
}
