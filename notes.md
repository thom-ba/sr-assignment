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

AI Usage:

- GithubCopilot was DISABLED all the way through the whole project
- Checked my Schema Design for any obvious errors. Didnt find any but forgot about 3nf in one table
- Used AI to get resources to learn from
- Used AI to explain certain functions in go I didnt use yet
- Used AI to find resources to specific questions instead of searching for them for ages :<
- Used AI to fix certain errors I didnt understand from the compilor error itself
- Used AI to make a basic design of the frontend, so I can get ideas on how to make what look
- Used AI to debug styling issues
- Used AI to generate mock data

Why I use what tech:
Frontend:

- React, Tailwind, (because I am used to it)

Backend:

- Go, because it is used in the company - CRUD application: Gin (lightweight and simple to learn) - Database integration: GORM (easy database handling)
  Also both of these technologies should scale well so implementing search, pagination or filters later on shouldnt be a problem

# Design Patterns I used:

- Dependency injection
- Singleton
- I also used a Modal building kind of structure in the frontend which I used before

# Resources:

https://cristiancurteanu.com/understanding-go-sync-once/?utm_source=chatgpt.com
https://gorm.io/docs/
https://blog.stackademic.com/golang-crud-rest-api-with-gin-and-gorm-service-repository-pattern-167afa8e9e87
