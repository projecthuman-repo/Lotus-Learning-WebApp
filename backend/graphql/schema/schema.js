const { buildSchema } = require('graphql');

module.exports = buildSchema(`
      type Course {
        _id: ID!
        title: String!
        description: String!
        age: String!
        subject: String!
        creator: User!
      }

      type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        accountType: AccountType!
        country: String!
        stateProvince: String!
        school: String
      }

      type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
      }

      type Enrollment {
        _id: ID!
        course: Course!
        learner: User!
        progress: Float!
        createdAt: String!
        updatedAt: String!
      }
      
      enum AccountType {
        Learner
        Educator
        Admin
      }

      input CourseInput {
        title: String!
        description: String!
        age: String!
        subject: String!
        creator: ID
      }

      input UserInput {
        name: String!
        email: String!
        password: String!
        accountType: AccountType!
        country: String!
        stateProvince: String!
        school: String
      }

      

      type RootQuery { 
        getCourses: [Course!]!
        getEnrollments: [Enrollment!]!
        login(email: String!, password: String!): AuthData!
      }

      type RootMutation {
        createCourse(courseInput: CourseInput): Course
        createUser(userInput: UserInput): User
        createEnrollment(courseId: ID!): Enrollment!
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
  `);
