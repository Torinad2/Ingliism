/*
 * Ingliism
 * Меню, статьи, поиск и переключение языков.
 *
 * Подключение в index.html:
 * <script src="js/main.js" defer></script>
 */

/*
 * Тексты интерфейса и статьи на двух языках.
 *
 * ru — русский.
 * en — английский.
 *
 * id — постоянный идентификатор статьи.
 * У переводов одной статьи должен быть одинаковый id.
 *
 * body — содержимое статьи:
 * чётный индекс — подзаголовок,
 * нечётный индекс — абзац.
 *
 * Пока статьи находятся здесь.
 * Загрузка отдельных Markdown-файлов ещё не реализована.
 */
const copy = {
    ru: {
        nav: [
            "Главная",
            "Учение",
            "Статьи",
            "История",
            "О проекте"
        ],

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
            "Это пример информационного сайта Ingliism. Здесь можно " +
            "постепенно собирать статьи, первоисточники и иллюстрации " +
            "на нескольких языках. Тексты на этой странице показывают " +
            "структуру сайта и не являются изложением вероучения.",

        demo: "ДЕМОНСТРАЦИОННЫЙ КОНТЕНТ",
        footer: "Библиотека знаний",
        footer2: "Русский / English · Без регистрации",

        back: "← К библиотеке",
        empty: "Статьи не найдены.",
        section: "Раздел библиотеки",

        history: "Исторические материалы",
        historyText:
            "Этот раздел предназначен для хронологии, документов и " +
            "описания исторического контекста. Добавляйте даты, ссылки " +
            "на первоисточники и пояснения к каждому материалу. " +
            "Пока это демонстрационная страница.",

        articles: [
            {
                id: "beginning",
                category: "Учение",
                title: "С чего начать изучение",
                desc:
                    "Путеводитель по библиотеке: основные темы, " +
                    "понятия и порядок чтения.",

                body: [
                    "Как устроена библиотека",
                    "Начните с обзорного материала. Он помогает увидеть " +
                    "общую структуру темы, а затем перейти к отдельным " +
                    "понятиям и вопросам.",

                    "Читайте внимательно",
                    "В каждой статье можно размещать определения, " +
                    "примеры и ссылки на источники. Разделяйте цитаты " +
                    "из документов и авторские пояснения.",

                    "Продолжите исследование",
                    "Сохраняйте вопросы, возникающие во время чтения. " +
                    "Связанные материалы помогут рассмотреть их " +
                    "с разных сторон."
                ]
            },
            {
                id: "sources",
                category: "Статьи",
                title: "Как работать с источниками",
                desc:
                    "На что обращать внимание при чтении документов " +
                    "и сопоставлении текстов.",

                body: [
                    "Контекст имеет значение",
                    "Укажите автора, название, дату и место публикации " +
                    "документа. Эти сведения помогают читателю понять " +
                    "происхождение текста.",

                    "Цитаты и пояснения",
                    "Оформляйте прямые цитаты отдельно и указывайте " +
                    "источник. Если текст переведён, полезно добавить " +
                    "сведения о переводчике и оригинале.",

                    "Сопоставление материалов",
                    "Несколько источников могут по-разному описывать " +
                    "одно событие. Отмечайте различия и объясняйте, " +
                    "на какие документы опирается статья."
                ]
            },
            {
                id: "history",
                category: "История",
                title: "История и контекст",
                desc:
                    "Место для хронологии, исторических документов " +
                    "и комментариев.",

                body: [
                    "Постройте хронологию",
                    "Здесь можно разместить проверенные даты и краткие " +
                    "описания событий, дополнив их ссылками на документы.",

                    "Добавьте контекст",
                    "Поясните, какие обстоятельства важны для понимания " +
                    "каждого события. Иллюстрации и карты могут " +
                    "дополнять текст.",

                    "Укажите источники",
                    "В конце материала разместите библиографию и ссылки " +
                    "для дальнейшего чтения. Это демонстрационный текст, " +
                    "а не историческая справка."
                ]
            }
        ]
    },

    en: {
        nav: [
            "Home",
            "Teachings",
            "Articles",
            "History",
            "About"
        ],

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
            "This is a sample information website for Ingliism. " +
            "It can hold a growing collection of articles, source " +
            "documents, and illustrations in multiple languages. " +
            "These sample texts demonstrate the website structure " +
            "and do not describe religious doctrine.",

        demo: "DEMONSTRATION CONTENT",
        footer: "A library of knowledge",
        footer2: "Русский / English · No registration",

        back: "← Back to library",
        empty: "No articles found.",
        section: "Library section",

        history: "Historical materials",
        historyText:
            "This section is intended for a timeline, documents, and " +
            "historical context. Add dates, primary sources, and notes " +
            "for each item. This is currently a demonstration page.",

        articles: [
            {
                id: "beginning",
                category: "Teachings",
                title: "Where to begin",
                desc:
                    "A guide to the library: key topics, concepts, " +
                    "and a suggested reading order.",

                body: [
                    "Finding your way",
                    "Start with an overview. It can help you understand " +
                    "the structure of a subject before exploring " +
                    "individual concepts and questions.",

                    "Read with care",
                    "Each article can include definitions, examples, " +
                    "and links to sources. Keep quotations from " +
                    "documents distinct from editorial explanations.",

                    "Continue exploring",
                    "Keep a list of questions as you read. Related " +
                    "materials can help you consider them from " +
                    "different perspectives."
                ]
            },
            {
                id: "sources",
                category: "Articles",
                title: "Reading the sources",
                desc:
                    "What to look for when reading documents and " +
                    "comparing different texts.",

                body: [
                    "Context matters",
                    "Record the author, title, date, and place of " +
                    "publication. These details help readers understand " +
                    "where a text comes from.",

                    "Quotations and notes",
                    "Clearly mark direct quotations and identify the " +
                    "source. For translations, include details about " +
                    "the translator and original text when available.",

                    "Comparing materials",
                    "Sources may describe the same event differently. " +
                    "Note the differences and explain which documents " +
                    "support an article."
                ]
            },
            {
                id: "history",
                category: "History",
                title: "History and context",
                desc:
                    "A place for timelines, historical documents, " +
                    "and explanatory notes.",

                body: [
                    "Build a timeline",
                    "Add verified dates and short descriptions of " +
                    "events, with links to documents.",

                    "Provide context",
                    "Explain which circumstances matter for each " +
                    "event. Illustrations and maps can complement " +
                    "the text.",

                    "List your sources",
                    "Finish with a bibliography and further reading. " +
                    "This is sample content, not a historical account."
                ]
            }
        ]
    }
};

