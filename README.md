# FlowersApp

FlowersApp es una aplicación móvil para regalar o recibir flores. Incluye secciones de inicio, inventario, jardín, escáner y perfil, además de pantallas de inicio de sesión y ajustes.

## Stack

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- React Native 0.88 y React 19
- Expo Router para rutas y navegación
- React Navigation para las pestañas
- NativeWind 4 y Tailwind CSS 3 para estilos
- React Native SVG para iconografía e ilustraciones

## Requisitos

- Node.js 20.19 o superior (se recomienda una versión LTS).
- npm.
- Expo Go compatible con Expo SDK 58 para ejecutar la app en un dispositivo.

> El proyecto utiliza Expo SDK 58. Expo Go con SDK 57 no es compatible directamente; para usarlo con SDK 57 habría que adaptar el SDK y las dependencias del proyecto.

## Instalación y ejecución

Clona el repositorio y entra en la carpeta:

```bash
git clone https://github.com/xCr1s12/FlowersApp.git
cd FlowersApp
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npx expo start
```

Escanea el código QR con Expo Go en tu dispositivo. También puedes abrir la app en un emulador desde la interfaz de Expo CLI.

## Estructura del proyecto

```text
FlowersApp/
├── src/
│   ├── app/                    # Rutas y layouts de Expo Router
│   │   ├── (tabs)/              # Pantallas con navegación por pestañas
│   │   ├── login.jsx
│   │   └── _layout.jsx
│   ├── assets/                 # Imágenes e iconos SVG
│   ├── components/             # Componentes reutilizables
│   │   └── navigation/          # Componentes de navegación
│   ├── constants/              # Colores y fuentes
│   ├── screens/                # Pantallas de la aplicación
│   └── global.css              # Estilos globales de NativeWind
├── app.json                    # Configuración de Expo
├── babel.config.js
├── index.js                    # Punto de entrada
├── package.json                # Dependencias y scripts
├── tailwind.config.js
└── README.md
```
