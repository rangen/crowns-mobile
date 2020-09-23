import React from 'react';
import Header from './containers/Header';
import MainContainer from './containers/MainContainer';
import Store, { StoreProvider } from './store';

const store = new Store();

export default function App() {

  return (
    <StoreProvider store={store}>
      <Header />
      <MainContainer />
    </StoreProvider>
  );
}