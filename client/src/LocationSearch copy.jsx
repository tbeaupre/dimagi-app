import React from 'react';
import styled from 'styled-components';
import { search } from './client';

export default function LocationSearch() {
  const [locations, setLocations] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = e => {
    const value = e.target.value;

    setSearchValue(value);

    if (value === "") {
      setLocations([]);
    } else {
      search(value).then(locations => {
        setLocations(locations.geonames);
      });
    }
  }

  return (
    <LocationSearchContainer>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      {locations.map(({ name, countryName }, index) => (<span key={index}>{`${name}, ${countryName}`}</span>))}
      {locations.forEach(location => { console.log(location) })}
    </LocationSearchContainer>
  )
}

const LocationSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;