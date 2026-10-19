/*
 * Ingliism
 * Меню, поиск, языки и загрузка статей из Cloudflare D1.
 *
 * Подключение в index.html:
 * <script src="js/main.js" defer></script>
 */

/* Тексты интерфейса. Статьи находятся в базе данных. */
const copy = {
    ru: {
        nav: ["Главная", "Учение", "Статьи", "История", "О проекте"],
        eye: "Открытая библиотека",
        heading: "Пространство<br>для <em>понимания.</em>",
        intro:
            "Знакомьтесь с идеями, изучайте источники и находите ответы " +
            "на свои вопросы. В своём темпе, с вниманием к деталям.",
        explore: "Открыть библиотеку ↗",
        art: "Знание начинается с вопроса",
        library: "Исследуйте библиотеку",
        sub: "Начните с темы, которая вам близка.",
        search: "Поиск по статьям…",
        read: "Читать статью ↗",
        about: "О проекте",
        aboutText:
            "Ingliism — открытая библиотека. Здесь можно постепенно " +
            "собирать статьи, первоисточники и иллюстрации на нескольких " +
            "языках. Для материалов указываются источники.",
        footer: "Библиотека знаний",
        footer2: "Русский / English · Без регистрации",
        back: "← К библиотеке",
        empty: "Статьи не найдены.",
        section: "Раздел библиотеки",
        history: "Исторические материалы",
        loading: "Загрузка…",
        error: "Не удалось загрузить статьи. Попробуйте ещё раз.",
        retry: "Повторить",
        missing: "Статья не найдена или ещё не переведена на русский язык.",
        source: "Источник"
    },

    en: {
        nav: ["Home", "Teachings", "Articles", "History", "About"],
        eye: "An open library",
        heading: "A space for<br><em>understanding.</em>",
        intro:
            "Explore ideas, read sources, and find answers to your " +
            "questions. At your own pace, with attention to detail.",
        explore: "Explore the library ↗",
        art: "Knowledge begins with a question",
        library: "Explore the library",
        sub: "Begin with a topic that speaks to you.",
        search: "Search articles…",
        read: "Read article ↗",
        about: "About the project",
        aboutText:
            "Ingliism is an open library. It can hold a growing collection " +
            "of articles, source documents, and illustrations in multiple " +
            "languages. Sources are provided for library materials.",
        footer: "A library of knowledge",
        footer2: "Русский / English · No registration",
        back: "← Back to library",
        empty: "No articles found.",
        section: "Library section",
        history: "Historical materials",
        loading: "Loading…",
        error: "Could not load articles. Please try again.",
        retry: "Retry",
        missing: "Article not found or not yet translated into English.",
        source: "Source"
    }
};

/* Восстанавливаем язык. Если localStorage недоступен, используем русский. */
let lang = "ru";

try {
    if (localStorage.getItem("ingliism-language") === "en") {
        lang = "en";
    }
} catch {
    // Запрет сохранения данных не мешает работе сайта.
}

/* Порядок разделов соответствует подписям меню. */
const routes = [
    "home",
    "teachings",
    "articles",
    "timeline",
    "about"
];

/* Экранируем данные базы перед вставкой в HTML. */
function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

/* Разрешаем только обычные веб-ссылки. */
function safeUrl(value) {
    try {
        const url = new URL(value);

        return ["http:", "https:"].includes(url.protocol)
            ? url.href
            : "";
    } catch {
        return "";
    }
}

/*
 * Ссылки Markdown:
 * [Название](https://example.com)
 *
 * Остальной текст экранируется, поэтому HTML из базы не выполняется.
 */
function inlineMarkdown(text) {
    const pattern = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let result = "";
    let offset = 0;

    for (const match of text.matchAll(pattern)) {
        result += escapeHtml(text.slice(offset, match.index));

        const href = safeUrl(match[2]);

        result += href
            ? `<a href="${escapeHtml(href)}"
                  rel="noopener noreferrer">${escapeHtml(match[1])}</a>`
            : escapeHtml(match[0]);

        offset = match.index + match[0].length;
    }

    return result + escapeHtml(text.slice(offset));
}

/*
 * Простой Markdown:
 * ## Подзаголовок
 * Обычные абзацы
 * - Элементы списка
 * [Название](https://example.com)
 *
 * Изображения и расширенное форматирование пока не поддерживаются.
 */
