import React from 'react';
import { action, observable, flow, computed, reaction } from 'mobx';
import api from '../services';
import noSenate from '../misc/noSenateElection';
import cookIndices from '../misc/cookIndices';
import states from '../misc/states';

export default class Store {
    @observable normalizedAddress = '';
    @observable addressInput = '';
    @observable checkingAddress = false;
    @observable retrievingData = false;
    @observable state = null;
    @observable district = null;
    @observable reps = [];
    @observable senators = [];
    @observable geoJSON = null;
    @observable menuOpen = false;
    @observable currentPage = 'about'; //home map support politician
    @observable addressRegion = null;
    @observable selectedPolitician = null;
    @observable tweetMonthCode = null;
    @observable tweetPageIndex = null;
    @observable tweetsToDisplay = [];
    @observable stateVotingInfo = null;

    @observable earlyVotingSites = null;
    @observable dropOffLocations = null;
    @observable pollingPlaces = null;
    
    @observable mapSecondaryView = null;  //polling earlyvoting dropoff

    @observable pollingPlaceMarkers = [];
    @observable earlyVoteMarkers = [];
    @observable dropOffMarkers = [];

    @observable politicianTab = 'info';      // info finances tweets
    
    gMap = null;
    pollingMap = null;
    tweetsForSelectedMonth = [];

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
            window.history.pushState({}, null, `/district/${store.state}/${store.district}`)

            yield store.getVoterInfo();

