# Antiban no Cloudflare Pages

O projeto está preparado para ser publicado como um site estático no Cloudflare Pages.

## Configuração do projeto

- **Root directory:** `/`
- **Build command:** `pnpm run build:cloudflare`
- **Build output directory:** `artifacts/antiban-site/dist/public`
- **Node.js:** 20 ou superior
- **Variáveis de ambiente:** nenhuma

O arquivo `wrangler.toml` na raiz também define o diretório de saída para uso com o Wrangler:

```bash
pnpm run build:cloudflare
npx wrangler pages deploy artifacts/antiban-site/dist/public
```

O arquivo `public/_redirects` mantém o fallback para `index.html` caso novas rotas client-side sejam adicionadas depois.