function renderMarkdown(value) {
    return String(value ?? "")
        .replace(/\r\n?/g, "\n")
        .split(/\n\s*\n/)
        .filter(block => block.trim())
        .map(block => {
            const lines = block.trim().split("\n");

            if (lines.every(line => /^[-*] +/.test(line))) {
                return "<ul>" + lines.map(line => {
                    const text = line.replace(/^[-*] +/, "");

                    return `<li>${inlineMarkdown(text)}</li>`;
                }).join("") + "</ul>";
            }

            return lines.map(line => {
                const heading = line.match(/^(#{1,6}) +(.+)$/);

                if (heading) {
                    // H1 используется для названия самой статьи.
                    const level = Math.max(2, heading[1].length);

                    return `<h${level}>${
                        inlineMarkdown(heading[2])
                    }</h${level}>`;
                }

                return `<p>${inlineMarkdown(line)}</p>`;
            }).join("");
        })
        .join("");
}

/* Переводим постоянные названия категорий из базы. */
function categoryLabel(category, language) {
    const labels = {
        teachings: {
            ru: "Учение",
            en: "Teachings"
        },
        history: {
            ru: "История",
            en: "History"
        },
        articles: {
            ru: "Статьи",
            en: "Articles"
        }
    };

    return labels[category]?.[language] || category;
}

/* Создаём карточку статьи. */
function createCard(article, index, texts, language) {
    const slug = escapeHtml(encodeURIComponent(article.slug));
    const category = escapeHtml(
        categoryLabel(article.category, language)
    );

    return `
        <a class="card" href="#article/${slug}">
            <span class="num">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <div class="eyebrow" style="margin-top:14px">
                ${category}
            </div>

            <h3>${escapeHtml(article.title)}</h3>
            <p>${escapeHtml(article.description)}</p>
            <span class="read">${texts.read}</span>
        </a>
    `;
}

/*
 * При переходе отменяем предыдущий запрос.
 * Номер renderVersion защищает от запоздавших ответов.
 */
let activeRequest;
let renderVersion = 0;

/*
 * Получаем список статей или одну статью.
 *
 * Список: /api/articles?lang=ru
 * Статья: /api/articles?lang=ru&slug=ingliizm-introduction
 */
async function loadArticles(language, slug, signal) {
    const params = new URLSearchParams({ lang: language });

    if (slug !== null) {
        params.set("slug", slug);
    }

    const response = await fetch(`/api/articles?${params}`, {
        signal
    });

    if (response.status === 404 && slug !== null) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`API HTTP ${response.status}`);
    }

    const data = await response.json();

    if (slug !== null) {
        if (!data.article || typeof data.article.content !== "string") {
            throw new Error("Invalid article response");
        }

        return data.article;
    }

    if (!Array.isArray(data.articles)) {
        throw new Error("Invalid articles response");
    }

    return data.articles;
}

