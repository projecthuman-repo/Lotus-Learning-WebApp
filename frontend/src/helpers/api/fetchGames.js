const fetchGamesRequest = async () => {
  const response = await fetch('http://localhost:5000/fetchGames', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

const fetchGames = async () => {
  const data = await fetchGamesRequest();
  if (data.message === 'Games fetched') {
    return data.games;
  } else {
    alert('Unable to fetch games at this time, please try again later.');
  }
};

export default fetchGames;
