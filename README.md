# API-Server
### to host this Open API you have create AWS EC2 Free tier "t2.micro" instance and clone this directory.

```
git clone https://github.com/InfernalHeir/Api-Server
```
# Build Global Docker Image
```
docker image build -t global:1.0.0 ./global
```
# Build Tron API Docker Image
```
docker image build -t tron-api:1.0.0 ./tron-api
```
# Run Docker Compose
```
docker-compose up -d
```
