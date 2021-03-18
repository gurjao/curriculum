/* Arquivo JS para customizar o projeto */

/* Chamando arquivo JSON */
fetch('https://raw.githubusercontent.com/gurjao/curriculum/master/info.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    document.querySelector('#nome').innerHTML = json.nome;
    document.querySelector('#cargo').innerHTML = json.cargo;
    document.querySelector('#sobre').innerHTML = json.sobre;
  })
