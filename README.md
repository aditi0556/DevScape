# DevScape

## execute the following commands
## create devscape-network
## docker network create devscape-network
## docker network
## 1. docker build -t my-backend:1.0 ./Backend
## 2. docker images
## 3. docker run -d -p 8080:3000 --name dev-backend --network devscape-network my-backend:1.0 
## 4. docker build -t my-frontend:1.0 ./Frontend
## 5. docker run -d -p 5373:5373 --name dev-frontend --network devscape-network my-frontend:1.0
## 6. Now inspect http://localhost:5373

# Try with docker compose now

## 1. docker compose -f docker-compose.yaml up
## 2. docker compose -f docker-compose.yaml down
