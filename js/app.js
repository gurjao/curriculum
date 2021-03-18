/* Arquivo JS para customizar o projeto */

/* Chamando arquivo JSON */
fetch('https://raw.githubusercontent.com/gurjao/curriculum/master/info.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    /* Dados pessoais */
    document.querySelector('#nome').innerHTML = json.nome;
    document.querySelector('#cargo').innerHTML = json.cargo;
    document.querySelector('#sobre').innerHTML = json.sobre;
    document.querySelector('#contatoEmail').innerHTML = json.contato.email;
    document.querySelector('#contatoCel').innerHTML = json.contato.cel;
    document.querySelector('#contatoCidade').innerHTML = json.contato.cidade;
    document.querySelector('#contatoPerfilLinkedin').innerHTML = json.contato.perfil.linkedin;
    document.querySelector('#contatoPerfilSkype').innerHTML = json.contato.perfil.skype;

    /* Experiência profissional */
    document.querySelector('#experienciaEmpresa3').innerHTML = json.experiencia[0].empresa;
    document.querySelector('#experienciaPeriodo3').innerHTML = json.experiencia[0].periodo;
    document.querySelector('#experienciaCargo3').innerHTML = json.experiencia[0].cargo;
    document.querySelector('#experienciaResumo3').innerHTML = json.experiencia[0].resumo;
    document.querySelector('#experienciaEmpresa2').innerHTML = json.experiencia[1].empresa;
    document.querySelector('#experienciaPeriodo2').innerHTML = json.experiencia[1].periodo;
    document.querySelector('#experienciaCargo2').innerHTML = json.experiencia[1].cargo;
    document.querySelector('#experienciaResumo2').innerHTML = json.experiencia[1].resumo;
    document.querySelector('#experienciaEmpresa1').innerHTML = json.experiencia[2].empresa;
    document.querySelector('#experienciaPeriodo1').innerHTML = json.experiencia[2].periodo;
    document.querySelector('#experienciaCargo1').innerHTML = json.experiencia[2].cargo;
    document.querySelector('#experienciaResumo1').innerHTML = json.experiencia[2].resumo;

    /* Formação */
    document.querySelector('#formacaoCurso2').innerHTML = json.formacao[0].graduacao;
    document.querySelector('#formacaoPeriodo2').innerHTML = json.formacao[0].periodo;
    document.querySelector('#formacaoInstituicao2').innerHTML = json.formacao[0].instituicao;
    document.querySelector('#formacaoCurso1').innerHTML = json.formacao[1].graduacao;
    document.querySelector('#formacaoPeriodo1').innerHTML = json.formacao[1].periodo;
    document.querySelector('#formacaoInstituicao1').innerHTML = json.formacao[1].instituicao;
    
    /* Curso */
    document.querySelector('#cursoInstituicao').innerHTML = json.curso[0].instituicao;
    document.querySelector('#cursoNome4').innerHTML = json.curso[0].nome[0];
    document.querySelector('#cursoNome3').innerHTML = json.curso[0].nome[1];
    document.querySelector('#cursoNome2').innerHTML = json.curso[0].nome[2];
    document.querySelector('#cursoNome1').innerHTML = json.curso[0].nome[3];
    
    /* Habilidade */
    document.querySelector('#habilidade1').innerHTML = json.habilidade[0].nome;
    document.querySelector('#habilidade2').innerHTML = json.habilidade[1].nome;
    document.querySelector('#habilidade3').innerHTML = json.habilidade[2].nome;
    document.querySelector('#habilidade4').innerHTML = json.habilidade[3].nome;
    document.querySelector('#habilidade5').innerHTML = json.habilidade[4].nome;
    document.querySelector('#habilidade6').innerHTML = json.habilidade[5].nome;
    document.querySelector('#habilidade7').innerHTML = json.habilidade[6].nome;
    document.querySelector('#habilidade8').innerHTML = json.habilidade[7].nome;
    document.querySelector('#habilidade9').innerHTML = json.habilidade[8].nome;
    document.querySelector('#habilidade10').innerHTML = json.habilidade[9].nome;
    document.querySelector('#habilidade11').innerHTML = json.habilidade[10].nome;
    document.querySelector('#habilidade12').innerHTML = json.habilidade[11].nome;
    
    /* Idioma */
    document.querySelector('#idioma1').innerHTML = json.idioma[0].nome;
    document.querySelector('#idioma2').innerHTML = json.idioma[1].nome;
    
    /* Personalidade */
    document.querySelector('#personalidade1').innerHTML = json.personalidade[4];
    document.querySelector('#personalidade2').innerHTML = json.personalidade[3];
    document.querySelector('#personalidade3').innerHTML = json.personalidade[2];
    document.querySelector('#personalidade4').innerHTML = json.personalidade[1];
    document.querySelector('#personalidade5').innerHTML = json.personalidade[0];
    
    /* Agradecimento */
    document.querySelector('#agradecimento').innerHTML = json.agradecimento;
    document.querySelector('#autor').innerHTML = json.autor;
})

/*
document.body.onload = adcElemento;
function adcElemento () {
  // cria um novo elemento div
  // e dá à ele conteúdo
  var divNova = document.createElement("div");
  var conteudoNovo = document.createTextNode("Olá, cumprimentos!");
  divNova.appendChild(conteudoNovo); //adiciona o nó de texto à nova div criada

  // adiciona o novo elemento criado e seu conteúdo ao DOM
  var divAtual = document.getElementById("experienciaEmpresa");
  document.body.insertBefore(divNova, divAtual);
}
*/