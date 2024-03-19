import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const StepTwo = ({ setNewCourseObj, newCourseObj }) => {

const [done, setDone] = useState(false)
const { step } = useParams();
const navigate = useNavigate(); // Obtén el objeto history

const goNextPage = () => {
    if(!done){
        return
    }
    const nextStep = parseInt(step) + 1;
    navigate(`/create-new-course/${nextStep}`);
}

const goPrevPage = () => {
  const nextStep = parseInt(step) - 1;
  navigate(`/create-new-course/${nextStep}`);
}

useEffect(() =>{

    if(newCourseObj.categories.length > 0){
        setDone(true)
    }
    else{
        setDone(false)
    }
},[newCourseObj])
const updateCategories = (newCategoriesValue) => {
    setNewCourseObj(prevState => ({
      ...prevState,
      categories: newCategoriesValue
    }));
  };
return (
    <>
      <div className="h-[calc(90vh-65px)] w-full  flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-3xl text-stone-800">
            What categories does your course have?
          </p>
          <p className="text-sm font-light mt-2">
            This is only temporary, you can change it whenever you want
          </p>
          <div className="min-w-[400px] mt-5">
            <CourseCategories setCategories={updateCategories} categories={newCourseObj.categories}/>
            <p className='text-xs font-ligth text-stone-400 mt-1'>1 category minimum 5 maximum.</p>

          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-[65px] border-t flex justify-between px-4 items-center">
      <button onClick={() => goPrevPage()}className={`px-2 py-1  font-semibold text-stone-500 linearGradient_ver1 text-white rounded-sm`}>
          go Back
        </button>
        <p className="font-semibold text-sm"  >{step}/4</p>
        <button onClick={() => goNextPage()}className={`px-2 py-1  font-semibold text-stone-500 ${done? 'linearGradient_ver1 text-white rounded-sm' : 'border'}`}>
          Next
        </button>
      </div>
    </>
  );
};

const CourseCategories = ({categories, setCategories}) => {

    useEffect(() => {
        console.log(categories)
    },[categories])

    // Predefined list of categories
    const categoriesList = ["Math", "Science", "IT", "Software", "Business", "Health", "Design"];
  
    // Ref for handling clicks outside the dropdown
    const dropRef = useRef();
    // State for dropdown visibility
    const [open, setOpen] = useState(false);
  
    // Add a category to the selected categories
    const addCategory = (categoryToAdd) => {
      setOpen(false);
      // Check limits before adding
      if(categories.length >= 5 || categories.includes(categoryToAdd)){
        return;
      }
      setCategories([...categories, categoryToAdd]);
    };  
  
    // Delete a category from the selected categories
    const deleteCategory = (categoryToDelete) => {
      const indexToDelete = categories.indexOf(categoryToDelete);
      if (indexToDelete !== -1) {
        const updatedCategories = [...categories];
        updatedCategories.splice(indexToDelete, 1);
        setCategories(updatedCategories);
      }
    };
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropRef]);
  
    return (
      <div
        onClick={() => setOpen(!open)}
        style={{ userSelect: 'none' }} className='p-2 border flex items-center justify-between bg-stone-50 hover:bg-stone-100 cursor-pointer relative'>
        {(categories && categories.length <= 0)? 
          <p className='text-stone-400 '>Pick your categories</p>
          :
          <div className='flex space-x-2'>
            {categories && categories.map((category, i) =>{
              return(
                <div 
                  onClick={() => {
                    deleteCategory(category);
                    setOpen(false);
                  }}
                  key={category+i} className='text-stone-500 font-semibold px-2 border rounded-full bg-white flex items-center justify-center space-x-2'>
                    <p className=''>
                      {category}
                    </p>
                    <div className='cursor-pointer'>
                      <IoClose />
                    </div>
                </div>
              );
            })}
          </div>
        }
        <div>
          <IoIosArrowDown className='text-xl'/>
        </div>
        <div 
          ref={dropRef} 
          className={`${open? 'absolute' : 'hidden'} z-30 w-full max-h-[200px] overflow-auto bg-white border top-[100%] left-0 shadow-sm`}>
          {categoriesList.map((item, i) => {
            return(
              <div 
                onClick={() => addCategory(item)}
                className='px-2 py-1 text-stone-600 hover:bg-stone-50' key={item+i}>
                  <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } 
 
export default StepTwo;
