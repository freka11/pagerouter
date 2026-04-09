

const POSTS_PER_PAGE = 9;
const POSTS_API_BASE = "https://jsonplaceholder.typicode.com";


export type Post = {
  userId: number;
  id: number;
  imageUrl: string;
  title: string;
  body: string;
};

async function executeFetch<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  const data = (await response.json()) as T;
  return { data, headers: response.headers };
}

export async function fetchPostsWithCount(page = 1) {
  const { data, headers } = await executeFetch<Post[]>(
    `${POSTS_API_BASE}/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`,
  );

  const totalCount = Number(headers.get("x-total-count") || 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  return {
    posts: data,
    totalPages,

  };
}

export async function fetchPost(id: string) {
  const { data } = await executeFetch<Post>(`${POSTS_API_BASE}/posts/${id}`);
  return data;
}
