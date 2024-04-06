const Course = require("../../models/CourseModel.js");

const updateCourseData = async (course) => {
    try {
        // Buscar el curso por su ID
        const foundCourse = await Course.findById(course._id);
        if (!foundCourse) {
            return; 
        }
        foundCourse.set(course);
        const updatedCourse = await foundCourse.save();
        return updatedCourse;
    } catch (err) {
        console.error("Error al actualizar el curso:", err);
        throw new Error("Error en updateCourseData()");
    }
};

module.exports = { updateCourseData };
