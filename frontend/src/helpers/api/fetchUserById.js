const fetchUserByIdRequest = async (userId) => {
  const response = await fetch(`http://localhost:5000/fetchUsers/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

const fetchUserById = async (userId) => {
  const data = await fetchUserByIdRequest(userId);
  if (data.message === 'User fetched') {
    return data.user;
  } else {
    alert('Unable to fetch user at this time, please try again later.');
  }
};

export default fetchUserById;
