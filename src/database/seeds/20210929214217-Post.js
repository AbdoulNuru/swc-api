module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Posts", [
      {
        id: "5tbc29bc-1948-4185-a14f-e4d8558f4100",
        posterId: "f6a59377-bace-45fd-ac68-1d2ee19f70a1",
        article: "This is it",
        media: "img.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("Posts", null, {}),
};
