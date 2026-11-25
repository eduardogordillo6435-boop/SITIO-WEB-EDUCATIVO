import React, { useMemo, useState } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  Search,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Mail,
  Heart,
  RotateCcw,
  CheckCircle2,
  Send,
  Target,
  FolderKanban,
  Cpu,
  FileArchive,
  FileCheck2,
  Download,
  Code2,
  Layers,
  Check
} from 'lucide-react';
import { subjects, resources, quizzes } from './data/content';

const projectMenuItems = [
  { id: 'actividades', label: 'Actividades realizadas en el curso', icon: FolderKanban },
  { id: 'sistema', label: 'Sistema implementado', icon: Cpu },
  { id: 'codigo', label: 'Código fuente (comprimido)', icon: FileArchive },
  { id: 'reporte', label: 'Reporte de las modificaciones realizadas', icon: FileCheck2 }
];

const courseActivities = [
  {
    fase: 'Actividad 1 · Planeación y Diseño',
    titulo: 'Definición de arquitectura educativa y prototipo UI',
    descripcion: 'Identificación de necesidades de estudiantes de secundaria y bachillerato, selección de paleta cromática accesible y estructuración de navegación por materias.',
    estado: 'Completada'
  },
  {
    fase: 'Actividad 2 · Desarrollo del Catálogo',
    titulo: 'Implementación de Materias y Biblioteca de Recursos',
    descripcion: 'Creación del módulo de filtrado dinámico por asignatura, buscador en tiempo real y vista modal para lectura de guías y resúmenes.',
    estado: 'Completada'
  },
  {
    fase: 'Actividad 3 · Evaluación Interactiva',
    titulo: 'Construcción del motor de Cuestionarios (Quiz)',
    descripcion: 'Desarrollo de evaluación por materia con barra de progreso, cálculo automático de puntaje y retroalimentación explicativa por reactivo.',
    estado: 'Completada'
  },
  {
    fase: 'Actividad 4 · Integración y Documentación',
    titulo: 'Menú de entregables y reporte técnico',
    descripcion: 'Incorporación del menú desplegable de evidencias del curso, documentación del sistema implementado y empaquetado del código fuente.',
    estado: 'Completada'
  }
];

const modificationsReport = [
  {
    id: 'MOD-01',
    componente: 'Barra de navegación (App.jsx / styles.css)',
    cambio: 'Se agregó un menú desplegable interactivo ("Proyecto") con soporte tanto para escritorio como para dispositivos móviles.',
    impacto: 'Permite acceder en un clic a las 4 secciones de entrega del curso sin saturar la barra principal.'
  },
  {
    id: 'MOD-02',
    componente: 'Vistas de Entregables del Curso (App.jsx)',
    cambio: 'Se crearon cuatro nuevas vistas dedicadas: Actividades del curso, Sistema implementado, Código fuente (comprimido) y Reporte de modificaciones.',
    impacto: 'Centraliza toda la documentación académica y técnica dentro de la misma aplicación SPA.'
  },
  {
    id: 'MOD-03',
    componente: 'Descarga de Código Fuente (App.jsx)',
    cambio: 'Se añadió una tarjeta de descarga directa para el paquete comprimido (SITIO WEB EDUCATIVO.zip) junto con el árbol de archivos del proyecto.',
    impacto: 'Facilita la revisión y evaluación del código fuente por parte del docente o revisor.'
  },
  {
    id: 'MOD-04',
    componente: 'Limpieza de dependencias (main.jsx)',
    cambio: 'Se eliminó la importación huérfana de "src/data/ManuEntrega.jsx" para evitar errores de compilación en Vite/React.',
    impacto: 'Garantiza que el proyecto compile limpiamente sin rutas rotas.'
  }
];

