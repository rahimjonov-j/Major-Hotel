const UNSPLASH = "https://images.unsplash.com";

export function unsplash(id: string, width = 1600, quality = 80) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const images = {
  heroPool: unsplash("photo-1566073771259-6a8506099945", 2000),
  exteriorFacade: unsplash("photo-1568084680786-a84f91d1153c"),
  exteriorGrounds: unsplash("photo-1540541338287-41700207dee6"),
  exteriorSunset: unsplash("photo-1455587734955-081b22074882"),
  exteriorNight: unsplash("photo-1542314831-068cd1dbfeeb"),

  roomDeluxe: unsplash("photo-1611892440504-42a792e24d32"),
  roomSuite: unsplash("photo-1590490360182-c33d57733427"),
  roomExecutive: unsplash("photo-1618773928121-c32242e63f39"),
  roomBed: unsplash("photo-1582719478250-c89cae4dc85b"),
  roomCozy: unsplash("photo-1568495248636-6432b97bd949"),
  roomSuiteAlt: unsplash("photo-1595576508898-0ad5c879a061"),
  roomModern: unsplash("photo-1592229505726-ca121723b8ef"),

  lobbyMain: unsplash("photo-1522798514-97ceb8c4f1c8"),
  lobbyLounge: unsplash("photo-1618219908412-a29a1bb7b86e"),
  lobbyReception: unsplash("photo-1522798514-97ceb8c4f1c8"),

  restaurantMain: unsplash("photo-1414235077428-338989a2e8c0"),
  restaurantFine: unsplash("photo-1517248135467-4c7edcad34c4"),
  restaurantBar: unsplash("photo-1544148103-0773bf10d330"),

  poolInfinity: unsplash("photo-1571003123894-1f0594d2b5d9"),
  poolResort: unsplash("photo-1571896349842-33c89424de2d"),
  poolLoungers: unsplash("photo-1596436889106-be35e843f974"),
  poolDeck: unsplash("photo-1582719508461-905c673771fd"),

  aboutStory: unsplash("photo-1551882547-ff40c63fe5fa"),
};
