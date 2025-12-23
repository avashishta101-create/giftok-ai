export function detectTheme(caption: string): string {
  const text = caption.toLowerCase();

  if (/(panic|late|forgot|oh no|uh oh|help)/.test(text)) return "panic reaction";
  if (/(win|won|finally|lets go|success|nailed)/.test(text)) return "celebration reaction";
  if (/(sad|miss|cry|alone|hurt|pain)/.test(text)) return "sad reaction";
  if (/(angry|mad|hate|annoyed|furious)/.test(text)) return "angry reaction";
  if (/(confused|what|huh|why|bro)/.test(text)) return "confused reaction";
  if (/(wow|wtf|shock|shocked|no way)/.test(text)) return "shocked reaction";
  if (/(fine|ok|sure|yeah right)/.test(text)) return "fake smile reaction";

  return "neutral reaction";
}
