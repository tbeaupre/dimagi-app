const search = query => fetch(`/api/location?q=${query}`, {
  accept: 'application/json'
}).then(response => response.json());

const addUserLocation = (email, location) => {
  const data = { email, location };

  return fetch(`/api/userlocations`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export { addUserLocation, search };