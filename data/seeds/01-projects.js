exports.seed = function(knex) {
  return knex("projects")
    .truncate()
    .then(function() {
      return knex("projects").insert([
        {
          id: 1,
          name: "Complete Portfolio",
          description:
            "Complete my portfolio online with current information related to my career goals",
          completed: "false"
        },
        {
          id: 2,
          name: "Find a Job",
          description:
            "Look for a position with a company that aligns with my career/personal goals",
          completed: "false"
        },
        {
          id: 3,
          name: "Prepare for Wedding",
          description:
            "Use the timeframe I have left ot prepare for my wedding in June",
          completed: "false"
        }
      ]);
    });
};
