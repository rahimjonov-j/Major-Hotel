const UNSPLASH = "https://images.unsplash.com"

export function unsplash(id: string, width = 1200, quality = 75) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export const roomPhotoIds = [
  "photo-1611892440504-42a792e24d32",
  "photo-1590490360182-c33d57733427",
  "photo-1618773928121-c32242e63f39",
  "photo-1582719478250-c89cae4dc85b",
  "photo-1568495248636-6432b97bd949",
  "photo-1595576508898-0ad5c879a061",
  "photo-1592229505726-ca121723b8ef",
  "photo-1611967164521-abae8fba4668",
  "photo-1560448204-e02f11c3d0e2",
  "photo-1595526114035-0d45ed16cfbf",
  "photo-1560185127-6ed189bf02f4",
  "photo-1512918728675-ed5a9ecdebfd",
  "photo-1578683010236-d716f9a3f461",
  "photo-1631049307264-da0ec9d70304",
  "photo-1584132967334-10e028bd69f7",
]

export const lobbyPhotoIds = [
  "photo-1522798514-97ceb8c4f1c8",
  "photo-1618219908412-a29a1bb7b86e",
  "photo-1445019980597-93fa8acb246c",
]

export const restaurantPhotoIds = [
  "photo-1414235077428-338989a2e8c0",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1544148103-0773bf10d330",
]

export const poolPhotoIds = [
  "photo-1571003123894-1f0594d2b5d9",
  "photo-1571896349842-33c89424de2d",
  "photo-1596436889106-be35e843f974",
  "photo-1582719508461-905c673771fd",
]

export const exteriorPhotoIds = [
  "photo-1568084680786-a84f91d1153c",
  "photo-1540541338287-41700207dee6",
  "photo-1455587734955-081b22074882",
  "photo-1542314831-068cd1dbfeeb",
]

export function roomImage(index: number, width = 1200) {
  return unsplash(roomPhotoIds[index % roomPhotoIds.length], width)
}
