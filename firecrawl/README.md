# Herramienta Firecrawl (Web a Markdown para LLMs)

Este módulo provee extracción y scraping limpio de cualquier sitio web, convirtiendo páginas HTML complejas en formato Markdown estructurado listo para ser consumido por modelos de lenguaje o bases de datos vectoriales.

---

## 🚀 Instalación de dependencias

Dentro de esta carpeta:
```bash
npm install
```

---

## ⚙️ Configuración

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
2. Añade tu `FIRECRAWL_API_KEY` (puedes obtener créditos gratuitos en [firecrawl.dev](https://www.firecrawl.dev)).

---

## 💻 Uso como CLI (Línea de comandos)

Para ver el contenido en terminal:
```bash
node src/cli.js https://ejemplo.com
```

Para guardar directamente el resultado en un archivo Markdown:
```bash
node src/cli.js https://ejemplo.com salida.md
```

---

## 📦 Uso como Módulo en otros proyectos

Puedes requerir o importar `firecrawl-service.js` en cualquier script:

```javascript
const { scrapeUrl } = require('./ia-tools/firecrawl/src/firecrawl-service');

async function procesar() {
  const respuesta = await scrapeUrl('https://ejemplo.com');
  if (respuesta.success) {
    console.log('Markdown extraído:', respuesta.markdown);
    console.log('Metadatos:', respuesta.metadata);
  } else {
    console.error('Error:', respuesta.error);
  }
}

procesar();
```

---

## 🧪 Pruebas automatizadas

Para ejecutar la suite de pruebas unitarias:
```bash
npm test
```

