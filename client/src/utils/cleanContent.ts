//clean up the content before displaying it.
export const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };