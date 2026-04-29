# Steam Lua Vault - Sistema Automático para GitHub Pages

Este es tu sistema completo para gestionar descargas de archivos `.lua`.

## 🚀 Cómo ponerlo en marcha (Setup)

1. **Sube los archivos a GitHub:** Crea un nuevo repositorio en GitHub y sube todo el contenido de esta carpeta.
2. **Activa GitHub Pages:** 
   - Ve a `Settings` -> `Pages` en tu repositorio.
   - En `Build and deployment` -> `Source`, selecciona **GitHub Actions**.
3. **¡Listo!** Cada vez que subas una nueva carpeta a `gameD/`, la web se actualizará sola.

## 📁 Cómo agregar nuevos juegos

Simplemente crea una carpeta dentro de `gameD/` con esta estructura:
- `Nombre del Juego/icon.png` (La imagen de portada)
- `Nombre del Juego/read.me` (La descripción y texto de la página)
- `Nombre del Juego/ID_DEL_JUEGO.zip` (El archivo que se descargará)

## 💰 Configuración de AdSense

Abre el archivo `public/config.json` y cambia estos valores:
- `clientId`: Tu ID de editor de AdSense (`ca-pub-xxx`).
- `enabled`: Cámbialo a `true` cuando quieras que aparezcan los anuncios.
- `slots`: Coloca los IDs de tus bloques de anuncios.

## 🛠️ Personalización

- **Colores y Bordes:** Puedes ajustarlos en `tailwind.config.js`.
- **Texto de Soporte:** Se cambia en `public/config.json`.
