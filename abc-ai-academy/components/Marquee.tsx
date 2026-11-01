/** 같은 내용을 두 번 이어 붙여 끊김 없이 흐르게 한다. */
export default function Marquee({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={i} className="shrink-0">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
