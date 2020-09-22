import React from 'react';
import { action, observable, computed } from 'mobx';

export default class Store {
    @observable addressInfo = {};

    @action processAddressLookup(result) {
        if (result.ok) {
            this.addressInfo = {
                valid:      true,
                state:      result.state,
                district:   result.district
            }
        } else {
            this.addressInfo = {
                error:  true,
                valid:  false
            }
        }
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
