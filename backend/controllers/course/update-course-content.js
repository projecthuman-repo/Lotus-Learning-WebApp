const Course = require("../../models/CourseModel.js");

const updateCourseData = async (course) => {
    try {
        // Update the course using findByIdAndUpdate to avoid VersionError
        const updatedCourse = await Course.findByIdAndUpdate(
            course._id,
            course, // Update data
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedCourse) {
            return {
                success: false,
                message: "Course not found",
            };
        }

        return {
            success: true,
            data: updatedCourse,
            message: "Course updated successfully",
        };

    } catch (err) {
        // Handle any other errors
        console.error("Error updating course:", err);
        throw new Error("Error in updateCourseData()");
    }
};

module.exports = { updateCourseData };
