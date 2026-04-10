type CardProps = {
  id?: number;
  title: string;
  body: string;
};

export default function Card({ id, title, body }: CardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 hover:scale-105 active:scale-100 transition-transform">
      <img
        src={`https://picsum.photos/400/200?random=${id || Math.random()}`}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}



