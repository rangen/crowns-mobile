import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import Header from './containers/Header';
import MainContainer from './containers/MainContainer';
import Store, { StoreProvider } from './store';
import validDistricts from './misc/districts';

const store = new Store();

export default function App() {
  const location = useLocation();

  const checkIfURLPassed = useCallback(() => {
    const path = location.pathname.split('/').filter(item=>item);

    if (path.length > 2 && path[0] === 'district' && validDistricts.includes(`${path[1]}-${path[2]}`)) {
      console.log('Match!')
      store.setPage('map');
      store.state = path[1];
      store.district = path[2];
      store.fetchS3Data();
    } else {
      console.log('No match!')
    }
  }, [location.pathname]);

  React.useEffect(() => {
    checkIfURLPassed();
  }, [checkIfURLPassed]);

  return (
    <StoreProvider store={store}>
      <Header />
      <MainContainer />
      <MenuDrawer />
    </StoreProvider>
  );
}