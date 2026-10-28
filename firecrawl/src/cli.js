#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { scrapeUrl } = require('./firecrawl-service');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Uso de Firecrawl CLI:
  node src/cli.js <url> [archivo_salida.md]

Ejemplos:
  node src/cli.js https://ejemplo.com
  node src/cli.js https://noticias.ycombinator.com salida.md

Variables de entorno requeridas:
  FIRECRAWL_API_KEY=tu_api_key (en .env o en el entorno)
`);
    process.exit(0);
  }

  const targetUrl = args[0];
  const outputFile = args[1];

  console.log(`[Firecrawl] Extrayendo contenido de: ${targetUrl}...`);

  const result = await scrapeUrl(targetUrl);

  if (!result.success) {
    console.error(`[Error] Falló la extracción: ${result.error}`);
    process.exit(1);
  }

  console.log(`[Éxito] Contenido extraído correctamente.`);
  if (result.metadata?.title) {
    console.log(`[Título] ${result.metadata.title}`);
  }

  if (outputFile) {
    const outputPath = path.resolve(process.cwd(), outputFile);
    fs.writeFileSync(outputPath, result.markdown, 'utf-8');
    console.log(`[Guardado] Archivo guardado en: ${outputPath}`);
  } else {
    console.log('\n--- CONTENIDO MARKDOWN ---\n');
    console.log(result.markdown);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Error no controlado:', err);
    process.exit(1);
  });
}

