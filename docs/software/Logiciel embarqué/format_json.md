---
sidebar_position: 1
title: Format de configuration JSON pour les patterns haptiques
sidebar_label: Format JSON
---

# Format de configuration JSON pour les patterns haptiques

Un **pattern haptique** est une séquence de vibrations envoyées à un ou plusieurs moteurs de la manchette. Chaque moteur reçoit un effet (brève pulsation, vibration prolongée, etc.), et l’ensemble coordonné de ces effets constitue le *pattern*.

:::info
Nous utilisons un broker MQTT de test accessible à l’adresse `178.170.38.88` sur le port `55555`.
:::

---

## Structure du JSON de configuration

Pour configurer des patterns sur la manchette haptique, on utilise un **format JSON** structuré de la manière suivante :

1. **`number`** : le **nombre de patterns** inclus dans le message.  
2. Un ou plusieurs blocs (ex. : `Urgent`, `Bonjour`, `Alert`, etc.) définissant les patterns. Chaque bloc contient :
   - **`data`** : Une liste de triplets `[moteur, effet_haptique, délai]` :
     - **moteur** : Numéro du moteur (de 0 à 7, s’il y a 8 moteurs).  
     - **effet_haptique** : Identifiant (ex. `118`, `56`, etc.) dépendant du driver.  
     - **délai** (ms) : Temps d’attente avant la prochaine commande de la liste `data`.
   - **`x_fois`** : Nombre de répétitions de la séquence complète définie par `data`.
   - **`delai`** : Délai (en millisecondes) entre deux répétitions lorsque `x_fois` > 1.

---

:::tip
Le champ `delai` permet de gérer le temps d’attente entre plusieurs répétitions de la séquence. Si `x_fois` = 1, ce champ n’a pas d’incidence.
:::

### Exemple de configuration simple

```json
{
  "Urgent": {
    "data": [0, 118, 0, 1, 118, 0, 2, 118, 0, 3, 118, 0, 4, 118, 0, 5, 118, 0, 6, 118, 0, 7, 118, 0],
    "x_fois": 1,
    "delai": 0
  },
  "number": 1
}
```

Dans cet exemple :

- **`number: 1`** : Il n’y a qu’un seul pattern dans le message, nommé `Urgent`.
- **`Urgent`** :
  - **`data`** : Les triplets `[0, 118, 0]`, `[1, 118, 0]`, etc., signifient :  
    1. Activer le moteur **0** avec l’effet **118**, puis attendre **0 ms**.  
    2. Activer le moteur **1** avec l’effet **118**, puis attendre **0 ms**.  
    3. Et ainsi de suite jusqu’au moteur **7**.  
  - **`x_fois: 1`** : La séquence `data` est jouée **une seule fois**.  
  - **`delai: 0`** : Aucun temps mort ajouté entre deux répétitions (puisque `x_fois = 1`, ce champ n’a pas d’effet ici).

---

## Publier des messages via MQTT

### 1. Configuration (ajout ou mise à jour) d’un pattern

Pour **enregistrer** un ou plusieurs patterns dans la mémoire persistante de la manchette (ESP32), publiez un message sur le **topic** `/manchette/config/` :

```bash
mosquitto_pub \
  -h 178.170.38.88 \
  -t /manchette/config/ \
  -m '{"Urgent":{"data":[0,118,0,1,118,0,2,118,0,3,118,0,4,118,0,5,118,0,6,118,0,7,118,0],"x_fois":1,"delai":0},"number":1}' \
  -p 55555
```

:::info
Après réception, la manchette stocke la configuration du pattern `Urgent` dans sa mémoire persistante.  
Toute nouvelle configuration portant le même nom de pattern (par ex. `Urgent`) remplacera l’ancienne configuration en mémoire.
:::

---

### 2. Exécution d’un pattern

Pour **lancer** un pattern précédemment configuré, il suffit d’envoyer son nom sur le topic `/manchette/pattern/` :

```bash
mosquitto_pub \
  -h 178.170.38.88 \
  -t /manchette/pattern/ \
  -m "Urgent" \
  -p 55555
```

La manchette va alors rechercher le pattern nommé `Urgent` et **jouer** la séquence définie dans `data`.

---

### 3. Récupération de la liste des patterns configurés

Il est possible de **demander** à l’ESP32 la liste des patterns qu’il a en mémoire persistante. Pour cela, publiez un message (le contenu peut être vide ou arbitraire) sur le topic :

```
/manchette/request_patterns/
```

L’ESP32 répondra alors sur le topic :

```
/manchette/patterns_response/
```

La réponse se présentera sous la forme d’une série de messages encadrés par les mots-clés `start` et `end`, par exemple :

```
start
{
  "name": "Urgent",
  "data": [ ... ],
  "x_fois": 1,
  "delai": 0
}
{
  "name": "Alert",
  "data": [ ... ],
  "x_fois": 2,
  "delai": 100
}
end
```

Vous obtiendrez ainsi le JSON complet des patterns enregistrés. Chaque pattern est listé avec ses paramètres `data`, `x_fois` et `delai`.

---

## Récapitulatif

1. **Définition et enregistrement** : Publiez votre configuration JSON (contenant `number` et les blocs de patterns) sur `/manchette/config/`.  
2. **Exécution** : Publiez le nom du pattern que vous souhaitez lancer sur `/manchette/pattern/`.  
3. **Interrogation** : Publiez un message (vide ou non) sur `/manchette/request_patterns/` pour recevoir la liste complète des patterns sur `/manchette/patterns_response/`.

Cette approche vous permet de construire et d’exécuter facilement des effets vibratoires complexes, tout en profitant de la **mémoire persistante** pour stocker et réutiliser vos patterns.