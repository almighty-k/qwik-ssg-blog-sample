import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Link, useNavigate } from "@builder.io/qwik-city";

import { client } from "~/lib/client";

export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: string | null;
}

export const useArticlesLoader = routeLoader$<Article[]>(async () => {
  try {
    const response = await client.get({
      endpoint: 'blogs',
    });
    return response.contents;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
});

export default component$(() => {
  const articles = useArticlesLoader();
  const navigate = useNavigate();

  return (
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="py-2 text-gray-400 text-left font-light text-sm">作成日時</th>
          <th class="py-2 text-gray-400 text-left font-light text-sm">タイトル</th>
        </tr>
      </thead>
      <tbody>
        {articles.value.map((article) => (
          <tr key={article.id} class="cursor-pointer border-b last:border-b-0 hover:bg-gray-100" onClick$={() => navigate(`/${article.id}`)}>
            <td class="py-3 text-gray-700">{new Date(article.createdAt).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })}</td>
            <td class="py-3 text-gray-700">{article.title}</td>
          </tr>
        ))}

      </tbody>
    </table>

  );
});

export const head: DocumentHead = {
  title: "Qwik Blogサンプル",
  meta: [
    {
      name: "description",
      content: "ブログをQwikのSSGを使用して作成したものです。",
    },
  ],
};
