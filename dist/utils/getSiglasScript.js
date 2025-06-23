var siglas = {};
document.querySelectorAll('#content-wrapper > div > table.conteudo-tabela > tbody > tr').forEach(function (item) {
    var tds = item.querySelectorAll('td');
    var sigla = tds[0].textContent.trim() || tds[0].innerText.trim();
    var descri = tds[1].textContent.trim() || tds[1].innerText.trim();
    siglas[sigla] = descri;
});
JSON.stringify(siglas);
//# sourceMappingURL=getSiglasScript.js.map