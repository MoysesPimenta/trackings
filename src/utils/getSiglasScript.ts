const siglas = {};

document.querySelectorAll('#content-wrapper > div > table.conteudo-tabela > tbody > tr').forEach((item) => {
  const tds = item.querySelectorAll('td');
  const sigla = tds[0].textContent.trim() || tds[0].innerText.trim();
  const descri = tds[1].textContent.trim() || tds[1].innerText.trim();

  siglas[sigla] = descri;
});

JSON.stringify(siglas);
