import { mockSystems } from "@tests/mockData/mockSystems";
import { mockGenres } from "@tests/mockData/mockGenres";
import { mockTags } from "@tests/mockData/mockTags";
import { System } from "@features/systems";
import { Series } from "@features/series";
import { AdventureFull } from "@features/adventures";
import { AdventureSeedData } from "@repositories/seeding/AdventureSeedData";

function findEntries<T extends { name: string }>(
  names: string[],
  collection: T[]
) {
  const entities: T[] = [];
  names.forEach((name) => {
    const mockEntry = collection.find((tag) => tag.name === name);
    if (mockEntry) entities.push(mockEntry);
  });
  return entities;
}

function convertSeedToEntity(
  id: number,
  adventure: AdventureSeedData,
  system: System,
  series: Series | null = null
): AdventureFull {
  return {
    id,
    name: adventure.name,
    summary: adventure.summary,
    tags: findEntries(adventure.tags, mockTags),
    system,
    systemId: system.id,
    language: adventure.language,
    genres: findEntries(adventure.genres, mockGenres),
    series: series,
    seriesId: series?.id ?? null,
    alreadyPlayed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: adventure.image ?? null,
    pageCount: adventure.pageCount ?? null,
    minLevel: adventure.minLevel ?? null,
    maxLevel: adventure.maxLevel ?? null,
  };
}

export const mockAdventureSeeds: AdventureSeedData[] = [
  {
    name: "Segler auf Sternenloser See",
    summary:
      "Schon immer sind du und deine Leute im Schatten der riesigen Ruine ihrem mühseligen Tagewerk nachgegangen. Der Ursprung der Ruine ist rätselhaft und die Quelle manches Aberglaubens – ein Geheimnis, das nach Meinung der anderen im Dorf am besten sich selbst überlassen bleiben sollte.\nAber jetzt rührt sich etwas unter den bröckelnden Mauern. Tiermenschen heulen in der Nacht und deine Dorfnachbarn werden nachts aus ihren Betten entführt. Und da keine Helden da sind, die euch verteidigen: Wer wird sich gegen die immer näher rückende Finsternis zur Wehr setzen? Es liegt an euch, die Geheimnisse des Chaos zu entschlüsseln, aber was wird der Preis für euren Verstand und eure Seelen sein?\nSegler auf Sternenloser See ist ein Einstiegsabenteuer für das Dungeon Crawl Classics-Rollenspiel. Es lässt einen Mob von Abenteurern der Stufe 0 gegen das Erbe der Chaosherrscher und ihre verdorbenen Horden antreten. Beim Vorstoß unter die bröckelnde Ruine entdecken die Charaktere uralte Krypten, eine sternenlose See und eine antike Zikkurat, in der Tod und Schätze gleichermaßen warten.",
    tags: ["Funnel", "Burg", "Tiermenschen", "Dämonen"],
    system: "Dungeon Crawl Classics",
    genres: ["Weird Fantasy", "Sword & Sorcery"],
    series: "DCC Trichter",
    image:
      "https://www.system-matters.de/wp-content/uploads/2019/12/DCC-Segler.jpg",
    pageCount: 18,
    language: "German",
    minLevel: 0,
    maxLevel: 1,
  },
  {
    name: "Das Winterfest der kleinen Heiligen",
    summary:
      "Jedes Jahr im Winter begehen die Mäuse in Sterwig das Winterfest der kleinen Heiligen. Ganz gewöhnliche Mäuse werden für kleine Aufmerksamkeiten und selbstlose Hilfe gegenüber ihren Mitmäusen gefeiert. Doch dieses Jahr ist das Winterfest in Gefahr!\nDie Krähe Nachtblau findet keine Freunde. Sie hat Zaubertafeln einer Eulenzauberin gestohlen, um nicht mehr einsam zu sein. In Sterwig fand sie die Paraphernalia für ihr Ritual. Sie holte einen lebenden Traum in diese Welt und in ihren Geist.\nDer Traum will zurück in das Träumen, doch Nachtblau will ihn nicht ziehen lassen. Nun steht eine Pforte zwischen dem Mäusereich und zahllosen Traumwelten offen. Träume entfliehen und beschwipste Wichtel folgen ihnen.",
    tags: ["Weihnachten", "Traumwesen", "Krähe"],
    system: "Mausritter",
    genres: ["Sword & Sorcery"],
    series: "Weihnachtsabenteuer",
    image:
      "https://www.system-matters.de/wp-content/uploads/Mausritter-07-1.png",
    pageCount: 6,
    language: "German",
  },
];

export const mockAdventures: AdventureFull[] = mockAdventureSeeds.map(
  (seed, idx) => {
    const lastSystemId = mockSystems[mockSystems.length - 1].id;
    const system = mockSystems.find(
      (system) => system.name === seed.system
    ) ?? { id: lastSystemId + 1, name: seed.system, createdAt: new Date() };
    return convertSeedToEntity(idx + 1, seed, system);
  }
);
