# Cultura de IA — apresentação interativa

Experiência HTML para uma sessão de 30 a 40 minutos com empregados da Rede Governo.

## Endereços

- `index.html`: tela do apresentador.
- `votar.html`: experiência dos participantes, aberta pelos QR Codes.

## Estúdio IA — LIA e ÍCARO

A apresentação possui um modo local de copresentação com:

- roteiro por cena para LIA e ÍCARO;
- vozes distintas, legendas e avanço automático;
- pausa, retomada e silêncio de emergência;
- seleção de dispositivos de entrada e saída;
- transcrição e respostas improvisadas quando a API está configurada;
- modo de simulação sem API para ensaios iniciais.

O Estúdio IA funciona localmente no notebook pessoal. O GitHub Pages continua servindo a apresentação e a votação, mas não recebe nem armazena a chave da API.

### Iniciar localmente

1. Copie `.env.example` para `.env`.
2. Preencha `OPENAI_API_KEY` no arquivo `.env`. Nunca envie esse arquivo ao GitHub.
3. Execute `npm start`.
4. Abra `http://127.0.0.1:4173`.
5. Clique em `ESTÚDIO IA`.

Sem o arquivo `.env`, o estúdio inicia em modo de simulação e usa as vozes disponíveis no Windows.

### Controles de emergência

- `Alt + P`: pausar a IA.
- `Alt + R`: retomar o roteiro.
- `Alt + S`: silenciar tudo.
- `Alt + I`: abrir ou fechar o Estúdio IA.

Antes de entregar o palco às IAs, o sistema exige confirmação de consentimento, ausência de dados sensíveis e roteamento de áudio.

Os QR Codes usam automaticamente o endereço em que o site estiver publicado. Não é necessário editar URLs ao publicar no GitHub Pages.

## Controles do apresentador

- `→`, `Espaço` ou `Page Down`: avançar.
- `←` ou `Page Up`: voltar.
- `F`: tela cheia.
- `N`: abrir notas do apresentador em uma janela separada.
- Ícone `↗`: fontes, e-book e opção para zerar respostas antes da sessão.

## Antes da sessão

1. Abra a apresentação pelo endereço publicado.
2. Abra “Fontes e materiais” e selecione “Zerar respostas antes da sessão”.
3. Pressione `N` se quiser usar as notas em outra tela.
4. Teste o QR Code com um celular.
5. No último quadro, clique em “Iniciar encerramento” para reproduzir o vídeo com som.
6. Se for usar LIA e ÍCARO, faça o ensaio pelo servidor local, nunca abrindo o HTML diretamente.

## Publicação no GitHub Pages

Publique todo o conteúdo desta pasta sem alterar a estrutura. O e-book e o vídeo precisam permanecer em `assets/`.

As respostas ao vivo usam o projeto Firebase já configurado nos materiais de referência.
