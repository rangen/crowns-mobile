import React from 'react';
import { action, observable, flow, computed, reaction } from 'mobx';
import api from '../services';
import noSenate from '../misc/noSenateElection';

export default class Store {
    @observable normalizedAddress = '';
    @observable addressInput = '5205 buffalo pass austin texas';
    @observable checkingAddress = false;
    @observable retrievingData = false;
    @observable state = null;
    @observable district = null;
    @observable reps = [];
    @observable senators = [];
    @observable geoJSON = null;
    @observable mapScriptLoaded = false;
    @observable menuOpen = false;
    @observable currentPage = 'home'; //home map support politician
    
    gMap = null;
    addressRegion = '';

    checkAddress = flow(function* () {
        const store = this;

        store.checkingAddress = true;
        const addressReply = yield api.checkAddress(store.addressInput);
        store.checkingAddress = false;

        if (addressReply.ok) {
            store.state = addressReply.state;
            store.district = addressReply.cd;
            store.normalizedAddress = addressReply.normalizedAddress;
            store.addressRegion = addressReply.addressRegion;
            store.fetchS3Data();
        } else {
            store.addressError = true;
        }

    }).bind(this);

    @action fetchS3Data() {
        this.getDistrictData();
        this.getDistrictGeoJSON();
        if (noSenate.includes(this.state)) return;
        this.getStateData();
    }

    @action setAddressInput(data = '') {
        this.addressInput = data;
        this.addressError = false;
        this.state = null;
        this.district = null; 
        this.normalizedAddress = '';
        this.addressRegion = '';
        this.reps = [];
        this.senators = [];
        this.geoJSON = null;
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

    @action setPage(value) {
        this.menuOpen = false;
        if (value !== this.currentPage) {
            this.currentPage = value;
        }
    }

    @computed get senatorsLoaded() {return !!this.senators.length}

    @computed get repsLoaded() {return !!this.reps.length}

    @computed get polygonLoaded() {return !!this.geoJSON}
    
    @computed get addressResolved() {return !!this.normalizedAddress}

    drawDistrict = reaction(
        () => this.geoJSON, geoJSON => {
        if (!geoJSON) return;
        this.gMap.data.addGeoJson(geoJSON)

        let bounds = new window.google.maps.LatLngBounds(); 
        
        this.gMap.data.forEach(function(feature){
            feature.getGeometry().forEachLatLng(function(latlng){
                bounds.extend(latlng);
            });
        });

        this.gMap.fitBounds(bounds);
        }
    );
}

const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

export const useStore = () => React.useContext(StoreContext);

export const withStore = (Component) => props => {
    return <Component {...props} store={useStore()} />;
}