/*
 * Восстанавливаем выбранный язык из памяти браузера.
 * По умолчанию используем русский.
 */
let lang = localStorage.getItem("ingliism-language") === "en"
    ? "en"
    : "ru";

/*
 * Адреса разделов.
 * Их порядок соответствует подписям в nav.
 *
 * Примеры:
 * #home
 * #articles
 * #article/history
 */
const routes = [
    "home",
    "teachings",
    "articles",
    "timeline",
    "about"
];

/*
 * Создаём HTML карточки статьи.
 *
 * article — объект статьи.
 * index — номер карточки, начиная с нуля.
 * texts — тексты текущего языка.
 *
 * innerHTML ниже используется только с заданными в коде текстами.
 * Внешний HTML перед вставкой нужно безопасно обрабатывать.
 */
function createCard(article, index, texts) {
    return `
        <a class="card" href="#article/${article.id}">
            <span class="num">0${index + 1}</span>

            <div class="eyebrow" style="margin-top:14px">
                ${article.category}
            </div>

            <h3>${article.title}</h3>
            <p>${article.desc}</p>

            <span class="read">${texts.read}</span>
        </a>
    `;
}

/*
 * Отображаем текущий раздел сайта.
 * Вызывается при запуске, смене языка и переходе между разделами.
 */
