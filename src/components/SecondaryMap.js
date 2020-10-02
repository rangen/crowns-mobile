import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const SecondaryMap = observer(() => {
    const store = useStore();

    useEffect(() => {
        if (!store.pollingMap) {
            store.pollingMap = new window.google.maps.Map(document.getElementById('polling-map'), {
                center: {
                    lat: 41.2672,
                    lng: -97.7431
                },
                zoom: 4,
                draggable: true,
                scrollwheel: true,
                panControl: true,
                disableDefaultUI: true
            });
        };
        if (store.mapSecondaryView === 'polling' && store.pollingPlaces) {
            let bounds = new window.google.maps.LatLngBounds();
            store.pollingPlaceMarkers = [];

            for (let [index, place] of store.pollingPlaces.entries()) {
                const markerPosition = {lat:    place.latitude, lng:    place.longitude}
                const markerMessage = `<b>${place.address.locationName}</b><br/>${place.address.line1}<br/>${place.pollingHours}<br/><a href='https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}' target='_blank'>Directions Here</a>`
                const newMarker = new window.google.maps.Marker({
                    position:   markerPosition,
                    title:      place.address.locationName,
                    label:      `${index + 1}`,
                    map:        store.pollingMap
                });
                store.pollingPlaceMarkers.push(newMarker);

                const newInfoWindow = new window.google.maps.InfoWindow({
                    content:    markerMessage,
                    maxWidth:   300
                });
                newMarker.addListener('click', ()=> {
                    newInfoWindow.open(store.pollingMap, newMarker);
                })
                bounds.extend(markerPosition);
            }

            store.pollingMap.fitBounds(bounds);
        }
    }, [store.mapSecondaryView, store.pollingMap, store.pollingPlaces, store.pollingPlaceMarkers]);

    return (
        <>
            <div id='polling-map' style={{width: '100%', height: '85vh'}}/>
            <h4>{store.mapSecondaryView}</h4>
        </>
    )
});

export default SecondaryMap;
