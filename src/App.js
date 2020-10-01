import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import Header from './containers/Header';
import MainContainer from './containers/MainContainer';
import Store, { StoreProvider } from './store';
import validDistricts from './misc/districts';
import states from './misc/states';

const store = new Store();

const App = () => {
  const location = useLocation();
  

  const checkIfURLPassed = useCallback(() => {
    const path = location.pathname.split('/').filter(item=>item);

    if (path.length > 2 && path[0] === 'district' && validDistricts.includes(`${path[1]}-${path[2]}`)) {
      console.log('Match!')
      store.setPage('map');
      store.state = path[1];
      store.district = path[2];
      store.addressRegion = buildDistrictString(path[1], path[2]);
      store.fetchS3Data();
    } else {
      console.log('No match!')
      window.history.pushState({}, null, '/')
    }
  }, [location.pathname]);

  React.useEffect(() => {
    checkIfURLPassed();
  }, [checkIfURLPassed]);

  const buildDistrictString = (state, district) => {
    let num;
    switch (district) {
      case '0':
        num = 'At-Large';
        break;
      case '1':
      case '21':
      case '31':
      case '41':
      case '51':
        num = district.concat('st');
        break;
      case '2':
      case '22':
      case '32':
      case '42':
      case '52':
        num = district.concat('nd');
        break;
      case '3':
      case '23':
      case '33':
      case '43':
      case '53':
        num = district.concat('rd');
        break;
      default:
        num = district.concat('th');
    }
    return `${states[state]}'s ${num} district`
  }

  return (
    <StoreProvider store={store}>
      <Header />
      <MainContainer />
      <MenuDrawer />
    </StoreProvider>
  );
};

export default App;