# 📦 Rastreio Correios Brasil

[![Build Status](https://img.shields.io/github/workflow/status/orkestral/venom/build.svg)](https://github.com/orkestral/venom/actions)
[![Lint Status](https://img.shields.io/github/workflow/status/orkestral/venom/lint.svg?label=lint)](https://github.com/orkestral/venom/actions)
[![release-it](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-release--it-e10079.svg)](https://github.com/release-it/release-it)

> Rastreio correios é uma biblioteca que permite rastrear encomendas dos correios do Brasil

## Conteúdo
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalando)
- [Como utilizar](#como-utilizar)
- [Retorno dos dados](#retorno-dos-dados)
- [Validação](#validacao)
- [Autor](#autor)

## Funcionalidades
- Múltiplos serviços de rastreio (Consumimos 2 APIs)
- Foco em performece (Buscamos a API que retorna mais rápido)
- Padronização dos retornos das APIs
- Possibilidade de rastrear mais de 1 encomenda

## Instalando

```bash
npm i rastreio-correios
```

## Como utilizar
```js
const { rastrear } = require('rastreio-correios');

async myFn(){
  try{
    const result = await rastrear(['XX000000000BR', 'YY000000000BR']);

    // Também é possível passar uma string
    // await rastrear('XX000000000BR');

    console.log(result);
  } catch(error){
    console.log(error);
  }
}

myFn();
```

### Utilizando o ES6

```js
import { rastrear } from 'rastreio-correios';
...
```

## Retorno dos dados

Os dados são sempre retornados em array (mesmo que seja passado apenas 1 código de rastreio);

```js
RastreioResult {
  sucesso: boolean; // sucesso no rastreio
  rastreio: string; // código de rastreio
  responseTime: number; // tempo de resposta em ms
  mensagem?: string; // se houver erro, aqui estará a mensagem
  entregue?: boolean; // se o objeto foi entregue
  // array de eventos do rastreio
  type?: string; // tipo do pacote, por exemplo: PAC, SEDEX, etc.
  eventos?: {
    status: string; // status do evento
    data: string; // data do evento
    hora: string; // hora do evento
    origem?: string; // origem do evento (se existir)
    destino?: string; // destino do evento (se existir)
    local?: string; // local do evento (se existir)
  }[];
}
```

## Validação

A lib possui um validador do formato do código de rastreio, quando o código informado não está de acordo com o padrão dos correios é retornado uma mansagem de erro:

```js
const { rastrear } = require('rastreio-correios');

async myFn(){
  try{
    const result = await rastrear('XXA00000000BR');
    console.log(result);
    // {
    //   sucesso: false,
    //   rastreio: 'XXA00000000BR',
    //   mensagem: 'Código de rastreio inválido',
    //   responseTime: 0
    // }
  } catch(error){
    console.log(error);
  }
}

myFn();
```

## Autor


| [<img src="https://avatars.githubusercontent.com/u/2446069?v=3&s=115"><br><sub>@fernandonetom</sub>](https://github.com/mMoysesPimenta) |
| :---: |