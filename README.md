# ☕ Cafeteria dos Sonhos - Site Profissional (v5.0 Elite)

Site estático de alta performance, desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla). Otimizado para SEO Local, conversão (Growth), Acessibilidade (WCAG AA) e conformidade rigorosa com a LGPD.

## 🚀 Instruções de Instalação
1. Crie uma pasta no seu computador.
2. Salve os 5 arquivos (`index.html`, `politica-privacidade.html`, `codigo-etica.html`, `style.css`, `script.js`) nesta pasta.
3. Abra o `index.html` no seu navegador para testar localmente.
4. Para publicar, faça upload desses arquivos para qualquer hospedagem estática (Vercel, Netlify, GitHub Pages ou Hostgator).

## ⚙️ Configuração de Marketing (OBRIGATÓRIO)
Antes de publicar, abra o `index.html` e substitua os placeholders:
1. **Domínio:** Altere `https://www.cafeteiriadossonhos.com.br` nas tags `<link rel="canonical">` e Open Graph.
2. **GA4:** Substitua `G-XXXXXXXXXX` pelo seu ID real.
3. **Google Ads:** Substitua `AW-XXXXXXXXX` pelo seu ID de conversão.
4. **GTM:** Substitua `GTM-XXXXXXX` pelo seu ID do Gerenciador de Tags.
5. **Meta Pixel:** Substitua `1234567890` pelo seu ID de Pixel.

*Nota de Compliance:* Os scripts de marketing estão configurados com `type="text/plain"`. O `script.js` só os converte para `text/javascript` e os executa se o usuário clicar em "Aceitar" no banner de cookies. Isso garante conformidade total com a LGPD.

## ✅ Checklist de Pré-Lançamento (Testes Críticos)
- [ ] **Teste UTM:** Abra `index.html?utm_source=instagram`. Clique no WhatsApp. A mensagem deve dizer "Vim pelo site (Fonte: instagram)".
- [ ] **Teste LGPD:** Abra em aba anônima. Abra o Console (F12) > Rede. Pesquise por "facebook" ou "google-analytics". Nenhum deve carregar até você clicar em "Aceitar".
- [ ] **Teste Mobile:** No celular, a barra inferior "Ligar | WhatsApp" deve aparecer e não cobrir o conteúdo. O botão flutuante deve estar acima dela.
- [ ] **Teste de Formulário:** Preencha e envie. O modal deve abrir com os links de WhatsApp e E-mail já preenchidos com os dados digitados.

## 📈 Próximos Passos (Opcional, mas recomendado)
1. Converter as imagens Unsplash para formato **WebP** para ganhar mais 15-20% de performance.
2. Configurar o Google Meu Negócio com o EXATO mesmo endereço e telefone deste site.
3. Adicionar um `sitemap.xml` na raiz do domínio após a publicação.