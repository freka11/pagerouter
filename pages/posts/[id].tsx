import Link from "next/link";
import type { GetServerSideProps } from "next";
import { fetchPost, type Post } from "@/services/api";

type PostPageProps = {
  post?: Post;
  error?: string;
};

export default function PostPage({ post, error }: PostPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
            <p className="text-lg font-semibold text-rose-600">Unable to load post</p>
            <p className="mt-2">{error}</p>
            <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
              ← Back to posts
            </Link>
          </div>
        ) : !post ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700">
            <p className="text-lg font-semibold">Post not found</p>
            <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
              ← Back to posts
            </Link>
          </div>
        ) : (
          <div className="space-y-10 h-full w-full">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-slate-900">{post.title}</h1>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Post #{post.id}</p>
            </div>
            <img
              src={`https://picsum.photos/1200/500?random=${post.id}`}
              alt={post.title}
              className="w-full h-72 object-cover rounded-3xl"
            />
            <div className="text-slate-700">
              <p className="text-lg leading-8">{post.body}</p>
            </div>
            <div>
              <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
                ← Back to posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ query }) => {
  const rawId = Array.isArray(query.id) ? query.id[0] : query.id;

  if (!rawId) {
    return { props: { error: "Missing post ID." } };
  }

  try {
    const post = await fetchPost(rawId);
    return { props: { post } };
  } catch (error) {
    return {
      props: {
        error: error instanceof Error ? error.message : "Could not load the post.",
      },
    };
  }
};
