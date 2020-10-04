# TheVowelGame
A multiplayer web game to challenge your knowledge of English vowels. 

- Developed with React, Django, and websocket. 
- Supports two players to play aginst each other in real time. 

<img src="https://user-images.githubusercontent.com/8275280/91279969-bda61b80-e7b8-11ea-8a3b-c2232e15367d.png" width=50%>
<img src="https://user-images.githubusercontent.com/8275280/91280026-cd256480-e7b8-11ea-8e4b-e330284fb3a0.png" width=50%>


## How to run

### Redis

Run a [redis server in docker](https://hub.docker.com/_/redis) on localhost:6379

### Backend

1. `pip3 install -r requirements.txt`  to install the dependencies
(you can also use a virtual env if you wish)
2. Use PyCharm or `python3 manage.py runserver` to start the backend

### Frontend
1. Install yarn
2. `yarn install` to install the dependencies
3. `yarn start` to start the frontend
