export const TestIds = {
  icons: {
    edit: "EditIcon",
    delete: "DeleteIcon",
  },
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
  seriesGallery: {
    entry: (name: string) => `series-gallery-entry-${name}`,
    badge: (name: string) => `series-gallery-badge-${name}`,
    addButton: "series-gallery-add-button",
  },
  seriesButtonGroup: {
    root: (name: string) => `series-button-group-${name}`,
    inputDialogButton: (name: string) =>
      `series-button-group-input-dialog-button-${name}`,
    deleteDialogButton: (name: string) =>
      `series-button-group-delete-dialog-button-${name}`,
  },
  systemGallery: {
    entry: (name: string) => `system-gallery-entry-${name}`,
    adventureCount: (name: string) => `system-gallery-adventures-${name}`,
    addButton: "system-gallery-add-button",
  },
  systemButtonGroup: {
    root: (name: string) => `system-button-group-${name}`,
    inputDialogButton: (name: string) =>
      `system-button-group-input-dialog-button-${name}`,
    deleteDialogButton: (name: string) =>
      `system-button-group-delete-dialog-button-${name}`,
  },
};
