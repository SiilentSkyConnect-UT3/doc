---
sidebar_position: 0
---

# Exigences Matérielles

## Alimentation

- **Source d’alimentation USB**  
  - Alimentation en 5 V via un connecteur USB-C.  
  - Protection contre les surtensions (diodes TVS ou équivalent).  

- **Batterie LiPo (1S)**  
  - Assurer au moins 3 heures d’autonomie dans des conditions d’utilisation standard.  
  - Mettre en place un circuit de charge dédié, avec bascule automatique entre USB et batterie pour une alimentation ininterrompue.  
  - Inclure un régulateur de tension (3,3 V) capable de fournir suffisamment de courant pour le microcontrôleur et les drivers, avec une marge de sécurité.

## Pilotage Haptique

- **Drivers Haptiques**  
  - Un driver par moteur ou un multiplexeur I²C si plusieurs moteurs partagent la même adresse.  
  - Possibilité de générer des profils de vibration variés (effets prédéfinis ou personnalisés).

- **Moteurs Haptiques (ERM ou LRA)**  
  - Compatibles avec la tension d’alimentation de 3,3 V (ou 3,7 V nominal pour un fonctionnement direct sur batterie).  
  - Prévoir des connecteurs standard (type JST) pour un remplacement ou un ajout de moteurs sans difficulté.

## Interface Physique

- **Connecteur de Programmation/Communication**  
  - Liaison série (type USB-to-UART ou équivalent) permettant la mise à jour du firmware et l’accès au débogage.

- **Connecteur USB-C**  
  - Nécessaire pour l’alimentation principale et la charge de la batterie.  
  - Doit être protégé contre les décharges électrostatiques (ESD) et disposer d’une rétention mécanique suffisante.