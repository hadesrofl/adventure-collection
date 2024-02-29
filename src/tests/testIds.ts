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
};
