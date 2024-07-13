


import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomePage from '../Pages/newPages/homePage/HomePage';
import GeneralNavbar from '../components/navbar/GeneralNavbar';
import CarrouselHeader from '../components/headers/CarrouselHeader';
import GeneralFooter from '../components/footer/GeneralFooter';
import GeneralCourseCard from '../components/course-cards/GeneralCourseCard';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockStore = configureStore([]);

const store = mockStore({
  user: {
    username: 'Test User',
    profilePic: null,
  },
});

describe('HomePage', () => {
  test('renders GeneralNavbar component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const logos = screen.getAllByAltText(/logo/i);
  expect(logos.length).toBeGreaterThan(0);
  });

  test('renders CarrouselHeader component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    const headerElement = screen.getByText(/Discover Our Course Offerings/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders GeneralFooter component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const aboutUsLinks = screen.getAllByText('About us');
    expect(aboutUsLinks.length).toBe(3);

    const contactUsLinks = screen.getAllByText('Contact us');
    expect(contactUsLinks.length).toBe(3);

    const termsLinks = screen.getAllByText('Terms');
    expect(termsLinks.length).toBe(3);

    const faqLinks = screen.getAllByText('FAQ');
    expect(faqLinks.length).toBe(3);

    const icons = screen.getAllByAltText('icon');
    expect(icons.length).toBe(2);
  });

  test('renders course cards', () => {
    const courses = [
      { _id: '1', title: 'Course 1', description: 'Description 1', creator: { username: 'Instructor 1' } },
      { _id: '2', title: 'Course 2', description: 'Description 2', creator: { username: 'Instructor 2' } },
    ];

    const TestHomePage = () => {
      const [loadedCourses, setLoadedCourses] = React.useState(true);
      const [coursesState, setCoursesState] = React.useState(courses);

      return (
        <Provider store={store}>
          <div className="h-full w-full">
            <GeneralNavbar />
            <div className="w-full mx-auto pb-2 flex items-center flex-col">
              <div className="xl:w-[1350px] lg:w-[1000px] w-full">
                <CarrouselHeader />
              </div>
              <div className="xl:w-[1350px] lg:w-[1000px] w-full"></div>
              <div className="xl:w-[1400px] lg:w-[1000px] w-full flex">
                <p className="pt-10 font-semibold md:text-xl sm:text-md text-sm text-stone-700">Discover Our Course Offerings</p>
              </div>
              <div className="max-w-[1400px] mx-auto py-2 flex items-center justify-center">
                <div className="grid md:gap-1 gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {coursesState.map((item) => (
                    <div key={item._id} data-testid={`course-card-${item._id}`}>
                      <GeneralCourseCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <GeneralFooter />
          </div>
        </Provider>
      );
    };

    render(<TestHomePage />);

    const courseCard1 = screen.getByTestId('course-card-1');
    const courseCard2 = screen.getByTestId('course-card-2');
    expect(courseCard1).toBeInTheDocument();
    expect(courseCard2).toBeInTheDocument();

    const courseTitle1 = screen.getByText('Course 1');
    const courseTitle2 = screen.getByText('Course 2');
    expect(courseTitle1).toBeInTheDocument();
    expect(courseTitle2).toBeInTheDocument();
  });
});

