// Данные примеров
const examplesData = {
  // CSS
  'css-basic': {
    title: 'Базовая кнопка на CSS',
    desc: 'Простейшая кнопка с использованием базовых свойств CSS: padding, border-radius, background.',
    html: '<button class="btn-basic">Нажми</button>',
    css: `.btn-basic {
  padding: 10px 20px;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`
  },
  'css-gradient': {
    title: 'Кнопка с градиентом',
    desc: 'Использование линейного градиента для создания современного вида кнопки.',
    html: '<button class="btn-gradient">Нажми</button>',
    css: `.btn-gradient {
  padding: 10px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`
  },
  'css-hover': {
    title: 'Анимация при наведении',
    desc: 'Добавление плавного изменения цвета и масштаба при наведении курсора.',
    html: '<button class="btn-hover">Нажми</button>',
    css: `.btn-hover {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}
.btn-hover:hover {
  background: #218838;
  transform: scale(1.05);
}`
  },

  // JavaScript
  'js-alert': {
    title: 'Кнопка с alert()',
    desc: 'Простейший пример взаимодействия: при клике выводится системное всплывающее окно.',
    html: '<button class="btn-js-alert" id="alertBtn">Показать</button>',
    js: `document.getElementById('alertBtn').addEventListener('click', () => {
  alert('Привет из JavaScript!');
});`
  },
  'js-toggle': {
    title: 'Toggle (переключение стиля)',
    desc: 'При каждом клике кнопка переключает дополнительный CSS-класс, меняя внешний вид.',
    html: '<button class="btn-js-toggle" id="toggleBtn">Переключить</button>',
    js: `document.getElementById('toggleBtn').addEventListener('click', () => {
  document.getElementById('toggleBtn').classList.toggle('highlight');
});`
  },
  'js-counter': {
    title: 'Счётчик кликов',
    desc: 'Кнопка отслеживает количество нажатий и обновляет свой текст.',
    html: '<button class="btn-js-counter" id="counterBtn">Кликни!</button>',
    js: `let count = 0;
const btn = document.getElementById('counterBtn');
btn.addEventListener('click', () => {
  count++;
  btn.textContent = \`Кликов: \${count}\`;
});`
  }
};

const sectionBtns = document.querySelectorAll('.section-btn');
const cssExamples = document.getElementById('css-examples');
const jsExamples = document.getElementById('js-examples');
const detailBox = document.getElementById('detail');

// Переключение разделов
sectionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sectionBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const section = btn.dataset.section;
    cssExamples.classList.toggle('active', section === 'css');
    jsExamples.classList.toggle('active', section === 'js');

    // Сбросить детали на первый пример текущего раздела
    const firstExample = section === 'css' ? 'css-basic' : 'js-alert';
    showExample(firstExample);
  });
});

// Обработка кликов по примерам
document.querySelectorAll('.example-card').forEach(card => {
  card.addEventListener('click', () => {
    const exampleId = card.dataset.example;
    showExample(exampleId);
  });
});

function showExample(id) {
  const ex = examplesData[id];
  if (!ex) return;

  let codeHtml = ex.html;
  let codeCss = ex.css || '';
  let codeJs = ex.js || '';

  // Экранируем HTML/JS для безопасного отображения
  const escapedHtml = escapeHtml(codeHtml);
  const escapedCss = escapeHtml(codeCss);
  const escapedJs = escapeHtml(codeJs);

  // Выводим описание и превью
  detailBox.innerHTML = `
    <h2>${ex.title}</h2>
    <p>${ex.desc}</p>
    <div class="preview-area">${codeHtml}</div>
    <div class="code-block">${escapedHtml}\n\n<style>\n${escapedCss}\n</style>${
      codeJs ? `\n\n<script>\n${escapedJs}\n</script>` : ''
    }</div>
  `;

  // Убираем старые слушатели (если есть)
  removeEventListeners();

  // Добавляем функциональность только для JS-примеров (в preview)
  if (id === 'js-alert') {
    const btn = document.getElementById('alertBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        alert('Привет из JavaScript!');
      });
    }
  } else if (id === 'js-toggle') {
    const btn = document.getElementById('toggleBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('highlight');
      });
    }
  } else if (id === 'js-counter') {
    const btn = document.getElementById('counterBtn');
    if (btn) {
      let count = 0;
      btn.addEventListener('click', () => {
        count++;
        btn.textContent = `Кликов: ${count}`;
      });
    }
  }
}

function removeEventListeners() {
  // Удаляем все event listeners из preview-кнопок
  const previewBtns = document.querySelectorAll('.preview-area button');
  previewBtns.forEach(btn => {
    // Создаём клон кнопки без событий
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Инициализация
showExample('css-basic');
