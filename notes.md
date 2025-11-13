- Sportarten nochmal Unterteilen:
  Frauenfussball / Maennerfussbal
- Teams unterteilen:
  Versch. Liegen
- Events aufteilen:
  Freundschaftsspiel, EM, WM
  Event:
- Name, Decr.,

Problems I ran into:
- at the start I named the field event.descr which can cause SQL syntax issues
- After the first design I forgot one crucial thing:
  A icehockey team could be linked to a football game
- I didnt give the venue a cap. (That is not really important for the callender, but when I was watching icehockey I remember being interested in how many people fit)
- Started out with 1:1 relation in the comp (sport, category) even tho one sport or one category can have multiple competitions
- Was wondering why my React.FC wasn't working until I noticed that I didnt generate the project with TypeScript
- As I use Java or CPP normally, I often mixed up the naming conventions, which caused me to go back and change a lot of names afterwards
- I had a problem with the postgre port already taken, but as I ran into this problem a lot of times already I knew how to fix it
- The Modal I was using almost till the end got too big at the end. E.g.: adding a sport because it doesnt exist, causes the modal to EXPLODE in size and it would
  be just too much at once. My friend is a frontend developer so I asked him what he would do and he told me to use useReducer from React. He also helped me at the 
  beginning to understand how to implement it.
- I overthinked some problems at the beginning which were easy to solve later, so I wasted some time on trying to have a perfect solution for too long

AI Usage:

- GithubCopilot was DISABLED all the way through the whole project
- Checked my Schema Design for any obvious errors. Didnt find any but forgot about 3nf in one table
- To get resources to learn from
- To explain certain functions in go I didnt use yet
- To find resources to specific questions instead of searching for them for ages :<
- To fix certain errors I didnt understand from the compilor error itself
- To make a basic design of the frontend, so I can get ideas on how to make what look
- To debug styling issues
- To generate mock data
- To help me make it one command deploy app using docker compose (mainly because of some silly errors..)

# Why I use what tech:
Frontend:
- React, Tailwind, (because I am used to it)

Backend:
- Go, because it is used in the company 
- CRUD application: Gin (lightweight and simple to learn) 
- Database integration: GORM (easy database handling)
 
Also both of these technologies should scale well so implementing search, pagination or filters later on shouldnt be a problem

Editor:
I used either nvim or vscode. 

# Design Patterns I used:
- Dependency injection
- Singleton
- I also used a Modal building kind of structure in the frontend which I used before

# Resources:

https://cristiancurteanu.com/understanding-go-sync-once/?utm_source=chatgpt.com
https://gorm.io/docs/
https://blog.stackademic.com/golang-crud-rest-api-with-gin-and-gorm-service-repository-pattern-167afa8e9e87
https://react.dev/reference/react/useReducer
https://react.dev/reference/react/useReducer
