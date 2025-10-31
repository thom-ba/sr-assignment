- Sportarten nochmal Unterteilen:
Frauenfussball / Maennerfussbal
- Teams unterteilen:
Versch. Liegen
- Events aufteilen:
Freundschaftsspiel, EM, WM
Event:
- Name, Decr.,

Problems I ran into:
- at the start i named the field event.descr which can cause SQL syntax issues
- After the first design I forgot one crucial thing:
A icehockey team could be linked to a football game
- I didnt give the venue a cap. (That is not really important for the callender, but when I was watching icehockey I remember being interested in how many people fit)
- Started out with 1:1 relation in the comp (sport, category) even tho one sport or one category can have multiple competitions

AI Usage:
- Checked my Schema Design for any obvious errors. Didnt find any but forgot about 3nf in one table

Why I use what tech:
Frontend:
  - React, Tailwind, (because I am used to it)

Backend:
  - Go, because it is used in the company
    - CRUD application: Gin (lightweight and simple to learn)
    - Database integration: GORM (easy database handling)
Also both of these technologies should scale well so implementing search, pagination or filters later on shouldnt be a problem


Design Patterns I used:
    - Dependency injection
    - Singleton


# Resources:
https://cristiancurteanu.com/understanding-go-sync-once/?utm_source=chatgpt.com
https://gorm.io/docs/
