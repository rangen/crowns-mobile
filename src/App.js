import React from 'react';
import Header from './containers/Header';
import MainContainer from './containers/MainContainer';
import Store, { StoreProvider } from './store';

const store = new Store();

export default function App() {
  React.useEffect(() => {
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATHZvtmoZF0nhrPZumDtPQzeqgo4jw8Mo`
    googleScript.async = true;
    googleScript.defer = true;
    window.document.body.appendChild(googleScript);
    googleScript.addEventListener('load', () => {
      store.mapScriptLoaded = true;
    });
  });

  return (
    <StoreProvider store={store}>
      <Header />
      <MainContainer />
    </StoreProvider>
  );
}