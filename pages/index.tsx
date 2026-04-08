import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { fetchPostsWithCount, type Post } from "@/services/api";

type HomeProps = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  error?: string;
};

export default function Home({ posts = [], currentPage = 1, totalPages = 1, error }: HomeProps) {
  const router = useRouter();
  const safePosts = posts ?? [];
  const safeTotalPages = Math.max(1, totalPages ?? 1);

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <header className="mx-auto h-full mb-8 max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ">
        <h1 className="text-3xl font-semibold">Posts</h1>
      </header>

      <main className="mx-auto max-w-6xl">
        {error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
            <strong className="block text-lg">Unable to load posts</strong>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : safePosts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700">
            <p className="text-lg font-semibold">No posts found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {safePosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="block">
                <Card
                  id={post.id}
                  title={post.title}
                  body={post.body}
                />
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto mt-8 max-w-6xl">
        <Pagination currentPage={currentPage} totalPages={safeTotalPages} onPageChange={handlePageChange} />
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const page = Number(rawPage) > 0 ? Number(rawPage) : 1;

  try {
    const { posts, totalPages } = await fetchPostsWithCount(page);

    return {
      props: {
        posts,
        currentPage: page,
        totalPages,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: [],
        currentPage: page,
        totalPages: 1,
        error: error instanceof Error ? error.message : "An unexpected error occurred.",
      },
    };
  }
};