function render() {
    const texts = copy[lang];

    // Убираем # из адреса. Пустой адрес означает главную страницу.
    const route = location.hash.slice(1) || "home";

    // Язык документа и название вкладки браузера.
    document.documentElement.lang = lang;
    document.title = "Ingliism · " + texts.footer;

    /*
     * Строим меню.
     * aria-current отмечает открытый раздел.
     */
    document.querySelector("#nav").innerHTML = routes
        .map((item, index) => `
            <a
                href="#${item}"
                ${item === route ? 'aria-current="page"' : ""}
            >
                ${texts.nav[index]}
            </a>
        `)
        .join("");

    /*
     * Обновляем кнопки языков.
     * active используется в CSS.
     * aria-pressed сообщает состояние вспомогательным технологиям.
     */
    for (const language of ["ru", "en"]) {
        const button = document.getElementById(language);
        const selected = language === lang;

        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", selected);
    }

    // Переводим подписи в подвале.
    document.getElementById("foot").textContent = texts.footer;
    document.getElementById("foot2").textContent = texts.footer2;

    // Общий блок «О проекте».
    const about = `
        <section class="about">
            <div>
                <h2>${texts.about}</h2>
                <span class="demo">${texts.demo}</span>
            </div>

            <p>${texts.aboutText}</p>
        </section>
    `;

    let content = "";

    if (route.startsWith("article/")) {
        /*
         * Открываем отдельную статью.
         * Из article/history получаем идентификатор history.
         */
        const articleId = route.split("/")[1];

        const article = texts.articles.find(
            item => item.id === articleId
        );

        if (article) {
            /*
             * Чередуем подзаголовки и абзацы.
             * Индексы 0, 2, 4 — подзаголовки.
             * Индексы 1, 3, 5 — абзацы.
             */
            const articleBody = article.body
                .map((text, index) => {
                    if (index % 2 === 0) {
                        return `<h2>${text}</h2>`;
                    }

                    return `<p>${text}</p>`;
                })
                .join("");

            content = `
                <article class="article">
                    <a class="back" href="#articles">
                        ${texts.back}
                    </a>

                    <p class="eyebrow">
                        ${article.category} · ${texts.demo}
                    </p>

                    <h1>${article.title}</h1>
                    <p class="intro">${article.desc}</p>

                    ${articleBody}
                </article>
            `;
        }
    } else if (route === "about") {
        // Отдельная страница «О проекте».
        content = `
            <div style="padding-top:40px">
                ${about}
            </div>
        `;
    } else if (route === "timeline") {
        // Вводная страница раздела «История».
        content = `
            <article class="article">
                <p class="eyebrow">${texts.section}</p>

                <h1>${texts.history}</h1>
                <p>${texts.historyText}</p>

                <a class="primary" href="#article/history">
                    ${texts.read}
                </a>
            </article>
        `;
    } else {
        if (route === "home") {
            // Описание CSS-пейзажа для экранных дикторов.
            const artDescription = lang === "ru"
                ? "Стилизованный пейзаж с солнцем и холмами"
                : "Stylized landscape with sun and hills";

            // Вводный блок показываем только на главной странице.
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

                    <div
                        class="art"
                        role="img"
                        aria-label="${artDescription}"
                    >
                        <div class="sun"></div>
                        <div class="hill second"></div>
                        <div class="hill"></div>
                        <div class="hill third"></div>

                        <div class="art-label">${texts.art}</div>
                    </div>
                </section>
            `;
        }

        /*
         * В разделе «Учение» показываем первую статью.
         * На главной и в разделе «Статьи» показываем все статьи.
         */
        const articles = texts.articles.filter((article, index) => {
            return route !== "teachings" || index === 0;
        });

        const cards = articles
            .map((article, index) => {
                return createCard(article, index, texts);
            })
            .join("");

        const sectionTitle = route === "teachings"
            ? texts.nav[1]
            : texts.library;

        const sectionStyle = route !== "home"
            ? "margin-top:55px"
            : "";

        content += `
            <section style="${sectionStyle}">
                <div class="section-head">
                    <div>
                        <div class="eyebrow">${texts.section}</div>
                        <h2>${sectionTitle}</h2>
                        <div class="small">${texts.sub}</div>
                    </div>

                    <input
                        class="search"
                        type="search"
                        aria-label="${texts.search}"
                        placeholder="${texts.search}"
                    >
                </div>

                <div class="grid" id="cards">
                    ${cards}
                </div>

                <p class="empty" hidden>${texts.empty}</p>
            </section>

            ${about}
        `;
    }

    /*
     * Заменяем содержимое основного контейнера.
     * Если статья не найдена, выводим сообщение.
     */
    document.querySelector("#main").innerHTML =
        content || `<p>${texts.empty}</p>`;

    /*
     * Назначаем поиск после создания нового HTML.
     * Поиск проверяет текст карточек, а не полное содержимое статей.
     */
    const search = document.querySelector(".search");

    if (search) {
        search.addEventListener("input", () => {
            const query = search.value.toLowerCase();
            let visibleCount = 0;

            document.querySelectorAll(".card").forEach(card => {
                const text = card.textContent.toLowerCase();
                const matches = text.includes(query);

                // Атрибут hidden скрывает неподходящие карточки.
                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            // Показываем сообщение, если совпадений нет.
            document.querySelector(".empty").hidden =
                visibleCount > 0;
        });
    }
}

/*
 * Переключение языка.
 * Сохраняем выбор в браузере и обновляем содержимое страницы.
 */
for (const language of ["ru", "en"]) {
    document.getElementById(language).onclick = () => {
        lang = language;

        localStorage.setItem("ingliism-language", language);

        render();
    };
}

/*
 * Реагируем на изменение части адреса после #.
 * Работает также с кнопками браузера «Назад» и «Вперёд».
 */
addEventListener("hashchange", () => {
    render();

    // Новый раздел показываем с начала страницы.
    scrollTo(0, 0);
});

// Первый показ страницы.
render();