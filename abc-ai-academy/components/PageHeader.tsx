export default function PageHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <section className="bg-surface pb-12 pt-28 md:pb-16 md:pt-36">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        {desc && <p className="mt-3 text-muted">{desc}</p>}
      </div>
    </section>
  );
}
