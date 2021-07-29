### UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
### FACULTAD DE INGENIERIA
### ORGANIZACIÓN DE LENGUAJES Y COMPILADORES 2
### ESCUELA DE VACIONES JUNIO 2021
---
# MANUAL TÉCNICO
---
## INDICE
1. Introducción
2. Objetivos
3. Alcances del proyecto
4. Requerimientos técnicos
5. Diagramas sistema
6. Aspectos técnicos
7. Endpoints
8. Glosario

## INTRODUCCIÓN
El presente documento detalla los elementos basicos de proyecto de suficiencia, el cual fue desarrollado por el alumno Diego Berrios - 201503609 del curso de sistemas operativos 1. Documentado de la mejor manera posible


## OBJETIVOS
### GENERAL
* 
## ESPECIFICOS
* 
* 

## ALCANCE DEL PROYECTO
* 

## REQUERIMIENTOS TECNICOS
* 

## DIAGRAMAS

## ASPECTOS TECNICOS 


```python

```

Conexión a MongoDB: mongodb://rootdev:rootdev@34.67.40.100:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false


Comando para levantar el contenido de los archivos docker-compose.yml:
```yml
# LEVANTAR DOCKER-COMPOSE

sudo docker-compose up -d --build

```

Instrucciones para levantar los modulos de los procesos
```java
# LEVANTAR LOS PROCESOS 
## INSTALAR MAKE Y KERNEL-HEADERS
 1. apt-get update
 2. apt-get install -y make gcc libncurses5-dev dpkg-dev
 3. sudo apt-get install build-essential checkinstall
 4. sudo apt-get install kernel-headers-

## EJECUTAR MAKEFILE
1. ubicamos nuestro Makefile
2. sudo make
3. sudo insmod module.ko  -> para cargarlo
4. sudo lsmod -> para listar los modulos 
```

Correr comandos docker sin necesidad de SUDO
```yml
# RUN DOCKER WITHOUT SUDO
- whoami
- sudo groupadd docker 
- sudo usermod -aG docker berriosdiego15
- newgrp docker
```


## ENDPOINTS
```js
- '/test'
   - PETICION: post
   - URL: /
   - CUERPO: nada
   - RESP: id de la inserción en MongoDb
   - DB: MongoDB

- '/data'
   - PETICION: get
   - URL: /last
   - CUERPO: nada
   - RESP: todos los datos del ultimo ingresado al primero
   - DB: MongoDB

- '/graphs'
   - PETICION: get
   - URL: /gender
   - CUERPO: nada
   - RESP: Genero y cuantas veces aparece 
   - DB: MongoDB

   - PETICION: get
   - URL: /location
   - CUERPO: nada
   - RESP: pais y cuantas veces aparece 
   - DB: MongoDB

   - PETICION: get
   - URL: /general
   - CUERPO: nada
   - RESP: géneros de los vacunados por país
   - DB: MongoDB

'/country'
   - PETICION: get
   - URL: /
   - CUERPO: nada
   - RESP: Pais y habitantes por pais
   - DB: MongoDB

'/vaccinated'
   - PETICION: get
   - URL: /test
   - CUERPO: nada
   - RESP: hola, para validar que esta arriba el servicio
   - DB: MongoDB

   - PETICION: post
   - URL: /newVaccinated
   - CUERPO: 
   ``` json
        {
            "name": "Pablo 3 ",
            "location": "Guatemala City",
            "gender": "male",
            "age": 35,
            "vaccine_type": "Sputnik V"
        }
    ```
   - RESP: id de atributo en MongoDb
   - DB: MongoDB

   - PETICION: get
   - URL: /topTenVaccinated
   - CUERPO: nada
   - RESP: top 10 de paises vacunados con su cantidad de vacunados
   - DB: MongoDB

'/ram'
   - PETICION: get
   - URL: /
   - CUERPO: nada
   - RESP: totalRam, freeRam, usedRam, percentFree
   - linux kernel

'/procs'
   - PETICION: get
   - URL: /
   - CUERPO: nada
   - RESP: listado de procediminetos
   - linux kernel


'/cpu'
   - PETICION: get
   - URL: /
   - CUERPO: nada
   - RESP: tiempo total de uso, tiempo de uso sin idle
   - linux kernel

'/redis'
   - PETICION: get
   - URL: /allVals
   - CUERPO: nada
   - RESP: todos los valores en redis
   - DB: redis

   - PETICION: post
   - URL: /newCase
   - CUERPO: {
                "name": "Pablo 3 ",
                "location": "Guatemala City",
                "gender": "male",
                "age": 35,
                "vaccine_type": "Sputnik V"
            }
   - RESP:  posición en redis
   - DB: redis
```

   ## GLOSARIO
