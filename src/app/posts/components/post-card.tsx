// Components
import Image from "next/image";
import { LinkButton } from "@/components/ui/link-button";
import ContentContainer from "@/components/ui/content-container";

type PostCardType = {
  post: {
    title: string;
    thumbnail?: string;
    date: string;
    author: string;
    category: string;
    preview: string;
    slug: string;
  };
};

const PostCard = ({ post }: PostCardType) => {
  return (
    <ContentContainer noPadding className="overflow-hidden group text-left">
      {post.thumbnail && (
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={320}
          height={180}
          className="w-full group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="font-bold text-xl">{post.title}</h2>
          <small className="text-cyber-green-100">{post.category}</small>
          <p className="mt-3">{post.preview}</p>
        </div>
        <LinkButton href={`/posts/${post.slug}`}>Read More</LinkButton>
      </div>
    </ContentContainer>
  );
};

export default PostCard;
