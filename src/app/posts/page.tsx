import { Metadata } from "next";

// Components
import Divider from "@/components/ui/divider";
import PostCard from "./components/post-card";
import FadeInContent from "@/lib/motion";
import fetchPosts from "./components/fetch-posts";

// Page Metadata
export const metadata: Metadata = {
  title: "Posts",
  description:
    "Thoughts on code, engineering, and the occasional deep dive into whatever tech rabbit hole I'm currently obsessed with.",
};

// Main Page Component
export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <section className="h-full w-full flex flex-col items-center">
      <div className="max-w-lg text-center">
        <FadeInContent from="left" className="mb-12">
          <h1 className="mb-3">Content Posts</h1>
          <Divider />
          <p className="mb-6 text-balance">
            Welcome to my <strong>repository of ramblings</strong>. Expect deep
            dives into tech, questionable engineering decisions, and whatever
            else I feel like documenting. Also, this page is a bit of an
            experiment—posts are pulled straight from GitHub. No CMS, no static
            builds, just <strong>raw markdown and JSON</strong>.
            <span className="text-gray-500 text-sm ml-2">
              (Until GitHub rate limits me.)
            </span>
          </p>
        </FadeInContent>

        <FadeInContent
          from="bottom"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto"
        >
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No posts yet. Either I haven’t written anything, or GitHub just
              said *nah*.
            </p>
          )}
        </FadeInContent>
      </div>
    </section>
  );
}
