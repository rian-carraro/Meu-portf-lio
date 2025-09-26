# Guia de Imagens Personalizadas para o Portfólio

## Como personalizar as imagens de fundo dos itens do portfólio

### Método 1: Usando o atributo `data-background`

Adicione o atributo `data-background` na div do item do portfólio com a URL da imagem:

```html
<div class="portfolio-item" data-category="design" data-background="URL_DA_SUA_IMAGEM">
    <div class="portfolio-image">
        <div class="image-placeholder">
            <i class="fas fa-mobile-alt"></i>
            <p>Seu texto aqui</p>
        </div>
    </div>
</div>
```

### Método 2: Usando estilo inline

Adicione diretamente o estilo na div `image-placeholder`:

```html
<div class="image-placeholder" style="background-image: url('URL_DA_SUA_IMAGEM');">
    <i class="fas fa-mobile-alt"></i>
    <p>Seu texto aqui</p>
</div>
```

### Exemplos de URLs de imagens gratuitas

#### Unsplash (imagens profissionais)
- Design: `https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
- Arquitetura 3D: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
- Web Development: `https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
- Branding: `https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`

#### Suas próprias imagens
- Coloque suas imagens na pasta do projeto
- Use caminhos relativos: `./minha-imagem.jpg`

### Características técnicas

- **Tamanho recomendado**: 1200x800px ou proporção 3:2
- **Formatos suportados**: JPG, PNG, WebP
- **Otimização**: Use ferramentas como TinyPNG para reduzir o tamanho
- **Qualidade**: Para web, use entre 70-90% de qualidade

### CSS aplicado automaticamente

O sistema adiciona automaticamente:
- `background-size: cover` - A imagem cobre toda a área
- `background-position: center` - Centraliza a imagem
- `background-repeat: no-repeat` - Evita repetição
- Overlay escuro (30% de opacidade) para melhor legibilidade do texto

### Personalização avançada

Para maior controle, você pode modificar o CSS da classe `.portfolio-image .image-placeholder`:

```css
.portfolio-image .image-placeholder {
    background-size: contain; /* Para mostrar a imagem completa */
    background-position: top; /* Para posicionar no topo */
}

.portfolio-image .image-placeholder::before {
    background: rgba(0, 0, 0, 0.5); /* Overlay mais escuro */
}
```

### Dicas

1. **Performance**: Use imagens otimizadas para web
2. **Acessibilidade**: Mantenha bom contraste entre texto e fundo
3. **Consistência**: Use imagens com estilo visual similar
4. **Backup**: Sempre mantenha o gradiente padrão como fallback