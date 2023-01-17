export const colors = [
  '#a7bed3',
  '#98ccd9',
  '#f1ffc4',
  '#ffcaaf',
  '#dab894',
  '#e0bbe4',
  '#ffdfd3',
];

export function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
