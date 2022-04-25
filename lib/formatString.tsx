export default function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function replaceSpaceWithHypen(text: any) {
  const formattedText = text?.toString().replace(/\s+/g, "-").toLowerCase();
  return formattedText;
}

export function replaceHypenWithSpace(text: string) {
  const formattedText = text?.toString().replace(/-/g, " ");
  return formattedText;
}
