const projectForm = document.getElementById('project-request-form');
const project = document.querySelector('.project')
const qualification = document.querySelector('.qualification');
const next = document.querySelector('.next')
const previous = document.querySelector('.previous');
const message = document.querySelector('.thankyou-message');

// ids don't take # like they would in css

next.addEventListener("click", () => {
  project.style.display = 'none';
  qualification.style.display = "flex";
});

previous.addEventListener("click", () => {
  project.style.display = "flex";
  qualification.style.display = "none";
});

projectForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // document.querySelectorAll('input').forEach((input) => {
  //   // ca revient petit.. petit
  //   if (input.value.trim() === "")
  //     return;
  // });

  const formData = new FormData(projectForm);
  // this should be created INSIDE function
  // to get values from the FormData we get the inputname. the input name is an attribute called 'name'. we can name our input with the "name" attribute and target that attribute using the name we gave it.

  const client = {
    platform: formData.getAll("platform"), // "All" handles multi-select
    service: formData.getAll("service"),
    description: formData.get("description"), // get(simply get): textareas and inputs
    state: formData.getAll("state"),
    // timeline: formData.getAll("timeline"),
    projectStage: formData.getAll("project-stage"),
    position: formData.getAll("position"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    source: formData.get("info-source")
  }

  // console.log(client);
  //   now we need to transfer out data to airtable to create a user.

  await fetch("http://localhost:3000/create-client", { //fetch takes url and an object not a function
    method: "POST",
    headers: { //header(NO), headers(YES). "s" at the end
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  })

  projectForm.style.display = "none";
  message.style.display = "block"
});

