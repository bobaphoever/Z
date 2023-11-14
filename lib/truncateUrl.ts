const truncateUrl = (url: string, maxLength: number): string => {
    let strippedUrl = url.replace(/^(http|https):\/\//, '').replace(/^www\./, '');
    if (new URL(url).hostname.endsWith('lenster.xyz')) {
      return strippedUrl;
    }
    if (strippedUrl.length > maxLength) {
      return strippedUrl.substring(0, maxLength - 1) + '…';
    }
    return strippedUrl;
  };
  
  export default truncateUrl;