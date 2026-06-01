# Webflow Campus App

React Native / Expo app voor stap 3 van de opdracht.

## Starten

```bash
cd webflow-campus-app
npm install
npx expo start -c
```

Scan daarna de QR-code met Expo Go op je GSM.

## Wat zit erin?

- Stack Navigator met Home, productdetails, nieuwsdetails en campusdetails
- Herbruikbare `ProductCard`, `NewsCard` en `CampusCard`
- Fake data voor 10 producten, 6 nieuwsartikelen en 8 campussen
- Zoekfunctie, categoriefilter en sorteerfunctie voor producten en nieuws
- Productdetail met aantal, minimum 1 en totale prijs
- Studiezoeker met filters
- Webflow API-code staat in `screens/HomeScreen.js`, zoals in de lesvoorbeelden

## Later invullen

Maak lokaal een `.env` bestand aan met je Webflow token:

```bash
EXPO_PUBLIC_WEBFLOW_TOKEN=your_webflow_api_token_here
```

De collection IDs staan bovenaan in `screens/HomeScreen.js`.
