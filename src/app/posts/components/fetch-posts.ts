import { API_URL, BASE_RAW_URL } from "../constants";

// Type Definition
interface PostMeta {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  category: string;
  preview: string;
  slug: string;
}



/**
 *  Fetches a list of post metadata from the GitHub repository.
 * @returns  {Promise<PostMeta[]>} A list of post metadata objects.
 */
export default async function fetchPosts(): Promise<PostMeta[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch post list from GitHub.");

    const postFolders: { name: string }[] = await res.json();

    const posts = await Promise.all(
      postFolders.map(async (folder) => {
        try {
          const metaRes = await fetch(
            `${BASE_RAW_URL}/${folder.name}/postMeta.json`
          );
          if (!metaRes.ok)
            throw new Error(`Missing meta for post: ${folder.name}`);

          const metadata = await metaRes.json();
          return { slug: folder.name, ...metadata };
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );

    return posts.filter((post): post is PostMeta => post !== null);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
