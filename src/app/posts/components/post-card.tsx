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
          <h2 className="font-secondary font-bold text-xl tracking-normal">
            {post.title}
          </h2>
          <small className="text-primary">{post.category}</small>
          <p className="mt-2">{post.preview}</p>
        </div>
        <LinkButton href={`/posts/${post.slug}`} mode="secondary" size="small">
          Read More
        </LinkButton>
      </div>
    </ContentContainer>
  );
};

export default PostCard;
