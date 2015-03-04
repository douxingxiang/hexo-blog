---
title: Docker Commandline Reference
tags: docker
---

# Repository Operations

## 1. Docker Hub

``` bash
sudo docker login
```

# Image Operations

## 1. Get and Upload images

``` bash
sudo docker pull ubuntu
sudo docker pull:14.04
sudo docker pull registry.hub.docker.com/ubuntu:lastest

sudo docker push
```

## 2. View images

``` bash
sudo docker images
sudo docker tag
sudo docker inspect
```

## 3. Find images

``` bash
sudo docker search 
```

## 4. Create and Delete images

``` bash
sudo docker commit
sudo docker import

sudo docker rmi
```

## 5. Save and Load images

``` bash
sudo docker save
sudo docker load
```

# Container Operations

## 1. Create and Delete container

``` bash
sudo docker create

sudo docker rm
```

## 2. Start and Stop container

``` bash
sudo docker start
sudo docker restart
sudo docker run

sudo docker stop
sudo docker kill
```

## 3. View container

``` bash
sudo docker ps
sudo docker logs
```

## 4. Enter container

``` bash
sudo docker attach
sudo docker exec
sudo docker nsenter
```

## 5. Import and Export container

``` bash
sudo docker import
sudo docker export
```