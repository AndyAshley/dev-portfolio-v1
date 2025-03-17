import Image from "next/image";
import { Metadata } from "next";

// Components
import Chip from "@/components/ui/chip";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import Markdown, { Components } from "react-markdown";
import parseDateTime from "@/components/utils/parse-date-time";
import ContentContainer from "@/components/ui/content-container";

// Constants
import { BASE_RAW_URL, API_URL } from "../constants";

// markdown styles
import "highlight.js/styles/github-dark.css";

/**
 * Generate static paths for blog posts
 */
export async function generateStaticParams() {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Failed to fetch post paths");

  const postFolders: { name: string }[] = await res.json();
  return postFolders.map((folder) => ({ slug: folder.name }));
}

/**
 * Fetch post metadata and content
 * @param {string} slug - Post identifier
 * @returns {Promise<{ metadata: any; content: string }>} Post data
 */
async function fetchPost(slug: string) {
  if (!slug) return { metadata: null, content: "Invalid post slug." };

  try {
    const [metaRes, contentRes] = await Promise.all([
      fetch(`${BASE_RAW_URL}/${slug}/postMeta.json`, {
        next: { revalidate: 60 },
      }),
      fetch(`${BASE_RAW_URL}/${slug}/post.md`, {
        next: { revalidate: 60 },
      }),
    ]);

    if (!metaRes.ok || !contentRes.ok)
      throw new Error(`Failed to fetch post: ${slug}`);

    const [metadata, content] = await Promise.all([
      metaRes.json(),
      contentRes.text(),
    ]);

    return { metadata, content };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { metadata: null, content: "Error loading content." };
  }
}

/**
 * Generate metadata for the blog post page
 */
export async function generateMetadata({
  params: rawParams,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params before using them
  const params = await rawParams;

  // Fetch the post data
  const { metadata: postMeta } = await fetchPost(params.slug);
  // If no metadata is found, use default values
  if (!postMeta) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Define metadata based on the post
  return {
    title: postMeta.title,
    description:
      postMeta.description ||
      `${postMeta.preview} - Blog post by ${postMeta.author}`,
    openGraph: {
      title: postMeta.title,
      description:
        postMeta.description ||
        `${postMeta.preview} - Blog post by ${postMeta.author}`,
      type: "article",
      publishedTime: postMeta.date,
      authors: [postMeta.author],
      images: postMeta.thumbnail ? [{ url: postMeta.thumbnail }] : [],
    },
    authors: [{ name: postMeta.author }],
    category: postMeta.category,
    keywords: postMeta.tags || [],
  };
}

/**
 * Blog Post Page Component
 */
export default async function BlogPostPage({
  params: rawParams,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await rawParams;
  const { metadata, content } = await fetchPost(params.slug);

  if (!metadata) {
    return (
      <ContentContainer>
        <h2>Error: Could not load post.</h2>
        <p>The content you were looking for doesn't exist or failed to load.</p>
      </ContentContainer>
    );
  }

  return (
    <article className="max-w-7xl w-full mx-auto">
      <ContentContainer>
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">{metadata.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
            <Chip text={metadata.category} color="text-gray-200" />
            <time dateTime={metadata.date} className="font-medium">
              {parseDateTime(metadata.date)}
            </time>
            <span className="text-gray-500">•</span>
            <span className="font-semibold text-cyber-green-400">
              {metadata.author}
            </span>
          </div>

          {metadata.thumbnail && (
            <Image
              src={metadata.thumbnail}
              alt={metadata.title}
              width={1280}
              height={720}
              className="rounded-md mb-2"
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
            />
          )}
        </header>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto">
          <Markdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents}
          >
            {content}
          </Markdown>
        </div>
      </ContentContainer>
    </article>
  );
}

/**
 * Markdown Component Overrides
 */
const markdownComponents: Components = {
  img: ({
    src = "",
    alt = "Markdown Image",
    width = 1024,
    height = 576,
    ...props
  }) => (
    <div className="my-6">
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        className="w-full rounded-lg border border-gray-700 shadow-md"
        {...props}
      />
    </div>
  ),
  p: ({ node, children, ...props }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (node && node.children.some((child: any) => child.tagName === "img")) {
      return <>{children}</>;
    }
    return (
      <p className="mb-4" {...props}>
        {children}
      </p>
    );
  },
  h2: (props) => (
    <h2
      className="text-2xl mt-10 mb-3 pb-2 border-b border-gray-700"
      {...props}
    />
  ),
  h3: (props) => <h3 className="text-xl mt-6 mb-3" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-700 pl-4 italic text-gray-400"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc list-inside space-y-2" {...props} />,
  ol: (props) => (
    <ol className="list-decimal list-inside space-y-2" {...props} />
  ),
};
