import * as React from 'react';
import {Appbar, Title} from 'react-native-paper';

const Header = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: '#00aaff',
        },
      }}>
      <Title>Weather App</Title>
    </Appbar.Header>
  );
};

export default Header;
