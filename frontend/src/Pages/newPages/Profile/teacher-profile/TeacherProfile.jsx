import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Fill, RiEdit2Fill } from 'react-icons/ri';
import OnHoverExtraHud from '../../../../components/OnHoverExtraHud';
import { IoMdSearch } from 'react-icons/io';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import getCoursesByProp from '../../../../BackendProxy/courseProxy/getCoursesByProp';
import SpinnerLoader from '../../../../components/loaders/SpinnerLoader';

const TeacherProfile = () => {

  const authUser = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses()
  },[])

  const fetchCourses = async() => {
    try {
      const res = await getCoursesByProp("creator.email", authUser.email, authUser.institution.code);
      setCourses(res.res);
      setLoaded(true)
      console.log(res.res);
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <>
        <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
          <p className="font-semibold text-lg">Your Courses</p>
          <div className="flex items-center space-x-3">
            <div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
              <FaSortAlphaDownAlt className="text-stone-800" />
            </div>
            <div className="flex items-center">
              <input
                placeholder="Search by name"
                className="text-sm focus:outline-none  focus:border-b-stone-400 border-b-transparent border-b-[1.5px]  pr-2 py-1 font-medium text-stone-600 "
              />
              <IoMdSearch />
            </div>
          </div>
        </div>
        <div className="bg-white py-2 px-4 mt-3 rounded-lg">
          {!loaded? 
          <SpinnerLoader/>
          :
          <table className="table-auto w-full" >
            <thead className="">
              <tr>
                <th>Course Name</th>
                <th>Students</th>
                <th>Ages</th>
                <th>State</th>
                <th className="text-end">Options</th>
              </tr>
            </thead>
            <tbody>
                {courses.length > 0 && courses.map((item, i) => {
                  return (
                        <CourseCard item={item}/>
                  )
                })}
            </tbody>
          </table>
          }

        </div>
    </>
  )
}
const CourseCard = ({item}) => {


  return (
    <tr  key={item._id} className="text-sm border-5 border-transparent">
      <td className="">{item.title}</td>
      <td>10</td>
      <td>{item.age} </td>
      <td>{item.accepted? 'Approved': 'Pending'}</td>
      <td className=" flex space-x-2 items-center justify-end">
        <div className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent">
            <RiDeleteBin7Fill className="text-md text-blue-700 "/>
            <OnHoverExtraHud name={'Delete'}/>
        </div>
        <div className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
            <RiEdit2Fill  className="text-md text-red-600 "/>
            <OnHoverExtraHud name={'Edit'}/>
        </div>

      </td>
    </tr>
  );
};

export default TeacherProfile