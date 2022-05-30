# Front-end Interview Project

## Thanks
Thank you in advance for your time and effort!  

## Requirements

### Goals
This assessment will be evaluated by these criteria:
 1. Completion: Deliver working components from a (rough) specification
 2. Coding Style: Deliver readable consistent code, using semantic HTML, and (optionally) a UI framework
 3. Testing: Deliver working tests, or in the interest of time, feel free to write out a testing strategy instead

### Use Cases
As a user, I want to be able to:
 * See all employees in a list that shows their name, role, market, along with their picture 
 * Filter the list of employees by market (e.g. only show employees for the SoCal market).  
 * Select a set of users to make up a "Team".  A "Team" is defined as one Concierge, one Account Executive, and one Head of Construction (all within the chosen market).

### Instructions
 * Build a UI using html, css, or any UI library you want (e.g. Material UI, etc) that supports the Use Cases above.  
   * Add the component(s) for this UI to App.tsx
 * Write unit tests for the component(s) (see __tests__ directory for App.test.tsx example) for the components

### Code
 * `Models.ts` has code to model the employees along with basic data (name, role, etc)
 * `/team_images` contains the images for each employee
 * `/__tests__` contains a basic snapshot test and unit test for `App`
 * `/test_utils` contains code that is used in the example test which may be useful for additional tests

### Questions are Welcome
 Please do not hesitate to ask questions about this task if anything is unclear or help is needed. 

## Running the Project

### Commands

* `npm run test` - Launches the test runner in the interactive watch mode.
* `npm run format` - Runs `prettier` on the source tree to clean up / format the code.
* `npm run start` - Runs the app in the development mode.
