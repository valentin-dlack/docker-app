# Création d'un Dockerfile simple

## Comment construire l'image Docker ?

```bash
docker build -t express-server .
```

## Comment changer le hostname du container pour qu'il corresponde à "**mydocker**" ?

```bash
docker run -p 8080:1337 -h mydocker express-server
```

L'application est maintenant accessible à l'adresse [http://localhost:8080](http://localhost:8080).