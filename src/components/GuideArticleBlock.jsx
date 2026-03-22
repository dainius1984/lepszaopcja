/**
 * Bloki treści dla długich przewodników (poradnik, kompendium).
 * @typedef {{ type: 'p', text: string }} GuideP
 * @typedef {{ type: 'ul', items: string[] }} GuideUl
 * @typedef {{ type: 'h3', text: string }} GuideH3
 * @typedef {{ type: 'callout', variant: 'tip'|'warn'|'insight', items: string[] }} GuideCallout
 */

export default function GuideArticleBlock({ block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[#444444] leading-relaxed mb-4 last:mb-0">{block.text}</p>
      );
    case "h3":
      return (
        <h3 className="text-lg sm:text-xl font-semibold text-[#333333] mt-8 mb-3 first:mt-0">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc pl-5 space-y-2 text-[#444444] leading-relaxed mb-4 last:mb-0">
          {block.items.map((item, idx) => (
            <li key={`${idx}-${item.slice(0, 48)}`}>{item}</li>
          ))}
        </ul>
      );
    case "callout": {
      const variant = block.variant || "tip";
      const isWarn = variant === "warn";
      const isInsight = variant === "insight";
      const emoji = isInsight ? "💡" : "👉";
      const boxClass = isWarn
        ? "bg-amber-50 border-amber-200/80 text-amber-950"
        : isInsight
          ? "bg-sky-50 border-sky-200/70 text-sky-950"
          : "bg-[#71797E]/[0.08] border-[#71797E]/20 text-[#333333]";
      return (
        <aside className={`my-4 rounded-xl px-4 py-3 border ${boxClass}`} role="note">
          <ul className="list-none space-y-1.5 m-0 p-0">
            {block.items.map((item, idx) => (
              <li key={`${idx}-${item.slice(0, 48)}`} className="flex gap-2.5">
                <span className="shrink-0 select-none" aria-hidden>
                  {emoji}
                </span>
                <span>{item.replace(/^(👉|💡)\s*/, "")}</span>
              </li>
            ))}
          </ul>
        </aside>
      );
    }
    default:
      return null;
  }
}
