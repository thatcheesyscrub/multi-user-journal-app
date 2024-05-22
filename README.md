# Thinkific Multi-User Journal Assignment

## Description
 A simple journal web app that allows multiple users to create posts, upload images (optionally) and add a rating to the posts being created. Built using Next.js 14.x, Prisma, TypeScript, Tailwind, and Google Cloud Natural Language API.

 - [Live Demo] (https://multi-user-journal-app-ec98b2f9fe2a.herokuapp.com/)

### Instructions to run assignment locally

### 1. Install dependencies

```
yarn install:deps
```

### 2. Create .env file

```
yarn run create:env
```

### 3. Prepare DB
Pre-requisites: Install Docker Desktop (https://www.docker.com/products/docker-desktop/) and verify it is installed successfully

```
yarn run docker:version
```

Once verified, navigate to the project directory and run the following:

```
yarn run docker:up
yarn run prisma:migrate
```

(Optional) Seed the database with sample data from prisma/seed.js

```
yarn prisma:seed
```

### 4. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser and get posting!



### Date Of Reflection

May 21st 2024.

### Time spent

Approximately 5 hours (3-4 spent on development, 1 for deploying and unit tests).

### Assumptions made

- All users (anonymous and authenticated) should be able to create and view all posts

- All authenticated users can additionally search posts by other users' names and anonymous posts

- All users have the option to upload image type files to the new post being created.

### Shortcuts/Compromises made

- Limited styling using Tailwind CSS due to time constraints can be improved to use component library
- Using React's in built state management instead of Redux
- Using next-auth for authentication with one identity provider. 
- Using Prisma as ORM to simplify db operations.

### Assume your application will go into production...

#### 1) What would be your approach to ensuring the application is ready for production (testing)?

- Performance load testing (using an open source tool such as JMeter) implementation to ensure it can handle a large number of requests (iterate from 20, 100, 1000, 10000, etc) and measure performance.

- Implement best practices and restructure code based on code reviews (GitHub Pull Requests) to align with best practices.

- Implement coverage such as SonarCloud to ensure unit and integration tests are being added for each new code piece being added.

- Set up CI/CD pipeline infra (such as Jenkins) to automate deployment of releases and automate testing for security vulnerabilities and testing process.

- Open beta for internal stakeholders to test the application and receive feedback for improvements prior to release.

#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?

- Implement CDN mechanism for serving static assets
- Enforce caching mechanism
- Optimization of queries being performed against the PostGreSQL db
- Pagination for messages being posted by users to improve search performance

#### 3) What key steps would you take to ensure application security?

- Implement secure cookies and session management/adjust lifespan for session for authenticated users.

- Implement additional validation for user input fields and images. 

- Implement MFA mechanism for users signing in with an Identity Provider + support for additional IdPs (currently using OAuth 2.0 protocol)


### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

- Comprehensive test coverage: While some basic tests are there, the application could benefit from more in-depth unit, integration and e2e testing/synthetic tests using Selenium or Cypress to ensure uptime and stability.

- More advanced features like allowing users the ability to edit and update their posts, delete their posts, assigning user profiles/avatar icons, more advanced searching capabilities and allowing others to rate posts outside their own.

- Additional error handling and user feedback loop (maybe in the form of toast notifications)

- Retry policy using a library such as Circuit Breaker to circumvent temporary network issues when performing API calls.