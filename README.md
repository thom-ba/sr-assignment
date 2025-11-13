# Sports Event Assignment - Sportradar (BE)

## Overview
I chose the backend assignment of the two to choose from. The project is a web application to manage sports event, competitions and teams. Users can view different Events. I didnt add authentication so anyone could delete an Event, but its rather about showcasing the interaction with the database, rather then such things. The main point I wanted to achieve is: ONE form to create an event. Also make it simple to use for the User.

Key features:
 - Add a new Event from the Add Event Modal Form. ( If missing e.g a venue, easily add it)
 - Frontend built with React and TailwindCSS
 - Backend API using Go, Gin, and GORM for database handling

## Tech Stack
 **Frontend:**
 - React + TypeScript
 - TailwindCSS

 **Backend:**
 - Go
 - Gin
 - GORM
 - PostgreSQL

 **Editor:**
 - Neovim or VSCode

## Design Patterns Used
 - Dependency Injection
 - Singleton
 - Frontend modal-building pattern for reusable dynamic forms

### Prerequisites
 - Docker & Docker Compose

### Run the Application
```bash
docker compose up --build
```

### Accessing the App
 - Frontend: http://localhost:3000

### To get a view of the Database Schema:
Go into the dbdiagram_design.txt and copy paste it into https://dbdiagram.io/d/69050eff6735e11170b753ff if the link doesnt work anymore. 
If the link still works, no need to copy paste.

### Resources
https://cristiancurteanu.com/understanding-go-sync-once/?utm_source=chatgpt.com
https://gorm.io/docs/
https://blog.stackademic.com/golang-crud-rest-api-with-gin-and-gorm-service-repository-pattern-167afa8e9e87
https://react.dev/reference/react/useReducer
https://react.dev/reference/react/useReducer

### What waisted the most time
- The modal I was using almost till the end got too big. Adding a new sport would cause
  the modal to explode in size. My friend is a frontend dev so I asked him what he would do
  and he introduced me to useReducer from React. He also helped me at the beginning to understand how to implement it.
- Overthinking some problems at the beginning which were easy to solve later, so I wasted
  some time to have a perfect solution for too long


### What else I wanted to implement
- ~~Delete Event~~ / Edit Event
- Change View from Cards to Columns
- Edit All Params
- ~~More Mock Data~~
- Add clock Icons matching the time
- Add value checking to see if user should be able to click on next
- Color Picker for Events
