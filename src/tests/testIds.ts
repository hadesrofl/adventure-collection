export const TestIds = {
  adventureCard: {
    card: (id: number) => `adventureCard-${id}`,
    header: (id: number) => `adventureCardHeader-${id}`,
    content: (id: number) => `adventureCardContent-${id}`,
    tagList: (id: number) => `adventureCardTagList-${id}`,
    primaryAction: "adventureCard-link",
  },
  adventureCardGallery: "adventureCardGallery",
  adventureCardCarousel: {
    buttons: {
      nextCard: "carousel-nextCard",
      previousCard: "carousel-previousCard",
    },
  },
  adventureForm: {
    fields: {
      name: "adventure-form-name",
      summary: "adventure-form-summary",
      system: "adventure-form-system",
      series: "adventure-form-series",
      language: "adventure-form-language",
      genres: "adventure-form-genres",
      tags: "adventure-form-tags",
      pageCount: "adventure-form-pageCount",
      minLevel: "adventure-form-minLevel",
      maxLevel: "adventure-form-maxLevel",
      alreadyPlayed: "adventure-form-alreadyPlayed",
      image: "adventure-form-image",
      submit: "adventure-form-submit",
    },
  },
};
