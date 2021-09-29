module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("Users", [
      {
        id: "f6a59377-bace-45fd-ac68-1d2ee19f70a1",
        firstName: "Guevara",
        lastName: "Manzi",
        email: "guevara@gmail.com",
        password:
          "$2a$10$m.PowUVgBdtQVjMrJ8zbneGIlUVlSg9aigz4.aHlZ9io27RUPSX1y",
        fieldOfExpertise: "Marketing",
        skills: ["Cooking", "Sales"],
        interests: ["Sports", "Gaming"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
