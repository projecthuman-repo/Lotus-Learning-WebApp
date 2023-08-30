const fetchCoursesRequest = async () => {
  const response = await fetch('http://localhost:5000/fetchCourses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

const fetchCourses = async () => {
  const data = await fetchCoursesRequest();
  if (data.message === 'Courses fetched') {
    return data.courses;
  } else {
    alert('Unable to fetch courses at this time, please try again later.');
  }
};

export default fetchCourses;
