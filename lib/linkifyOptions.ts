export const linkifyOptions = {
  // @ts-ignore
  format: (value, type) => {
    if (type === "url" && value.length > 50) {
      value = value.slice(0, 50) + "…";
    }
    return value;
  },
  formatHref: function (href: string, type: 'mention'): string {
    if (type === 'mention') {
      href = '/u/' + href.slice(1)
    }
    return href
  },
  target: '_blank',
  rel: 'noreferrer'
}
