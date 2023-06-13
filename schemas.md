Record | Attributes 
--- | ---
User | userId, email, password, username, country, state/province, accountType, school, profilePicture, Profile, phoneNumber, gender, language, secondaryEmail, billingAddress, paymentMethod
Profile | profileId, userId, description, courses[Course], accomplishments[]/awards[], experiences[Experience], notifications[], notificationSettings {learningReminders, reminderTime, emailNotifications, soundEffects, newsAnnouncements}
Course | courseId, courseTitle, courseName, courseProgress, courseImage, courseDescription, courseAuthor, courseTag
Experience | title, companyName, startDate, endDate, country, city, highlights
Game | gameId, gameType, gameTitle, userId, gameDescription, gameTags[], gameImage, gameDifficulty, gameResult, gameQuestions[{correctAnswer}]
ContactTicket | ticketId, ticketName, ticketEmail, ticketPhoneNumber, ticketTopic, ticketMessage
Notification | notificationId, notificationStatus, notificationDescription, notificationDate, notificationImage
FAQ | question, answer
