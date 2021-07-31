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
4. Diagramas sistema
5. Aspectos técnicos
6. Endpoints
7. RUTAS
8. Documentación de apoyo

## INTRODUCCIÓN
El presente documento detalla los elementos basicos de proyecto de suficiencia, el cual fue desarrollado por el alumno Diego Berrios - 201503609 del curso de sistemas operativos 1. Documentado de la mejor manera posible


## OBJETIVOS
### GENERAL
* Hacer uso adecuado de las tecnologias de la nube para el entendimiento del funcionamiento de servicios de mensajeria, kernel, Virtualización y servicios serverless.
## ESPECIFICOS
* Comprender la teoría de la concurrencia y el paralelismo para desarrollar sistemas distribuidos.
* Experimentar y probar con las tecnologías Cloud Native útiles para desarrollar sistemas distribuidos modernos.
* Diseñar estrategias de sistemas distribuidos para mejorar la respuesta de alta concurrencia.
* Monitorear procesos distribuidos utilizando tecnologías asociadas a la observabilidad y la telemetría.
* Implementar contenedores y orquestadores en sistemas distribuidos.
* Medir la fidelidad y el desempeño en sistemas con alta disponibilidad.
* Implementar la Chaos Engineering

## DIAGRAMAS

## ASPECTOS TECNICOS 

CONEXIONES
```python
   Conexión a MongoDB: mongodb://rootdev:rootdev@34.67.40.100:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false

```

Levantas App con Run Function
```Docker
   docker build -t gcr.io/fine-byway-320501/react-app:latest .
   docker push gcr.io/fine-byway-320501/react-app:latest
```

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

## RUTAS
- APP: https://react-app-th2kecxw4q-uc.a.run.app/
- HUB: https://hub.docker.com/repositories
- REPO: https://github.com/201503609/suficiencia

## DOCUMENTACIÓN DE APOYO
- https://drive.google.com/drive/folders/1LH3yJ9aoRqsDGO_8nwIQhHxakR6mzFI9
- https://stackoverflow.com/questions/56531880/how-does-the-kernel-use-task-struct#:~:text=Yes%2C%20the%20task_struct%20structure%20contains%20all%20the%20information,you%20can%20use%20the%20find_task_by_vpid%20function%20as%20follows%3A
- https://www.informit.com/articles/article.aspx?p=368650
- http://manpages.ubuntu.com/manpages/bionic/es/man1/top.1.html
- https://stackoverflow.com/questions/65536875/linkerd-traffic-split-with-nginx-ingress-controller
- https://stackshare.io/stackups/grpc-vs-kafka
- https://chaos-mesh.org/docs/next/chaos_experiments/podchaos_experiment/