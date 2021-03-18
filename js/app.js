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
    document.querySelector('#contatoEmail').innerHTML = json.contato.email;
    document.querySelector('#contatoCel').innerHTML = json.contato.cel;
    document.querySelector('#contatoCidade').innerHTML = json.contato.cidade;
    document.querySelector('#contatoPerfilLinkedin').innerHTML = json.contato.perfil.linkedin;
    document.querySelector('#contatoPerfilSkype').innerHTML = json.contato.email;
  })
