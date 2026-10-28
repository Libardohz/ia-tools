try {
  require('dotenv').config();
} catch (e) {
  // dotenv opcional si las variables ya vienen en process.env
}

/**
 * Valida que exista una API Key configurada
 */
function validateConfig(apiKey) {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
    throw new Error('API key es requerida para inicializar Firecrawl.');
  }
  return true;
}

/**
 * Inicializa el cliente oficial de Firecrawl
 */
function createFirecrawlClient(config = {}) {
  const apiKey = config.apiKey || process.env.FIRECRAWL_API_KEY;
  validateConfig(apiKey);

  const FirecrawlApp = require('@mendable/firecrawl-js').default || require('@mendable/firecrawl-js');
  return new FirecrawlApp({
    apiKey,
    apiUrl: config.apiUrl || process.env.FIRECRAWL_API_URL
  });
}

/**
 * Extrae contenido en Markdown y metadatos de una URL
 */
async function scrapeUrl(url, options = {}, injectedClient = null) {
  if (!url || !/^https?:\/\//i.test(url)) {
    throw new Error(`URL inválida: "${url}". Debe comenzar con http:// o https://`);
  }

  const client = injectedClient || createFirecrawlClient();

  try {
    const params = {
      formats: ['markdown'],
      ...options
    };

    const response = await client.scrapeUrl(url, params);
    return {
      success: true,
      markdown: response.markdown || response.data?.markdown || '',
      metadata: response.metadata || response.data?.metadata || {},
      raw: response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || String(error)
    };
  }
}

module.exports = {
  validateConfig,
  createFirecrawlClient,
  scrapeUrl
};
