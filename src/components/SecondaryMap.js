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
        let mapMarkers;

        switch (store.mapSecondaryView) {
            case 'earlyvoting':
                mapMarkers = store.earlyVoteMarkers;
                break;
            case 'dropoff':
                mapMarkers = store.dropOffMarkers;
                break;
            default:
                mapMarkers = store.pollingPlaceMarkers;
        }
        
        let bounds = new window.google.maps.LatLngBounds();
        for (let marker of mapMarkers.slice(0,25)) {  //extract to ENV variable?
            bounds.extend(marker.position);
            window.setTimeout(()=>marker.setMap(store.pollingMap), 333);
        }
        store.pollingMap.fitBounds(bounds);
        
    }, [store.mapSecondaryView, store.pollingMap, store.pollingPlaceMarkers, store.dropOffMarkers, store.earlyVoteMarkers]);

    return (
        <>
            <div id='polling-map' style={{width: '100%', height: '85vh'}}/>
            <h4>{store.mapSecondaryView}</h4>
        </>
    )
});

export default SecondaryMap;
