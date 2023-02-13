/** Count of milliseconds on a day **/
export const NUMBER_OF_ROOMS = getRandomNumberOfRooms(20, 200);

function getRandomNumberOfRooms(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
