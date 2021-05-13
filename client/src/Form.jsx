import React from 'react';
import styled from 'styled-components';

import { addUserLocation } from './client';
import LocationSearch from './LocationSearch';

export default function Form (props) {
  const [email, setEmail] = React.useState(null);
  const [location, setLocation] = React.useState(null);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handleSubmit = () => {
    if (!email || !location) return;
    addUserLocation(email, location);
  }

  return (
    <FormContainer>
      <EmailInput
        type="text"
        placeholder="Enter email..."
        value={email}
        onChange={handleEmailChange}
      />
      <LocationSearch onLocationChange={setLocation} />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmailInput = styled.input`
  width: calc(100% - 18px);
  margin: 0 4px;
  margin-bottom: 1rem;
  border-color: hsl(0, 0%, 80%);
  border-width: 1px;
  border-radius: 4px;

  min-height: 36px;
  padding: 2px 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 10rem;
`;