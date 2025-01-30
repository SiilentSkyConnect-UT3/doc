---
sidebar_position: 2
---

# Analyse du design V1

Cette section évalue la consommation électrique du prototype V1 et met en évidence les points à améliorer. Deux scénarios sont présentés : le **cas nominal** d’utilisation et le **pire cas** (tous les moteurs activés simultanément, avec le microcontrôleur au maximum de ses capacités).

## Tableau des Courants des Composants

Le tableau ci-dessous récapitule les valeurs usuelles (nominales) et maximales pour chaque composant. Les valeurs maximales tiennent compte des spécifications fournies par les constructeurs ou de conditions d’utilisation extrêmes (débit réseau important, forte sollicitation moteur, etc.).

| Composant                  | Courant Nominal (mA) | Courant Maximal (mA) | Commentaire                                       |
|----------------------------|-----------------------|-----------------------|----------------------------------------------------|
| **ESP32-C3**               | 80                   | 500                   | Forte variabilité en fonction du Wi-Fi/BLE.       |
| **USB-to-UART CP2102N**    | 9.5 (115 200 baud)   | 13.7 (3 Mbaud)        | 195 µA en mode veille. Dépend du débit série.     |
| **DRV2605L (par driver)**  | 2.3                  | 3.5                   | Ne pas oublier la consommation du moteur associé. |
| **Multiplexeur TCA9548A**  | 0.02                 | 0.035                 | Très faible consommation.                         |
| **Moteur Haptique (ERM)**  | 120                  | 150                   | Consommation tirée via le DRV2605L.               |

## Consommation en Pire Cas

Le tableau suivant additionne la consommation **maximale** de chaque composant alimenté en 3,3 V :

| Composant                  | Quantité | Courant Max. (mA) | Total (mA)                               |
|----------------------------|----------|--------------------|------------------------------------------|
| **ESP32-C3**               | 1        | 500                | 500                                      |
| **USB-to-UART CP2102N**    | 1        | 13.7               | 13.7                                     |
| **DRV2605L**               | 8        | 3.5                | 28 (8 × 3.5)                             |
| **Moteurs ERM**            | 8        | 150                | 1200 (8 × 150)                           |
| **Multiplexeur TCA9548A**  | 1        | 0.035              | 0.035                                    |
| **LED Indicateur**         | 1        | 10                 | 10                                       |
| **Total**                  | —        | —                  | **1752 mA**                              |

En ajoutant ces valeurs, on obtient une consommation potentielle d’environ **1,752 A** en 3,3 V. Le **TL1963A**, prévu pour alimenter jusqu’à **1,5 A**, se révèle donc insuffisant dans ce cas extrême.

:::danger Attention
Avec 1,752 A au maximum, le TL1963A ne couvre pas la totalité des besoins. Un régulateur supportant au moins 2 A est recommandé pour une fiabilité optimale.
:::

## Consommation en Cas Nominal

Le tableau ci-dessous illustre les consommations **nominales**, plus représentatives d’une utilisation courante, où l’ESP32-C3 n’est pas sollicité au maximum et où tous les moteurs ne tournent pas simultanément à pleine charge.

| Composant                  | Quantité | Courant Nominal (mA) | Total (mA)                                  |
|----------------------------|----------|-----------------------|---------------------------------------------|
| **ESP32-C3**               | 1        | 80                    | 80                                          |
| **USB-to-UART CP2102N**    | 1        | 9.5                   | 9.5                                         |
| **DRV2605L**               | 8        | 2.3                   | 18.4 (8 × 2.3)                              |
| **Moteurs ERM**            | 8        | 120                   | 960 (8 × 120)                               |
| **Multiplexeur TCA9548A**  | 1        | 0.02                  | 0.02                                        |
| **LED Indicateur**         | 1        | 5                     | 5                                           |
| **Total**                  | —        | —                     | **1072.92 mA**                              |

## Améliorations à Envisager

Le design actuel fonctionne dans la plupart des situations nominales, mais il reste prudent :

- **D’adopter un régulateur plus puissant**, capable de délivrer environ 2 A, afin d’éviter tout risque de chute de tension ou de surchauffe.  
- **D’ajuster la capacité de la batterie** en prévoyant des marges de sécurité suffisantes, notamment si plusieurs moteurs fonctionnent souvent en même temps.