/* Обновляем страницу при запуске, переходе и смене языка. */
async function render() {
    activeRequest?.abort();
    activeRequest = new AbortController();

    const controller = activeRequest;
    const version = ++renderVersion;
    const language = lang;
    const texts = copy[language];
    const route = location.hash.slice(1) || "home";
    const main = document.querySelector("#main");

    document.documentElement.lang = language;
    document.title = "Ingliism · " + texts.footer;

    /* Меню разделов. */
    document.querySelector("#nav").innerHTML = routes
        .map((item, index) => `
            <a href="#${item}"
               ${item === route ? 'aria-current="page"' : ""}>
                ${texts.nav[index]}
            </a>
        `)
        .join("");

    /* Состояние кнопок выбора языка. */
    for (const item of ["ru", "en"]) {
        const button = document.getElementById(item);
        const selected = item === language;

        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", selected);
    }

    /* Подвал сайта. */
    document.getElementById("foot").textContent = texts.footer;
    document.getElementById("foot2").textContent = texts.footer2;

    /* Общий блок информации о проекте. */
    const about = `
        <section class="about">
            <div>
                <h2>${texts.about}</h2>
            </div>
            <p>${texts.aboutText}</p>
        </section>
    `;

    let content = "";
    let articles = [];
    let article = null;

    const isArticle = route.startsWith("article/");

    /* Страница «О проекте» не требует обращения к базе. */
    if (route !== "about") {
        main.innerHTML = `<p role="status">${texts.loading}</p>`;

        // Не ждём ответа сервера бесконечно.
        let timedOut = false;

        const timeout = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, 15000);

        try {
            const slug = isArticle
                ? decodeURIComponent(route.slice(8))
                : null;

            const result = await loadArticles(
                language,
                slug,
                controller.signal
            );

            if (version !== renderVersion) {
                return;
            }

            if (isArticle) {
                article = result;
            } else {
                articles = result;
            }
        } catch (error) {
            if (version !== renderVersion) {
                return;
            }

            // Отмена при переходе на другую страницу не является ошибкой.
            if (error.name === "AbortError" && !timedOut) {
                return;
            }

            console.error("Articles API:", error);

            main.innerHTML = `
                <p role="alert">${texts.error}</p>
                <button type="button" id="retry-articles">
                    ${texts.retry}
                </button>
            `;

            document.getElementById("retry-articles").onclick = () => {
                render();
            };

            return;
        } finally {
            clearTimeout(timeout);
        }
    }

    if (isArticle) {
        /* Полный текст отдельной статьи. */
        if (article) {
            document.title = article.title + " · Ingliism";

            const source = safeUrl(article.source_url);
            const category = escapeHtml(
                categoryLabel(article.category, language)
            );

            const sourceLink = source
                ? `
                    <p>
                        <a href="${escapeHtml(source)}"
                           rel="noopener noreferrer">
                            ${texts.source}
                        </a>
                    </p>
                `
                : "";

            content = `
                <article class="article">
                    <a class="back" href="#articles">
                        ${texts.back}
                    </a>

                    <p class="eyebrow">${category}</p>
                    <h1>${escapeHtml(article.title)}</h1>
                    <p class="intro">
                        ${escapeHtml(article.description)}
                    </p>

                    ${renderMarkdown(article.content)}
                    ${sourceLink}
                </article>
            `;
        } else {
            content = `
                <article class="article">
                    <a class="back" href="#articles">
                        ${texts.back}
                    </a>
                    <p>${texts.missing}</p>
                </article>
            `;
        }
    } else if (route === "about") {
        content = `
            <div style="padding-top:40px">
                ${about}
            </div>
        `;
    } else {
        /* Главная страница: вводный блок и CSS-пейзаж. */
        if (route === "home") {
            const artDescription = language === "ru"
                ? "Стилизованный пейзаж с солнцем и холмами"
                : "Stylized landscape with sun and hills";

            content = `
                <section class="hero">
                    <div>
                        <div class="eyebrow">${texts.eye}</div>
                        <h1>${texts.heading}</h1>
                        <p class="intro">${texts.intro}</p>

                        <a class="primary" href="#articles">
                            ${texts.explore}
                        </a>
                    </div>

                    <div class="art"
                         role="img"
                         aria-label="${artDescription}">
                        <div class="sun"></div>
                        <div class="hill second"></div>
                        <div class="hill"></div>
                        <div class="hill third"></div>
                        <div class="art-label">${texts.art}</div>
                    </div>
                </section>
            `;
        }

        /* Фильтруем статьи по категории, записанной в базе. */
        const filteredArticles = articles.filter(item => {
            if (route === "teachings") {
                return item.category === "teachings";
            }

            if (route === "timeline") {
                return item.category === "history";
            }

            return true;
        });

        const cards = filteredArticles
            .map((item, index) => {
                return createCard(item, index, texts, language);
            })
            .join("");

        const sectionTitle = route === "teachings"
            ? texts.nav[1]
            : route === "timeline"
                ? texts.history
                : texts.library;

        const sectionStyle = route === "home"
            ? ""
            : "margin-top:55px";

        content += `
            <section style="${sectionStyle}">
                <div class="section-head">
                    <div>
                        <div class="eyebrow">${texts.section}</div>
                        <h2>${sectionTitle}</h2>
                        <div class="small">${texts.sub}</div>
                    </div>

                    <input class="search"
                           type="search"
                           aria-label="${texts.search}"
                           placeholder="${texts.search}">
                </div>

                <div class="grid" id="cards">
                    ${cards}
                </div>

                <p class="empty"
                   ${filteredArticles.length ? "hidden" : ""}>
                    ${texts.empty}
                </p>
            </section>

            ${about}
        `;
    }

    /* Не показываем результат устаревшего запроса. */
    if (version !== renderVersion) {
        return;
    }

    main.innerHTML = content || `<p>${texts.empty}</p>`;

    /* Поиск по заголовкам, описаниям и категориям карточек. */
    const search = document.querySelector(".search");

    if (search) {
        search.addEventListener("input", () => {
            const query = search.value.trim().toLowerCase();
            let visibleCount = 0;

            document.querySelectorAll(".card").forEach(card => {
                const matches = card.textContent
                    .toLowerCase()
                    .includes(query);

                card.hidden = !matches;
                card.style.display = matches ? "" : "none";

                if (matches) {
                    visibleCount++;
                }
            });

            document.querySelector(".empty").hidden = visibleCount > 0;
        });
    }
}

/* Выбор языка и сохранение настройки в браузере. */
for (const language of ["ru", "en"]) {
    document.getElementById(language).onclick = () => {
        lang = language;

        try {
            localStorage.setItem("ingliism-language", language);
        } catch {
            // Переключение работает даже без localStorage.
        }

        render();
    };
}

/* Переходы по меню и кнопки браузера «Назад» / «Вперёд». */
addEventListener("hashchange", () => {
    render();
    scrollTo(0, 0);
});

/* Первый показ страницы. */
render();