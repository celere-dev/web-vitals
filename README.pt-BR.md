[English (US)](./README.md) | Português (BR)

# Célere Web Vitals

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2Fcelere-dev%2Fcelere-web-vitals%2Factions%2Fworkflows%2F128475555%2Fruns%3Fstatus%3Dcompleted%26per_page%3D1&query=%24.workflow_runs%5B0%5D.run_started_at&style=flat-square&label=último%20e-mail%20enviado&color=%232f0b48&link=https%3A%2F%2Fgithub.com%2Fcelere-dev%2Fcelere-web-vitals%2Factions)

Aplicação baseada em Deno que gera um relatório do Lighthouse e o envia como texto simples por e-mail usando a API Resend através do GitHub Actions.

A aplicação avalia os Core Web Vitals de maneira personalizada, considerando que nenhum teste de interatividade é realizado durante a geração do relatório. Ela executa o Lighthouse em seu modo padrão de navegação, simulando um ambiente sem usuário.

Três métricas são usadas para calcular os Core Web Vitals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS) e Total Blocking Time (TBT), que [substitui](https://web.dev/articles/inp?hl=pt-br#lab-measurement) o Interaction to Next Paint (INP). Seguindo a metodologia do Google, se um site atingir o 75º percentil para cada métrica, ele é rotulado como "aprovado"; caso contrário, é marcado como "reprovado".

As seguintes métricas são incluídas no relatório:

- Core Web Vitals (LCP, CLS, TBT)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Time to First Byte (TTFB)

Pontuações de desempenho também são fornecidas:

- Performance
- Acessibilidade
- Melhores Práticas
- SEO

Além disso, a aplicação suporta:

- Configuração do idioma do texto. Atualmente disponível em inglês (`en`) e português brasileiro (`pt-BR`)
- Análise de múltiplos sites
- Envio de relatórios para múltiplos destinatários
- Configuração do remetente, destinatários, sites e idioma (locale) via variáveis de ambiente

Saiba mais sobre [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals?hl=pt-br).

## Uso

### Requisito

- Chave de API do [Resend](https://resend.com/)

### Configuração

Para usar este workflow, você precisa configurar as seguintes variáveis de ambiente no GitHub Secrets:

1. Clone ou faça um fork deste repositório.

2. Adicione os secrets ao seu repositório GitHub. Vá para `Settings > Secrets and variables > Actions` e adicione os secrets necessários.

    - `RESEND_API_KEY`: Sua chave API do Resend.
    - `RESEND_EMAIL_FROM`: O endereço de e-mail do remetente.
    - `RESEND_EMAIL_TO`: O endereço de e-mail do destinatário.
    - `URLS`: As URLs que você deseja monitorar.
    - `LOCALE`: O idioma desejado para o relatório.

    Use o arquivo [.example.env](.example.env) como referência.

3. O workflow será executado automaticamente com o cron job configurado, ou você pode acioná-lo manualmente via `workflow_dispatch`. Use [crontab.guru](https://crontab.guru/) para editar a expressão.

    ```yaml
    schedule:
        - cron: "0 11 * * 1"
    ```

### Exemplo de e-mail enviado

Assunto:
```
exemplo.com - Core Web Vitals: reprovado - Desempenho: 41
```

Texto:
```
URL: https://exemplo.com
Criado em: 22/11/2024, 18:53:48

- Web Vitals -
Core Web Vitals (LCP, CLS, TBT): reprovado
Largest Contentful Paint (LCP): ruins
Cumulative Layout Shift (CLS): precisa melhorar
First Contentful Paint (FCP): precisa melhorar
Total Blocking Time (TBT): lento
Time to First Byte (TTFB): boas

- Pontuações -
Desempenho: 41
Acessibilidade: 82
Práticas recomendadas: 100
SEO: 100

Este relatório é gerado em um ambiente simulado sem um usuário.
```

## Desenvolvimento

### Requisitos

- Deno 2.0.6+
- Google Chrome 131+
- Chave de API do Resend

### Instalação

1. Clone este repositório.

    ```bash
    git clone git@github.com:celere-dev/web-vitals.git
    ```

2. Configure as variáveis em um arquivo `.env` localizado no diretório raiz do projeto. Use o arquivo [.example.env](.example.env) como referência.

    ```bash
    cp .example.env .env
    ```

3. Instale as dependências.

    ```bash
    deno install
    ```

4. Execute a task.

    ```bash
    deno task send
    ```

### Nota de desenvolvimento

O aviso "Not implemented: ClientRequest.options.createConnection" geralmente indica que você está tentando usar um recurso do Node.js que não é suportado pelo Deno.

## Licença

Este projeto é licenciado sob os termos da GNU General Public License v3.0.
