const { describe, it } = require('node:test');
const assert = require('node:assert');
const { validateConfig, scrapeUrl, createFirecrawlClient } = require('../src/firecrawl-service');

describe('Firecrawl Service Unit Tests', () => {
  describe('validateConfig', () => {
    it('throws error when apiKey is missing', () => {
      assert.throws(() => validateConfig(''), /API key es requerida/);
      assert.throws(() => validateConfig(null), /API key es requerida/);
    });

    it('passes when valid apiKey is provided', () => {
      assert.doesNotThrow(() => validateConfig('fc-test-key-123'));
    });
  });

  describe('scrapeUrl input validation', () => {
    it('throws error for invalid URL', async () => {
      const mockClient = { scrapeUrl: async () => ({}) };
      await assert.rejects(
        async () => scrapeUrl('not-a-valid-url', {}, mockClient),
        /URL inválida/
      );
    });

    it('extracts markdown content successfully with mock client', async () => {
      const mockClient = {
        scrapeUrl: async (url, params) => ({
          success: true,
          markdown: '# Título de Prueba\nContenido extraído.',
          metadata: { title: 'Prueba', statusCode: 200 }
        })
      };

      const result = await scrapeUrl('https://ejemplo.com', {}, mockClient);
      assert.strictEqual(result.success, true);
      assert.ok(result.markdown.includes('Título de Prueba'));
      assert.strictEqual(result.metadata.statusCode, 200);
    });

    it('handles scraper errors gracefully', async () => {
      const mockClient = {
        scrapeUrl: async () => {
          throw new Error('Firecrawl API timeout');
        }
      };

      const result = await scrapeUrl('https://ejemplo.com', {}, mockClient);
      assert.strictEqual(result.success, false);
      assert.ok(result.error.includes('Firecrawl API timeout'));
    });
  });
});

