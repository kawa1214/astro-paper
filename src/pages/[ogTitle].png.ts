import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

export const get: APIRoute = async ({ params }) => {
  const img = await generateOgImage(params.ogTitle);
  return new Response(img, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export async function getStaticPaths() {
  const postImportResult = await getCollection(
    "blog",
    ({ data }) => !data.draft
  );
  const posts = Object.values(postImportResult);
  return posts
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { ogTitle: data.title },
    }));
}