            store.fetchS3Data();
        } else {
            store.addressError = true;
        }

    }).bind(this);

    getVoterInfo = flow(function* () {
        const store = this;

        const voterInfoResponse = yield api.checkVoterInfo(store.normalizedAddress || states[store.state]);
        store.earlyVotingSites = voterInfoResponse.earlyVoteSites;
        store.stateVotingInfo = voterInfoResponse.state && voterInfoResponse.state[0] && voterInfoResponse.state[0].electionAdministrationBody;
        store.pollingPlaces = voterInfoResponse.pollingLocations;
        store.dropOffLocations = voterInfoResponse.dropOffLocations;
        store.createMarkers();
    }).bind(this);

    @action fetchS3Data() {
        const districtIndex = cookIndices.find(x=>x['Dist'] === `${this.state}-${this.district}`)
        this.districtColor = this.fillColor(districtIndex.PVI);
        this.getDistrictData();
        this.getDistrictGeoJSON();
        if (noSenate.includes(this.state)) return;
        this.getStateData();
    }

    @action setPoliticianTab(value) {
        this.politicianTab = value;
    }

    @action setAddressInput(data = '') {
        this.setPage('home');
        window.history.pushState({}, null, '/');
        this.addressInput = data;
        this.addressError = false;
        this.state = null;
        this.district = null; 
        this.normalizedAddress = '';
        this.addressRegion = null;
        this.reps = [];
        this.senators = [];
        this.geoJSON = null;
        this.selectedPolitician = null;
        this.stateVotingInfo = null;
        this.mapSecondaryView = null;
        this.earlyVoteMarkers = [];   // do we need to remove first?
        this.pollingPlaceMarkers = [];
        this.dropOffMarkers = [];
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
        const store = this;
        store.menuOpen = false;
        if (value === 'politician' && store.politicianTab !== 'info') {
            store.politicianTab = 'info';
        }

        if (value !== store.currentPage) {
            store.currentPage = value;
        }
    }

    @action changeTweetPageIndex(value) {
        if (value !== this.tweetPageIndex) {
            this.tweetPageIndex = value;
            this.setSelectedTweets();
        }
    }

    @computed get senatorsLoaded() {return !!this.senators.length}

    @computed get repsLoaded() {return !!this.reps.length}

    @computed get polygonLoaded() {return !!this.geoJSON}
    
    @computed get addressResolved() {return !!this.addressRegion}

    @computed get hasEarlyVotingSites() {return !!this.earlyVotingSites}

    @computed get hasStateVotingInfo() {return !!this.stateVotingInfo}

    @computed get hasPollingPlaces() {return !!this.pollingPlaces}

    @computed get hasDropOffLocations() {return !!this.dropOffLocations}

    @computed get polHasTweets() {return !!this.selectedPolitician.tweets}


    drawDistrict = reaction(
        () => this.geoJSON, geoJSON => {
        if (!geoJSON) return;
        this.gMap.data.setStyle(() => {
            return {
              fillColor: this.districtColor,
              strokeColor: this.districtColor,
              strokeWeight: 2
            }
          })
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

    setTweetsForMonth = reaction(
        () => [this.tweetMonthCode, this.selectedPolitician], ([code, pol]) => {
            if (!code) return;
            this.tweetsForSelectedMonth = pol.tweets.filter(t=>t.monthCode === code);
            this.setSelectedTweets();
        }
    );

    setSelectedTweets = () => {
        const page = this.tweetPageIndex || 0;
        this.tweetsToDisplay = this.tweetsForSelectedMonth.slice(page * 10, page * 10 + 10);
    }

    fillColor = (cookIndex) => {
        let index;
    
        if (cookIndex === 'EVEN' || cookIndex === null) {return '#AAAAAA'}
    
        let [party, num] = cookIndex.split("+")
        const colors = ['#AAAAAA', '#F37381', '#EE384C', '#BE2839', '#AAAAAA', '#70A1D1', '#347ABE', '#265C91']
    
        num = +num
        if (num <= 5) {
            index = 0
        } else if (num <= 12) {
            index = 1
        } else if (num <= 25 ) {
            index = 2
        } else {
            index = 3
        }
        if (party === 'D') {index += 4}
    
        return colors[index]
    }

    createMarkers = () => {
        const store = this;

        if (store.pollingPlaces) {
            for (let [index, place] of store.pollingPlaces.entries()) {
                const markerPosition = {lat:    place.latitude, lng:    place.longitude}
                if (!markerPosition.lat || !markerPosition.lng) continue;
                const markerMessage = `<b>${place.address.locationName}</b><br/>${place.address.line1}<br/>${place.pollingHours}<br/><a href='https://www.google.com/maps/dir/?api=1&origin=${store.normalizedAddress || ''}&destination=${place.latitude},${place.longitude}' target='_blank'>Directions Here</a>`
                const newMarker = new window.google.maps.Marker({
                    position:   markerPosition,
                    title:      place.address.locationName,
                    label:      `${index + 1}`,
                    animation:  window.google.maps.Animation.DROP
                });
                store.pollingPlaceMarkers.push(newMarker);
                const newInfoWindow = new window.google.maps.InfoWindow({
                    content:    markerMessage,
                    maxWidth:   300
                });
                newMarker.addListener('click', ()=> {
                    newInfoWindow.open(store.pollingMap, newMarker);
                });
            };
        }

        if (store.dropOffLocations) {
            debugger;
            for (let [index, place] of store.dropOffLocations.entries()) {
                const markerPosition = {lat:    place.latitude, lng:    place.longitude}
                if (!markerPosition.lat || !markerPosition.lng) continue;
                const markerMessage = `<b>${place.address.locationName}</b><br/>${place.address.line1}<br/>${place.pollingHours}<br/><a href='https://www.google.com/maps/dir/?api=1&origin=${store.normalizedAddress || ''}&destination=${place.latitude},${place.longitude}' target='_blank'>Directions Here</a>`
                const newMarker = new window.google.maps.Marker({
                    position:   markerPosition,
                    title:      place.address.locationName,
                    label:      `${index + 1}`,
                    animation:  window.google.maps.Animation.DROP
                });
                store.dropOffMarkers.push(newMarker);
                const newInfoWindow = new window.google.maps.InfoWindow({
                    content:    markerMessage,
                    maxWidth:   300
                });
                newMarker.addListener('click', ()=> {
                    newInfoWindow.open(store.pollingMap, newMarker);
                });
            };
        }

        if (store.earlyVotingSites) {
            for (let [index, place] of store.earlyVotingSites.entries()) {
                const markerPosition = {lat:    place.latitude, lng:    place.longitude}
                if (!markerPosition.lat || !markerPosition.lng) continue;
                const markerMessage = `<b>${place.address.locationName}</b><br/>${place.address.line1}<br/>${place.pollingHours}<br/><a href='https://www.google.com/maps/dir/?api=1&origin=${store.normalizedAddress || ''}&destination=${place.latitude},${place.longitude}' target='_blank'>Directions Here</a>`
                const newMarker = new window.google.maps.Marker({
                    position:   markerPosition,
                    title:      place.address.locationName,
                    label:      `${index + 1}`,
                    animation:  window.google.maps.Animation.DROP
                });
                store.earlyVoteMarkers.push(newMarker);
                const newInfoWindow = new window.google.maps.InfoWindow({
                    content:    markerMessage,
                    maxWidth:   300
                });
                newMarker.addListener('click', ()=> {
                    newInfoWindow.open(store.pollingMap, newMarker);
                });
            };
        }
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
