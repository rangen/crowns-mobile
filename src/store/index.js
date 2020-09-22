import React from 'react';
import { action, observable, computed } from 'mobx';

export default class Store {
    @observable addressInfo = {};

    @action processAddressLookup(data) {
        this.addressInfo = data.addressInfo;
        this.reps = data.reps;
        this.senators = data.senators;
    };

    @computed get districtLoaded() {
        return !!this.addressInfo.normalized;
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
