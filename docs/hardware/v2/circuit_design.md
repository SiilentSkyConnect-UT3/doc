---
sidebar_position: 1
---

# Circuit Design V2

## Révision du Circuit de puissance

Le **TPS62827** a été retenu comme régulateur de tension en raison de ses performances adaptées aux besoins du système. Ce régulateur, de type buck (abaisseur), présente un rendement élevé pouvant atteindre 90 %. Sa plage de tension d'entrée de 2,4 V à 5,5 V le rend compatible avec une batterie LiPo 1S, dont la tension varie typiquement entre 3,0 V (batterie presque déchargée) et 4,2 V (batterie pleine).

En fonctionnement, le TPS62827 permet de réguler une sortie de 3,3 V avec une capacité de courant pouvant atteindre 2 A, il est capable de couvrir les besoins de crête du système, notamment lorsque les moteurs haptics associés au DRV2605 entrent en fonctionnement.

Le choix de ce composant est également motivé par la simplification qu’il apporte au circuit global. Un seul TPS62827 suffit pour alimenter l'ensemble du système, ce qui réduit le nombre de composants et la complexité de l'assemblage.
