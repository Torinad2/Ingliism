/*
 * API статей: /api/articles?lang=ru
 * Одна статья: /api/articles?lang=ru&slug=history
 *
 * Cloudflare запускает этот код на сервере.
 * DB — привязка базы D1 в настройках проекта.
 */

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);

    // По умолчанию загружаем русские статьи.
    const language = url.searchParams.get("lang") || "ru";
    const slug = url.searchParams.get("slug");

    if (!/^[a-z]{2}$/.test(language)) {
        return Response.json(
            { error: "Invalid language" },
            { status: 400 }
        );
    }

    try {
        // Возвращаем полный текст одной опубликованной статьи.
        if (slug !== null) {
            const article = await env.DB.prepare(`
                SELECT
                    a.slug,
                    a.category,
                    a.source_url,
                    t.language,
                    t.title,
                    t.description,
                    t.content,
                    t.updated_at
                FROM articles AS a
                JOIN article_translations AS t
                    ON t.article_id = a.id
                WHERE a.slug = ?
                    AND t.language = ?
                    AND t.status = 'published'
            `).bind(slug, language).first();

            if (!article) {
                return Response.json(
                    { error: "Article not found" },
                    { status: 404 }
                );
            }

            return Response.json({ article });
        }

        // Возвращаем список без полных текстов.
        const { results } = await env.DB.prepare(`
            SELECT
                a.slug,
                a.category,
                t.language,
                t.title,
                t.description,
                t.updated_at
            FROM articles AS a
            JOIN article_translations AS t
                ON t.article_id = a.id
            WHERE t.language = ?
                AND t.status = 'published'
            ORDER BY t.title, a.slug
        `).bind(language).all();

        return Response.json({ articles: results });
    } catch (error) {
        console.error("Failed to read articles:", error);

        return Response.json(
            { error: "Could not load articles" },
            { status: 500 }
        );
    }
}