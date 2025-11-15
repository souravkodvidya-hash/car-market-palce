1. setting up docker 
 create docker file for frontend and backend 
 create .dockerignore in forntend and bakcend at same level you dockerfile is 

 create "docker-compose.yml" in root folder

 docker compose up --build

 docker commands 

 docker compose down - > docker compose down is a command used to stop and remove all containers, networks, volumes, and images created by docker compose up.

 docker compose build --no-cache -> The command docker compose build --no-cache tells Docker to build your containers from scratch without using any cached layers.

 docker compose up -> - Build the images (if they haven’t been built yet)
- Create and start the containers
- Set up networks and volumes as defined
- Stream logs from all services to your terminal


if you want to clone then do this 
git clone https://github.com/your-user/car-market-place.git
cd car-market-place
docker compose up -d --build



days wise progress
4th day - after setting the docker today i set up prettier 
 docker interactive terminal ->docker exec -it backend-service sh

 rebuilding the container -> docker compose build frontend

 rebuilding both container -> docker compose up -d --build