---
sidebar_position: 1
---

# Format des JSON

## Introduction

Les messages JSON permettent de configurer et contrôler les vibrations haptiques des bracelets via MQTT.

:::info
Pour réaliser l'ensemble de nos tests, nous avons mis en place un broker MQTT à l'adresse 178.170.38.88 et le port 55555.
:::

## Structure des JSON de configuration

Un message de configuration définit les séquences haptiques liées à une alerte. Exemple :

```json
{
  "alert": {
    "data": [0, 118, 200, 1, 56, 200],
    "x_fois": 2,
    "priority": 3
  }
}
```

- `data` : Liste contenant :
  - **N° du moteur** : Identifie quel moteur doit exécuter la commande.
  - **N° du pattern haptique** : Réfère à un pattern vibratoire spécifique (ex : `118` pour un "Long buzz").
  - **Délai** : Temps en millisecondes avant l’exécution de la prochaine commande dans la liste.
- `x_fois` : Nombre de répétitions de la séquence.
- `priority` : Niveau de priorité.

:::info
Pour en savoir plus sur le fonctionnement des drivers haptiques DRV2605L, consultez le [manuel officiel](https://www.ti.com/lit/gpn/drv2605l).
:::

### Configuration multiple

Vous n'êtes pas obligé de configurer les 8 moteurs dans une configuration. Chaque configuration peut définir des séquences haptiques pour le nombre de moteurs souhaité. Exemple :

```json
{
  "alert": {
    "data": [0, 118, 200, 1, 56, 200],
    "x_fois": 1,
    "priority": 1
  },
  "bonjour": {
    "data": [0, 118, 200],
    "x_fois": 1,
    "priority": 2
  }
}
```

Ici, le pattern `alert` utilise 2 moteurs, et le pattern `bonjour` utilise 1 moteur.

## Exemples de messages

Pour configurer une alerte, envoyez ce message au topic `/config/` :

```bash
mosquitto_pub -h 178.170.38.88 -t /config/ -m '{"alert":{"data":[0,118,200,1,56,200],"x_fois":2,"priority":3}}' -p 55555
```

Pour exécuter l'alerte configurée, envoyez son nom au topic `/pattern/` :

```bash
mosquitto_pub -h 178.170.38.88 -t /pattern/ -m alert -p 55555
```

## Gestion des moteurs et séquences

Les moteurs haptiques, contrôlés par le driver **DRV2605L**, utilisent des patterns prédéfinis. Une configuration pour 8 moteurs pourrait ressembler à ceci :

```json
{
  "alert": {
    "data": [0, 118, 200, 1, 56, 200, 2, 118, 200, 3, 56, 200, 4, 118, 200, 5, 56, 200, 6, 118, 200, 7, 56, 200],
    "x_fois": 1,
    "priority": 1
  }
}
```

Ce message exécute des séquences sur les 8 moteurs, avec un délai de 200 ms entre chaque commande, simulant une vibration coordonnée.
