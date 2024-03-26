const Course = require("../../models/CourseModel.js");


const createNewCourse = async(newCourseObj) => {
    try{
        const newCourse = new Course({...newCourseObj});
        const savedCourse = await newCourse.save();
        return {
            res: 201,
            savedData: savedCourse,
        } 
    }catch(err){    
        return {
            res: 400,
            err: err
        }
    }
}

module.exports = {createNewCourse}