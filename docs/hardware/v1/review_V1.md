---
sidebar_position: 2
---

# Hardware Review of V1

## Tableau des Courants des Composants du Circuit

| **Composant**             | **Courant Nominal (mA)** | **Courant Maximal (mA)** | **Commentaire**                                        |
|---------------------------|--------------------------|--------------------------|-------------------------------------------------------|
| **ESP32-C3**              | 80                      | 500                      | Dépend des activités réseau (Wi-Fi/Bluetooth).       |
| **USB-to-UART CP2102N**   | 9.5 (115,200 baud)      | 13.7 (3 Mbaud)           | 195 µA en mode veille. Dépend du débit série.        |
| **DRV2605L (par driver)** | 2.3                     | 3.5                      | Ajoutez la consommation du moteur haptique associé.  |
| **Multiplexeur TCA9548A** | 0.02                    | 0.035                    | Faible consommation sur le bus I²C.                  |
| **Moteur Haptique (ERM)** | 120                     | 150                      | Consommation tirée via le DRV2605L.                  |

---

## Calcul du Pire Cas de Consommation

Nous prenons en compte tous les composants alimentés en **3.3V**, en utilisant leur **courant maximal** tel que spécifié dans les datasheets.

| **Composant**               | **Quantité** | **Courant Maximal (mA)** | **Total (mA)**                                  |
|-----------------------------|--------------|--------------------------|-------------------------------------------------|
| **ESP32-C3**                | 1            | 500                      | 500                                             |
| **USB-to-UART CP2102N**     | 1            | 13.7                     | 13.7                                            |
| **DRV2605L**                | 8            | 3.5                      | 28 (8 × 3.5 mA)                                 |
| **Moteurs Haptiques (ERM)** | 8            | 150                      | 1200 (8 × 150 mA)                               |
| **Multiplexeur TCA9548A**   | 1            | 0.035                    | 0.035                                           |
| **LED Indicateur**          | 1            | 10                       | 10                                              |
| **TOTAL**                   |              |                          | 1752mA                                          |

En condition de pire cas, la consommation totale du circuit alimenté en **3.3V** est d’environ **1752 mA (1.752 A)**.

Le régulateur utilisé dans le circuit est le **TL1963A**, capable de fournir jusqu'à **1.5 A** en sortie. 

:::danger[Attention]

Le régulateur **TL1963A** n'est **pas suffisant** pour alimenter le circuit dans des conditions de pire cas. Il faudra envisager un régulateur capable de fournir au moins **2 A** pour couvrir les besoins du circuit.
:::

---

## Calcul du Cas Nominal de Consommation

Nous utilisons les valeurs typiques de consommation pour chaque composant, telles que spécifiées dans les datasheets.

| **Composant**               | **Quantité** | **Courant Nominal (mA)** | **Total (mA)**                                  |
|-----------------------------|--------------|--------------------------|-------------------------------------------------|
| **ESP32-C3**                | 1            | 80                       | 80                                              |
| **USB-to-UART CP2102N**     | 1            | 9.5                      | 9.5                                             |
| **DRV2605L**                | 8            | 2.3                      | 18.4 (8 × 2.3 mA)                               |
| **Moteurs Haptiques (ERM)** | 8            | 120                      | 960 (8 × 120 mA)                                |
| **Multiplexeur TCA9548A**   | 1            | 0.02                     | 0.02                                            |
| **LED Indicateur**          | 1            | 5                        | 5                                               |
| **TOTAL**                   |              |                          | 1072.92mA                                       |

---

## Eléments à Améliorer

- Ajouter un **switch on/off** pour allumer/éteindre le système.
- Ajouter des **points de test** pour debugger les différentes parties du circuit.
- Modifier le design pour intégrer un **régulateur plus puissant**.
- **Choisir la batterie** en fonction de la consommation maximale.
