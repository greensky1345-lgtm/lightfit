type Props = {
  eyebrow?: string;
  before?: string;
  highlight?: string;
  after?: string;
  second?: string;
  dark?: boolean;
};

/** 가운데 정렬 제목. highlight 부분만 브랜드 색으로 강조한다. */
export default function SectionTitle({ eyebrow, before, highlight, after, second, dark }: Props) {
  return (
    <div className="text-center">
      {eyebrow && <p className={`text-sm ${dark ? "text-white/70" : "text-muted"}`}>{eyebrow}</p>}
      <h2 className={`mt-3 text-2xl font-bold leading-snug md:text-4xl ${dark ? "text-white" : "text-ink"}`}>
        {before}
        {highlight && <span className="text-brand">{highlight}</span>}
        {after}
        {second && (
          <>
            <br />
            {second}
          </>
        )}
      </h2>
    </div>
  );
}
