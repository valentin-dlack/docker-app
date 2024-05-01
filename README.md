# How to start the project 

```bash
docker-compose up
```

## Problems in the project 

- Je n'ai pas réussi à faire fonctionner le projet avec 2 réplicas du CMS.

Lorsque j'ai ajouté une réplica du CMS j'ai une erreur d'allocation de port :
```
Error response from daemon: driver failed programming external connectivity on endpoint dummy-app-wordpress-1 (9fb2c9fd967285bb32a6d037d6b38248382b4c3a6094bf1f5916e097d205bf10): Bind for 0.0.0.0:8081 failed: port is already allocated
```

Meme si je change le port de wordpress dans le fichier docker-compose.yml, j'ai toujours la meme erreur.