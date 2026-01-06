document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('edit-toggle');
  const pdfBtn = document.getElementById('save-pdf');
  const clearBtn = document.getElementById('clear-data');
  const exportJsonBtn = document.getElementById('export-json');
  const importJsonBtn = document.getElementById('import-json-btn');
  const importJsonInput = document.getElementById('import-json');
  let editing = false;

  // Carrega dados do localStorage
  loadData();

  // Toggle modo edição
  function toggleEditMode() {
    editing = !editing;
    document.querySelectorAll('.editable').forEach(el => {
      el.contentEditable = editing;
      el.classList.toggle('editing', editing);
    });
    document.querySelectorAll('input[type="range"]').forEach(range => {
      range.disabled = !editing;
    });
    editBtn.textContent = editing ? 'Salvar (ESC)' : 'Editar Currículo (Ctrl+E)';
    editBtn.style.background = editing ? '#dc3545' : '#007bff';

    if (!editing) saveData();
  }

  // Eventos para ativar edição
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault();
      toggleEditMode();
    } else if (e.key === 'Escape' && editing) {
      toggleEditMode();
    }
  });
  editBtn.addEventListener('click', toggleEditMode);

  // Salva dados no localStorage
  function saveData() {
    const data = {};
    document.querySelectorAll('.editable').forEach(el => {
      data[el.id] = el.innerHTML.trim();
    });
    document.querySelectorAll('input[type="range"]').forEach(range => {
      data[range.id] = range.value;
    });
    localStorage.setItem('curriculumData', JSON.stringify(data));
    alert('Alterações salvas localmente!');
  }

  // Carrega dados do localStorage
  function loadData() {
    const saved = localStorage.getItem('curriculumData');
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          if (el.tagName === 'INPUT' && el.type === 'range') {
            el.value = data[id];
          } else {
            el.innerHTML = data[id];
          }
        }
      });
    }
  }

  // Limpar dados com confirmação
  clearBtn.addEventListener('click', () => {
    if (confirm('Você tem certeza que deseja apagar tudo? Isso removerá todas as alterações salvas localmente.')) {
      console.log('Limpar dados confirmado.');
      localStorage.removeItem('curriculumData');
      location.reload(); // Recarrega a página para resetar
    } else {
      console.log('Limpar dados cancelado.');
    }
  });

  // Exportar PDF
  pdfBtn.addEventListener('click', () => {
    pdfBtn.disabled = true;
    pdfBtn.textContent = 'Gerando PDF...';

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      html2pdf(document.body, {
        margin: 10,
        filename: 'curriculum_gurjao.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).then(() => {
        pdfBtn.disabled = false;
        pdfBtn.textContent = 'Exportar PDF';
      });
    };
    document.head.appendChild(script);
  });

  // Exportar JSON
  exportJsonBtn.addEventListener('click', () => {
    const curriculum = {
      Nome: document.getElementById('nome').querySelector('span').innerHTML.trim(),
      Cargo: document.getElementById('cargo').querySelector('span').innerHTML.trim(),
      Sobre: document.getElementById('sobre').innerHTML.trim(),
      Contato: {
        phone: document.getElementById('contatoCel').innerHTML.trim(),
        email: document.getElementById('contatoEmail').innerHTML.trim(),
        location: document.getElementById('contatoCidade').innerHTML.trim(),
        linkedin: document.getElementById('contatoPerfilLinkedin').innerHTML.trim(),
        skype: document.getElementById('contatoPerfilSkype').innerHTML.trim()
      },
      Experiencias: [],
      Formacao: [],
      Cursos: {
        inst: document.getElementById('cursoInstituicao').innerHTML.trim(),
        itens: []
      },
      Habilidades: [],
      Idiomas: {
        idioma1: document.getElementById('idioma1').innerHTML.trim(),
        idioma2: document.getElementById('idioma2').innerHTML.trim()
      },
      Personalidade: [],
      Agradecimento: document.getElementById('agradecimento').innerHTML.trim(),
      Autor: document.getElementById('autor').innerHTML.trim()
    };

    // Experiencias (3 itens: 3,2,1)
    for (let i = 3; i >= 1; i--) {
      curriculum.Experiencias.push({
        empresa: document.getElementById(`experienciaEmpresa${i}`).innerHTML.trim(),
        periodo: document.getElementById(`experienciaPeriodo${i}`).innerHTML.trim(),
        cargo: document.getElementById(`experienciaCargo${i}`).innerHTML.trim(),
        desc: document.getElementById(`experienciaResumo${i}`).innerHTML.trim()
      });
    }

    // Formacao (2 itens: 2,1)
    for (let i = 2; i >= 1; i--) {
      curriculum.Formacao.push({
        curso: document.getElementById(`formacaoCurso${i}`).innerHTML.trim(),
        periodo: document.getElementById(`formacaoPeriodo${i}`).innerHTML.trim(),
        inst: document.getElementById(`formacaoInstituicao${i}`).innerHTML.trim()
      });
    }

    // Cursos.itens (4 itens: 4,3,2,1)
    for (let i = 4; i >= 1; i--) {
      curriculum.Cursos.itens.push(document.getElementById(`cursoNome${i}`).innerHTML.trim());
    }

    // Habilidades (12 itens: 1 a 12)
    for (let i = 1; i <= 12; i++) {
      curriculum.Habilidades.push({
        nome: document.getElementById(`habilidade${i}`).innerHTML.trim(),
        level: document.getElementById(`habilidadeValue${i}`).value
      });
    }

    // Personalidade (5 itens: 1 a 5)
    for (let i = 1; i <= 5; i++) {
      curriculum.Personalidade.push(document.getElementById(`personalidade${i}`).innerHTML.trim());
    }

    const blob = new Blob([JSON.stringify(curriculum, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curriculum.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Importar JSON com validação
  importJsonBtn.addEventListener('click', () => {
    importJsonInput.click();
  });

  importJsonInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);

          // Validação do JSON
          if (!validateJson(data)) {
            alert('JSON inválido! Verifique se segue o modelo correto.');
            return;
          }

          // Aplica ao DOM
          document.getElementById('nome').querySelector('span').innerHTML = data.Nome;
          document.getElementById('cargo').querySelector('span').innerHTML = data.Cargo;
          document.getElementById('sobre').innerHTML = data.Sobre;
          document.getElementById('contatoCel').innerHTML = data.Contato.phone;
          document.getElementById('contatoEmail').innerHTML = data.Contato.email;
          document.getElementById('contatoCidade').innerHTML = data.Contato.location;
          document.getElementById('contatoPerfilLinkedin').innerHTML = data.Contato.linkedin;
          document.getElementById('contatoPerfilSkype').innerHTML = data.Contato.skype;

          // Experiencias (3 itens: 0->3, 1->2, 2->1)
          for (let i = 0; i < data.Experiencias.length; i++) {
            const htmlIndex = 3 - i;
            document.getElementById(`experienciaEmpresa${htmlIndex}`).innerHTML = data.Experiencias[i].empresa;
            document.getElementById(`experienciaPeriodo${htmlIndex}`).innerHTML = data.Experiencias[i].periodo;
            document.getElementById(`experienciaCargo${htmlIndex}`).innerHTML = data.Experiencias[i].cargo;
            document.getElementById(`experienciaResumo${htmlIndex}`).innerHTML = data.Experiencias[i].desc;
          }

          // Formacao (2 itens: 0->2, 1->1)
          for (let i = 0; i < data.Formacao.length; i++) {
            const htmlIndex = 2 - i;
            document.getElementById(`formacaoCurso${htmlIndex}`).innerHTML = data.Formacao[i].curso;
            document.getElementById(`formacaoPeriodo${htmlIndex}`).innerHTML = data.Formacao[i].periodo;
            document.getElementById(`formacaoInstituicao${htmlIndex}`).innerHTML = data.Formacao[i].inst;
          }

          // Cursos
          document.getElementById('cursoInstituicao').innerHTML = data.Cursos.inst;
          // itens (4 itens: 0->4, 1->3, 2->2, 3->1)
          for (let i = 0; i < data.Cursos.itens.length; i++) {
            const htmlIndex = 4 - i;
            document.getElementById(`cursoNome${htmlIndex}`).innerHTML = data.Cursos.itens[i];
          }

          // Habilidades (12 itens: 0->1, 1->2, ..., 11->12)
          for (let i = 0; i < data.Habilidades.length; i++) {
            const htmlIndex = i + 1;
            document.getElementById(`habilidade${htmlIndex}`).innerHTML = data.Habilidades[i].nome;
            document.getElementById(`habilidadeValue${htmlIndex}`).value = data.Habilidades[i].level;
          }

          // Idiomas
          document.getElementById('idioma1').innerHTML = data.Idiomas.idioma1;
          document.getElementById('idioma2').innerHTML = data.Idiomas.idioma2;

          // Personalidade (5 itens: 0->1, 1->2, ..., 4->5)
          for (let i = 0; i < data.Personalidade.length; i++) {
            const htmlIndex = i + 1;
            document.getElementById(`personalidade${htmlIndex}`).innerHTML = data.Personalidade[i];
          }

          // Agradecimento e Autor
          document.getElementById('agradecimento').innerHTML = data.Agradecimento;
          document.getElementById('autor').innerHTML = data.Autor;

          // Salva no localStorage e alerta
          saveData();
          alert('JSON importado com sucesso!');
        } catch (err) {
          alert('Erro ao ler o JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    }
  });

  // Função de validação do JSON
  function validateJson(data) {
    // Verifica chaves principais
    if (!data || typeof data !== 'object') return false;
    if (!data.Nome || !data.Cargo || !data.Sobre) return false;

    // Contato
    if (!data.Contato || typeof data.Contato !== 'object') return false;
    if (!data.Contato.phone || !data.Contato.email || !data.Contato.location || !data.Contato.linkedin || !data.Contato.skype) return false;

    // Experiencias (array de 3 objetos)
    if (!Array.isArray(data.Experiencias) || data.Experiencias.length !== 3) return false;
    for (let exp of data.Experiencias) {
      if (!exp.empresa || !exp.periodo || !exp.cargo || !exp.desc) return false;
    }

    // Formacao (array de 2 objetos)
    if (!Array.isArray(data.Formacao) || data.Formacao.length !== 2) return false;
    for (let form of data.Formacao) {
      if (!form.curso || !form.periodo || !form.inst) return false;
    }

    // Cursos (objeto com inst e itens array de 4)
    if (!data.Cursos || typeof data.Cursos !== 'object' || !data.Cursos.inst || !Array.isArray(data.Cursos.itens) || data.Cursos.itens.length !== 4) return false;

    // Habilidades (array de 12 objetos)
    if (!Array.isArray(data.Habilidades) || data.Habilidades.length !== 12) return false;
    for (let hab of data.Habilidades) {
      if (!hab.nome || !hab.level) return false;
    }

    // Idiomas (objeto com 2 chaves)
    if (!data.Idiomas || typeof data.Idiomas !== 'object' || !data.Idiomas.idioma1 || !data.Idiomas.idioma2) return false;

    // Personalidade (array de 5 strings)
    if (!Array.isArray(data.Personalidade) || data.Personalidade.length !== 5) return false;

    // Agradecimento e Autor
    if (!data.Agradecimento || !data.Autor) return false;

    return true;
  }
});