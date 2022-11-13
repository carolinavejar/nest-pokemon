<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar 

```
  npm install
```

3. Tener Nest CLI instalado
 ```
  npm i -g @nestjs/cli
 ```

4. Levantar la base de datos
 ```
  docker-compose up -d
 ```

5. Clonar archivo __.env.template__ y renombrar la copia como __.env__

6. Llenar las variables de __.env__

7.  Ejecutar la aplicación
 ```
  npm run start:dev
 ```

8. Recoustruir DB con seed
 ```
  http://localhost:3000/api/seed
 ```


# Build Production

1. Crear el archivo .env.prod

2. Llenar las vars de prod

3. Crear la nueva imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```



# Notas

 Heroku redeploy sin cambios 
 ```
 git commit --allow-empty -m "Heroku deploy"
 git push heroku *branch*
 ```