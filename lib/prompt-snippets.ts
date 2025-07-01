/* ──────────────────────────────────────────
   PROMPT_SNIPPETS  ➜  11个风格关键词
   全部集中放进一个常量对象，key=style_code
────────────────────────────────────────── */
export const PROMPT_SNIPPETS: Record<string, string> = {
  lineart:
    '((fine line-art)), ultra clean 0.15 mm black ink, precise cross-hatching shadows, manga contour, pure white negative space',
  watercolor:
    '((soft watercolor)), pastel wash, wet-edge bloom, translucent layering, cotton paper grain, dreamy hand-paint feel',
  ghibli:
    '((ghibli style)), vivid yet tender palette, hand-paint 2D cel, gentle rim light, whimsical warm tone, storybook charm',
  oilpaint:
    '((classic oil painting)), thick impasto strokes, palette-knife texture, rich umber under-painting, warm chiaroscuro glow',
  sketch:
    '((graphite pencil sketch)), dynamic hatch, smudge shading, raw paper tooth, study-grade draughtsmanship, neutral grey scale',
  cartoon:
    '((flat cartoon)), bold 4 px ink outline, high-sat CMYK chunk color, sticker vibe, zero gradient, playful exaggeration',
  realistic:
    '((hand-drawn realism)), subtle pencil base, layered light watercolor tint, natural proportion, soft diffuse shade, print ready',
  pixel:
    '((32×32 pixel art)), 16-color NES palette, crisp 1 px black outline, retro 8-bit charm, no anti-alias',
  etching:
    '((vintage etching)), dense fine hatch, sepia-ink engraving, copperplate era, antique print finish, historical texture',
  snowtext:
    'snow surface, carve text "{subject_en}" ({subject_original}), razor-edge trough, cold blue dawn glow, powder sparkles',
  sandtext:
    'golden sand, carve text "{subject_en}" ({subject_original}), sharp groove, warm sunset rim-light, fine grain sparkle',
}; 