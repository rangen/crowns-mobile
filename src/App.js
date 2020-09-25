import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import Header from './containers/Header';
import MainContainer from './containers/MainContainer';
import Store, { StoreProvider } from './store';
import validDistricts from './misc/districts';

const store = new Store();

export default function App() {
  const location = useLocation();

  const checkIfURLPassed = () => {
    const path = location.pathname.split('/').filter(item=>item);

    if (path.length > 2 && path[0] === 'district' && validDistricts.includes(`${path[1]}-${path[2]}`)) {
      console.log('Match!')
      store.state = path[1];
      store.district = path[2];
      store.fetchS3Data();
    } else {
      console.log('No match!')
    }
  }

  React.useEffect(() => {
    const googleScript = document.createElement('script');
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATHZvtmoZF0nhrPZumDtPQzeqgo4jw8Mo`;
    googleScript.async = true;
    googleScript.defer = true;
    window.document.body.appendChild(googleScript);
    googleScript.addEventListener('load', () => {
      store.mapScriptLoaded = true;
    });
    checkIfURLPassed();
  });

  return (
    <StoreProvider store={store}>
      <Header />
      <MainContainer />
      <MenuDrawer />
    </StoreProvider>
  );
}