export default function App() {
  const [page, setPage] = useState('inicio');
  const [activeSubject, setActiveSubject] = useState('todas');
  const [search, setSearch] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const [quizSubject, setQuizSubject] = useState('matematicas');
  const [answers, setAnswers] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  const filteredResources = useMemo(
    () =>
      resources.filter(
        r =>
          (activeSubject === 'todas' || r.subject === activeSubject) &&
          `${r.title} ${r.summary}`.toLowerCase().includes(search.toLowerCase())
      ),
    [activeSubject, search]
  );

  const go = next => {
    setPage(next);
    setMobileMenu(false);
    setProjectDropdown(false);
    setSelectedResource(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuiz = id => {
    setQuizSubject(id);
    setAnswers({});
    setQuizDone(false);
    go('quiz');
  };

  const handleDownloadZip = () => {
  
    const manifestContent = `PROYECTO: Aprende Fácil - Sitio Web Educativo
ARCHIVO: aprende-facil.zip
ESTRUCTURA DEL PROYECTO:
- aprende-facil/index.html
- aprende-facil/package.json
- aprende-facil/README.md
- aprende-facil/src/main.jsx
- aprende-facil/src/App.jsx
- aprende-facil/src/styles.css
- aprende-facil/src/data/content.js


`;
    const blob = new Blob([manifestContent], { type: 'application/zip' });
    const url = "./aprende-facil.zip";
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aprende-facil.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  const score = quizzes[quizSubject].filter((q, i) => answers[i] === q.answer).length;
  const nav = [
    ['inicio', 'Inicio'],
    ['materias', 'Materias'],
    ['recursos', 'Recursos'],
    ['nosotros', 'Nosotros'],
    ['contacto', 'Contacto']
  ];

  const isProjectPage = projectMenuItems.some(item => item.id === page);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => go('inicio')}>
            <span className="brand-icon">
              <GraduationCap size={24} />
            </span>
            <span>
              Aprende<span className="brand-accent">Fácil</span>
              <small>APRENDE · PRACTICA · AVANZA</small>
            </span>
          </button>

          <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
            {nav.map(([id, label]) => (
              <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}>
                {label}
              </button>
            ))}

            {}
            <div
              className="dropdown-wrapper"
              onMouseEnter={() => setProjectDropdown(true)}
              onMouseLeave={() => setProjectDropdown(false)}
            >
              <button
                type="button"
                className={`dropdown-trigger ${isProjectPage ? 'active' : ''}`}
                onClick={() => setProjectDropdown(!projectDropdown)}
                aria-expanded={projectDropdown}
              >
                Proyecto <ChevronDown size={15} className={projectDropdown ? 'rotated' : ''} />
              </button>

              {projectDropdown && (
                <div className="dropdown-menu">
                  {projectMenuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={page === item.id ? 'dropdown-item active' : 'dropdown-item'}
                        onClick={() => go(item.id)}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button className="nav-quiz" onClick={() => openQuiz('matematicas')}>
              Practicar quiz <ArrowRight size={15} />
            </button>
          </nav>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Abrir menú"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {page === 'inicio' && (
        <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-copy">
                <span className="eyebrow">
                  <span className="eyebrow-dot" /> TU ESPACIO PARA APRENDER
                </span>
                <h1>
                  Aprender puede ser <em>más fácil.</em>
                </h1>
                <p>
                  Encuentra materiales de estudio, repasa tus materias y pon a prueba lo que sabes
                  con cuestionarios rápidos.
                </p>
                <div className="hero-actions">
                  <button className="btn-primary" onClick={() => go('materias')}>
                    Explorar materias <ArrowRight size={17} />
                  </button>
                  <button className="btn-light" onClick={() => openQuiz('matematicas')}>
                    Hacer un quiz <Target size={17} />
                  </button>
                </div>
                <div className="hero-proof">
                  <div className="avatar-stack">
                    <span>📘</span>
                    <span>✏️</span>
                    <span>💡</span>
                  </div>
                  <span>Aprende a tu ritmo, paso a paso.</span>
                </div>
              </div>
              <div className="hero-art">
                <div className="art-orbit orbit-one" />
                <div className="art-orbit orbit-two" />
                <div className="study-card card-main">
                  <div className="card-top">
                    <span className="live-dot" /> MI ESPACIO DE ESTUDIO
                  </div>
                  <div className="book-illustration">📚</div>
                  <h3>¡Vas por buen camino!</h3>
                  <p>Un pequeño avance cada día hace la diferencia.</p>
                  <div className="progress-label">
                    <span>Tu progreso</span>
                    <b>75%</b>
                  </div>
                  <div className="progress-track">
                    <span />
                  </div>
                </div>
                <div className="floating-note note-yellow">✦ ¡Tú puedes!</div>
                <div className="floating-note note-blue">✓ Sigue practicando</div>
                <div className="sparkle sparkle-a">✳</div>
                <div className="sparkle sparkle-b">✦</div>
              </div>
            </div>
          </section>

          <section className="stats-strip">
            <div>
              <strong>4</strong>
              <span>Materias para explorar</span>
            </div>
            <div>
              <strong>8+</strong>
              <span>Recursos de estudio</span>
            </div>
            <div>
              <strong>20</strong>
              <span>Preguntas para practicar</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>A tu propio ritmo</span>
            </div>
          </section>

          <section className="section container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">EMPIEZA POR AQUÍ</span>
                <h2>¿Qué quieres aprender hoy?</h2>
                <p>Elige una materia y encuentra contenido para seguir aprendiendo.</p>
              </div>
              <button className="text-link" onClick={() => go('materias')}>
                Ver todas las materias <ArrowRight size={16} />
              </button>
            </div>
            <SubjectGrid
              onSelect={id => {
                setActiveSubject(id);
                go('recursos');
              }}
            />
          </section>

          <section className="practice-banner container">
            <div className="practice-icon">
              <Target size={30} />
            </div>
            <div>
              <span className="eyebrow">PON A PRUEBA LO QUE SABES</span>
              <h2>Aprender también es practicar.</h2>
              <p>Responde preguntas cortas y descubre cuánto has aprendido.</p>
            </div>
            <button className="btn-primary" onClick={() => openQuiz('matematicas')}>
              Comenzar un quiz <ArrowRight size={17} />
            </button>
          </section>

          <section className="section container resource-preview">
            <div className="section-heading">
              <div>
                <span className="eyebrow">PARA SEGUIR AVANZANDO</span>
                <h2>Recursos recomendados</h2>
                <p>Lecturas y guías sencillas para reforzar tus conocimientos.</p>
              </div>
              <button className="text-link" onClick={() => go('recursos')}>
                Ver recursos <ArrowRight size={16} />
              </button>
            </div>
            <ResourceGrid items={resources.slice(0, 3)} onOpen={setSelectedResource} />
          </section>
        </>
      )}

      {page === 'materias' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="EXPLORA Y DESCUBRE"
            title="Nuestras materias"
            text="Selecciona la materia que quieres repasar. Cada una tiene recursos y un cuestionario para practicar."
          />
          <SubjectGrid
            onSelect={id => {
              setActiveSubject(id);
              go('recursos');
            }}
            large
          />
          <div className="quiz-subjects">
            <h2>¿Prefieres practicar?</h2>
            <p>Elige una materia para comenzar un cuestionario.</p>
            <div className="quiz-pills">
              {subjects.map(s => (
                <button key={s.id} onClick={() => openQuiz(s.id)}>
                  {s.icon} Quiz de {s.name}
                </button>
              ))}
            </div>
          </div>
        </main>
      )}

      {page === 'recursos' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="BIBLIOTECA DE APRENDIZAJE"
            title="Recursos educativos"
            text="Consulta guías, resúmenes y lecturas para reforzar lo que ves en clase."
          />
          <div className="resource-tools">
            <div className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar un tema o recurso..."
              />
            </div>
            <div className="filter-row">
              <button
                className={activeSubject === 'todas' ? 'filter-active' : ''}
                onClick={() => setActiveSubject('todas')}
              >
                Todas
              </button>
              {subjects.map(s => (
                <button
                  key={s.id}
                  className={activeSubject === s.id ? 'filter-active' : ''}
                  onClick={() => setActiveSubject(s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <ResourceGrid items={filteredResources} onOpen={setSelectedResource} />
          {filteredResources.length === 0 && (
            <div className="empty-state">
              No encontramos recursos con esa búsqueda. Prueba con otra palabra.
            </div>
          )}
        </main>
      )}

      {page === 'quiz' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="APRENDE PRACTICANDO"
            title="Cuestionario rápido"
            text="Responde las preguntas y al final podrás revisar tu resultado."
          />
          <div className="quiz-layout">
            <aside className="quiz-sidebar">
              <h3>Elige una materia</h3>
              {subjects.map(s => (
                <button
                  key={s.id}
                  className={quizSubject === s.id ? 'selected' : ''}
                  onClick={() => {
                    setQuizSubject(s.id);
                    setAnswers({});
                    setQuizDone(false);
                  }}
                >
                  <span>{s.icon}</span>
                  {s.name}
                  <ChevronRight size={16} />
                </button>
              ))}
              <div className="quiz-tip">
                💡 <b>Un consejo</b>
                <br />
                Lee con calma cada pregunta. ¡Lo importante es aprender!
              </div>
            </aside>
            <section className="quiz-panel">
              <div className="quiz-panel-top">
                <span className="eyebrow">
                  {subjects.find(s => s.id === quizSubject).name.toUpperCase()}
                </span>
                <span className="question-count">{Object.keys(answers).length} de 5 respondidas</span>
              </div>
              <div className="quiz-progress">
                <span style={{ width: `${(Object.keys(answers).length / 5) * 100}%` }} />
              </div>
              {!quizDone ? (
                <>
                  {quizzes[quizSubject].map((q, i) => (
                    <div className="question" key={`${quizSubject}-${i}`}>
                      <h3>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        {q.q}
                      </h3>
                      <div className="answer-options">
                        {q.options.map((o, j) => (
                          <button
                            key={j}
                            className={answers[i] === j ? 'chosen' : ''}
                            onClick={() => setAnswers(a => ({ ...a, [i]: j }))}
                          >
                            <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                            {o}
                            {answers[i] === j && <CheckCircle2 size={17} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    className="btn-primary submit-quiz"
                    disabled={Object.keys(answers).length !== 5}
                    onClick={() => setQuizDone(true)}
                  >
                    Ver mi resultado <ArrowRight size={17} />
                  </button>
                </>
              ) : (
                <div className="quiz-result">
                  <div className="result-icon">{score >= 4 ? '🏆' : score >= 3 ? '🌟' : '💪'}</div>
                  <span className="eyebrow">RESULTADO FINAL</span>
                  <h2>{score} de 5 respuestas correctas</h2>
                  <p>
                    {score >= 4
                      ? '¡Excelente trabajo! Dominas muy bien estos temas.'
                      : score >= 3
                        ? '¡Vas muy bien! Sigue repasando para mejorar.'
                        : '¡No te desanimes! Repasar también es parte de aprender.'}
                  </p>
                  <div className="answer-review">
                    {quizzes[quizSubject].map((q, i) => (
                      <div key={i}>
                        <b>
                          {i + 1}. {q.q}
                        </b>
                        <span className={answers[i] === q.answer ? 'correct' : 'incorrect'}>
                          {answers[i] === q.answer
                            ? '✓ Correcto'
                            : '✕ Respuesta correcta: ' + q.options[q.answer]}
                        </span>
                        <small>{q.explain}</small>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setAnswers({});
                      setQuizDone(false);
                    }}
                  >
                    <RotateCcw size={17} /> Intentar de nuevo
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      )}

      {page === 'nosotros' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="CONÓCENOS"
            title="Aprender, practicar y avanzar."
            text="Aprende Fácil es un sitio educativo pensado para acompañar a estudiantes de secundaria y bachillerato en su aprendizaje."
          />
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-emoji">🎓</div>
              <div className="about-sticker">Aprende a tu ritmo ✨</div>
            </div>
            <div className="about-copy">
              <span className="eyebrow">NUESTRO PROPÓSITO</span>
              <h2>Hacer que estudiar sea más sencillo.</h2>
              <p>
                Queremos reunir en un solo lugar materiales de estudio y actividades prácticas que
                ayuden a reforzar los temas vistos en clase.
              </p>
              <div className="value-row">
                <span>📖</span>
                <div>
                  <b>Contenido claro</b>
                  <small>Recursos breves y fáciles de consultar.</small>
                </div>
              </div>
              <div className="value-row">
                <span>🧠</span>
                <div>
                  <b>Aprendizaje activo</b>
                  <small>Cuestionarios para practicar y repasar.</small>
                </div>
              </div>
              <div className="value-row">
                <span>🌱</span>
                <div>
                  <b>Avanza a tu ritmo</b>
                  <small>Aprende paso a paso, sin presiones.</small>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === 'contacto' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="ESTAMOS PARA AYUDARTE"
            title="Ponte en contacto"
            text="¿Tienes alguna sugerencia o comentario? Nos gustaría conocer tu opinión."
          />
          <div className="contact-layout">
            <div className="contact-info">
              <div className="contact-icon">
                <Mail size={27} />
              </div>
              <h2>Tu opinión nos ayuda a mejorar.</h2>
              <p>
                Comparte tus ideas para que Aprende Fácil siga siendo un espacio útil para
                estudiantes.
              </p>
              <div className="contact-detail">
                <Mail size={18} />
                <span>Formulario de comentarios</span>
              </div>
              <div className="contact-detail">
                <Heart size={18} />
                <span>Gracias por ser parte de la comunidad</span>
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={e => {
                e.preventDefault();
                setContactSent(true);
              }}
            >
              {contactSent ? (
                <div className="success-message">
                  <CheckCircle2 size={38} />
                  <h2>¡Gracias por escribirnos!</h2>
                  <p>Tu mensaje quedó registrado en esta demostración.</p>
                  <button
                    type="button"
                    className="btn-light"
                    onClick={() => setContactSent(false)}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <label>
                    Nombre
                    <input required placeholder="Escribe tu nombre" />
                  </label>
                  <label>
                    Correo electrónico
                    <input type="email" required placeholder="tunombre@correo.com" />
                  </label>
                  <label>
                    Mensaje
                    <textarea required rows="5" placeholder="Cuéntanos qué piensas..." />
                  </label>
                  <button className="btn-primary" type="submit">
                    Enviar mensaje <Send size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </main>
      )}

      {/* ==================== SECCIÓN 1: ACTIVIDADES REALIZADAS EN EL CURSO ==================== */}
      {page === 'actividades' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="PORTAFOLIO DE EVIDENCIAS"
            title="Actividades realizadas en el curso"
            text="Cronología de las etapas desarrolladas durante el curso para construir la plataforma educativa Aprende Fácil."
          />
          <div className="project-grid">
            {courseActivities.map((act, idx) => (
              <article className="project-card" key={idx}>
                <div className="project-card-top">
                  <span className="eyebrow">{act.fase}</span>
                  <span className="status-badge">
                    <Check size={13} /> {act.estado}
                  </span>
                </div>
                <h3>{act.titulo}</h3>
                <p>{act.descripcion}</p>
              </article>
            ))}
          </div>
        </main>
      )}

      {/* ==================== SECCIÓN 2: SISTEMA IMPLEMENTADO ==================== */}
      {page === 'sistema' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="ARQUITECTURA Y FUNCIONALIDAD"
            title="Sistema implementado"
            text="Descripción técnica y funcional de los módulos que integran la aplicación web educativa."
          />
          <div className="system-overview">
            <div className="system-card">
              <div className="subject-icon blue">
                <Layers size={22} color="#2457d6" />
              </div>
              <h3>Arquitectura Frontend (SPA)</h3>
              <p>
                Desarrollado con <b>React</b> y <b>Vite</b> utilizando estado local reactivo para
                navegar instantáneamente entre vistas sin recargar el navegador, garantizando rapidez y
                fluidez en escritorio y móvil.
              </p>
            </div>
            <div className="system-card">
              <div className="subject-icon green">
                <Search size={22} color="#18865a" />
              </div>
              <h3>Biblioteca y Buscador Inteligente</h3>
              <p>
                Sistema de filtrado combinado mediante <code>useMemo</code> que permite cruzar
                categorías por materia con búsqueda en tiempo real por título y descripción, además de
                lectura en ventana modal.
              </p>
            </div>
            <div className="system-card">
              <div className="subject-icon yellow">
                <Target size={22} color="#a47713" />
              </div>
              <h3>Motor de Cuestionarios Dinámicos</h3>
              <p>
                Evaluador interactivo de 5 reactivos por asignatura con barra de progreso en vivo,
                validación de respuestas completas, calificación automática y retroalimentación
                detallada por pregunta.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* ==================== SECCIÓN 3: CÓDIGO FUENTE (COMPRIMIDO) ==================== */}
      {page === 'codigo' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="EMPAQUETADO DEL PROYECTO"
            title="Código fuente (comprimido)"
            text="Descarga el archivo comprimido con la estructura completa del proyecto y revisa la organización de sus directorios."
          />
          <div className="zip-box">
            <div className="zip-info">
              <div className="zip-badge">
                <FileArchive size={34} />
              </div>
              <div>
                <span className="eyebrow">ARCHIVO ZIP · REACT + VITE</span>
                <h2>SITIO WEB EDUCATIVO.zip</h2>
                <p>
                  Contiene todos los componentes JSX, hojas de estilo CSS, banco de datos de
                  materias/cuestionarios y archivos de configuración listos para ejecutar con{' '}
                  <code>npm install && npm run dev</code>.
                </p>
                <div className="zip-actions">
                  <button className="btn-primary" onClick={handleDownloadZip}>
                    <Download size={17} /> Descargar código fuente (.zip)
                  </button>
                  {downloadNotice && (
                    <span className="download-feedback">✓ Descarga iniciada correctamente</span>
                  )}
                </div>
              </div>
            </div>

            <div className="file-tree">
              <div className="file-tree-header">
                <Code2 size={16} /> Estructura interna del paquete
              </div>
              <pre>{`SITIO WEB EDUCATIVO.zip
└── aprende-facil/
    ├── index.html
    ├── package.json
    ├── README.md
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── styles.css
        └── data/
            └── content.js`}</pre>
            </div>
          </div>
        </main>
      )}

      {/* ==================== SECCIÓN 4: REPORTE DE MODIFICACIONES ==================== */}
      {page === 'reporte' && (
        <main className="container page-content">
          <PageHeading
            eyebrow="BITÁCORA DE CAMBIOS"
            title="Reporte de las modificaciones realizadas"
            text="Registro detallado de las mejoras, correcciones y nuevos módulos incorporados al código base original."
          />
          <div className="report-list">
            {modificationsReport.map(mod => (
              <article className="report-item" key={mod.id}>
                <div className="report-code">{mod.id}</div>
                <div className="report-body">
                  <span className="eyebrow">{mod.componente}</span>
                  <h3>{mod.cambio}</h3>
                  <p>
                    <b>Impacto:</b> {mod.impacto}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <button className="brand footer-brand" onClick={() => go('inicio')}>
            <span className="brand-icon">
              <GraduationCap size={23} />
            </span>
            <span>
              Aprende<span className="brand-accent">Fácil</span>
              <small>APRENDE · PRACTICA · AVANZA</small>
            </span>
          </button>
          <p>
            Un espacio para aprender a tu ritmo. <span>Hecho para seguir creciendo. 💙</span>
          </p>
          <div className="footer-links">
            {nav.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>
                {label}
              </button>
            ))}
            <button onClick={() => go('actividades')}>Actividades</button>
            <button onClick={() => go('sistema')}>Sistema</button>
            <button onClick={() => go('codigo')}>Código (.zip)</button>
            <button onClick={() => go('reporte')}>Reporte</button>
          </div>
          <small className="copyright">
            © {new Date().getFullYear()} Aprende Fácil. Proyecto educativo.
          </small>
        </div>
      </footer>

      {selectedResource && (
        <div className="modal-backdrop" onClick={() => setSelectedResource(null)}>
          <div className="resource-modal" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedResource(null)}
              aria-label="Cerrar"
            >
              <X />
            </button>
            <span className="eyebrow">
              {subjects.find(s => s.id === selectedResource.subject)?.name}
            </span>
            <h2>{selectedResource.title}</h2>
            <div className="resource-meta">
              <span>{selectedResource.type}</span>
              <span>{selectedResource.level}</span>
            </div>
            <p>{selectedResource.body}</p>
            <div className="modal-tip">
              ✏️{' '}
              <span>
                <b>Recuerda:</b> toma notas y repasa este tema para reforzar lo aprendido.
              </span>
            </div>
            <button className="btn-primary" onClick={() => openQuiz(selectedResource.subject)}>
              Practicar esta materia <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PageHeading({ eyebrow, title, text }) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

function SubjectGrid({ onSelect, large = false }) {
  return (
    <div className={large ? 'subject-grid large' : 'subject-grid'}>
      {subjects.map(s => (
        <button className="subject-card" key={s.id} onClick={() => onSelect(s.id)}>
          <span className={`subject-icon ${s.color}`}>{s.icon}</span>
          <span className="subject-name">{s.name}</span>
          <span className="subject-description">{s.description}</span>
          <span className="subject-bottom">
            Ver recursos <ArrowRight size={16} />
          </span>
        </button>
      ))}
    </div>
  );
}

function ResourceGrid({ items, onOpen }) {
  return (
    <div className="resource-grid">
      {items.map(r => (
        <article className="resource-card" key={r.id}>
          <div className="resource-card-top">
            <span className={`mini-subject ${subjects.find(s => s.id === r.subject)?.color}`}>
              {subjects.find(s => s.id === r.subject)?.icon}
            </span>
            <span className="resource-type">{r.type}</span>
          </div>
          <h3>{r.title}</h3>
          <p>{r.summary}</p>
          <div className="resource-card-bottom">
            <span>{r.level}</span>
            <button onClick={() => onOpen(r)}>
              Leer recurso <ChevronRight size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}