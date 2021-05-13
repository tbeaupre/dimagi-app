import React from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

import { search } from './client';

export default function LocationSearch(props) {
  const { onLocationChange } = props;

  const promiseLocations = React.useCallback(
    inputValue => search(inputValue).then(locations => locations.geonames),
    [search]
  );

  const getOptionLabel = React.useCallback(
    ({ name, adminName1, countryName }) => (`${name}, ${adminName1}, ${countryName}`),
    []
  );

  const handleLocationSelectionChange = React.useCallback(
    newValue => {
      onLocationChange(newValue);
    },
    [onLocationChange]
  );

  return (
    <LocationSearchContainer>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseLocations}
        getOptionLabel={getOptionLabel}
        onChange={handleLocationSelectionChange}
      />
    </LocationSearchContainer>
  )
}

const LocationSearchContainer = styled.div`
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;