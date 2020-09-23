import React from 'react';
import { useStore } from '../store';

const DistrictMap = () => {
    const store = useStore();

    React.useEffect(() => {
        console.log(`Running effect: ${store.mapScriptLoaded}`)
        if (store.mapScriptLoaded) {
            store.gMap = new window.google.maps.Map(document.getElementById('google-map'), {
                center: {
                    lat: 41.2672,
                    lng: -97.7431
                },
                zoom: 4,
                draggable: false,
                scrollwheel: false,
                panControl: false,
                disableDefaultUI: true
            });
        };
    }, [store.gMap, store.mapScriptLoaded]);

    return (
        <>
            <div id='google-map' style={{width: '100%', height: '90vh'}}/>
        </>
    )
}

export default DistrictMap;
