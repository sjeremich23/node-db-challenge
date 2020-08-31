exports.seed = function(knex) {
  return knex("tasks")
    .truncate()
    .then(function() {
      return knex("tasks").insert([
        {
          id: 1,
          description: "Update GitHub",
          notes: "Update all projects on GitHub",
          completed: "false",
          project_id: 1
        },
        {
          id: 2,
          description: "Complete About Me section",
          notes: "Finish update the about me section on my portfolio",
          completed: "false",
          project_id: 1
        },
        {
          id: 3,
          description: "Fill out applications",
          notes: "Fill out applications to companies I'm interested in",
          completed: "false",
          project_id: 2
        },
        {
          id: 4,
          description: "Call for interviews",
          notes:
            "Call companies I'd like to work for and request interviews for possible positions to apply for",
          completed: "false",
          project_id: 2
        },
        {
          id: 5,
          description: "Locate church for wedding",
          notes:
            "Locate a catholic church that has my fiancee's prefered wedding date available",
          completed: "true",
          project_id: 3
        },
        {
          id: 6,
          description: "Create guest list",
          notes: "Create a list of all the family/friends we'd like to invite",
          completed: "true",
          project_id: 3
        },
        {
          id: 7,
          description: "Hire Wedding Photographer",
          notes:
            "Hire wedding photographer for engagment session and our wedding",
          completed: "true",
          project_id: 3
        }
      ]);
    });
};
