import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const DistrictMap = observer(() => {
    const store = useStore();

    React.useEffect(() => {
        if (window.google) {
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
    }, [store.gMap]);

    return (
        <>
            <div id='google-map' style={{width: '100%', height: '85vh'}}/>
        </>
    )
});

export default DistrictMap;
