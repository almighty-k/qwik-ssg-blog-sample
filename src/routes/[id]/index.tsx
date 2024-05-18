import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead, type StaticGenerateHandler } from '@builder.io/qwik-city';

import { client } from '~/lib/client';
import { type Article } from '..';

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const response = await client.get({
    endpoint: 'blogs',
  });
  return {
    params: response.contents.map((article: Article) => ({ id: article.id })),
  };
};

export const useArticleLoader = routeLoader$(async ({ params }) => {
  const response = await client.get({
    endpoint: 'blogs',
    contentId: params.id,
  });
  return response;
});

export default component$(() => {
  const article = useArticleLoader();
  return (
    <div class="prose">
      <h1>{article.value.title}</h1>
      <div dangerouslySetInnerHTML={article.value.content} />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const article = resolveValue(useArticleLoader);
  return {
    title: `- ${article.title}`,
    meta: [
      {
        name: 'description',
        content: '詳細ページ',
      },
    ],
  };
};
