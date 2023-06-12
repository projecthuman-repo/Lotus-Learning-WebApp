Record | Attributes 
--- | ---
User | userId, email, password, username, country, state/province, accountType, school, profilePicture, Profile
Profile | profileId, userId, description, courses[Course], accomplishments[]/awards[], experiences[Experience], 
Course | courseId, courseTitle, courseName, courseProgress, courseImage, courseDescription, courseAuthor, courseTag
Experience | title, companyName, startDate, endDate, country, city, highlights
