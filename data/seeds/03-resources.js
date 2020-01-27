exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        {
          id: 1,
          name: "Computer",
          description: "Computer to accomplish tasks online",
          project_id: 1
        },
        {
          id: 2,
          name: "Phone",
          description: "To make calls to communicate to others",
          project_id: 1
        },
        {
          id: 3,
          name: "Resume",
          description: "My updated Resume",
          project_id: 2
        },
        {
          id: 4,
          name: "Online Job directory",
          description: "Directory of job positions available",
          project_id: 2
        },
        {
          id: 5,
          name: "Car",
          description: "Drive around to checkout different venues",
          project_id: 3
        },
        {
          id: 6,
          name: "EvePhotography",
          description: "Wedding Photographer",
          project_id: 3
        },
        {
          id: 7,
          name: "Immaculant Conception Church",
          description: "Location for wedding",
          project_id: 3
        }
      ]);
    });
};
