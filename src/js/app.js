import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  let fullName = `${variables.name ? variables.name : ""} ${
    variables.lastName ? variables.lastName : ""
  }`.trim();
  let displayName = fullName || "Nombre y Apellido";
  let displayRole = variables.role || "Rol";

  /*Ubicaccion*/
  let displayLocation = `${variables.city ? variables.city : "Ciudad"}, ${
    variables.country ? variables.country : "País"
  }`.trim();

  // Enlaces de redes sociales
  let socialMedia = {
    twitter: variables.twitter
      ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
      : "",
    github: variables.github
      ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
      : "",
    linkedin: variables.linkedin
      ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
      : "",
    instagram: variables.instagram
      ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
      : ""
  };
  let socialMediaPositionClass =
    variables.socialMediaPosition === "left"
      ? "position-left"
      : "position-right";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          
          <img id="avatar" src="${variables.avatarURL}" class="photo" onclick="document.getElementById('avatarInput').click();" />
          
          <h1>${displayName}</h1>
          <h2>${displayRole}</h2>
          <h3>${displayLocation}</h3>
          <ul class="${socialMediaPositionClass}">
          ${socialMedia.twitter}
          ${socialMedia.github}
          ${socialMedia.linkedin}
          ${socialMedia.instagram}
      </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background:
      "https://img.freepik.com/foto-gratis/loro-colorido-palabra-loro_1340-38610.jpg?w=1060&t=st=1716548151~exp=1716548751~hmac=597d757cead75b7b03c72b34244574752d960f275fb998354739f73a7844b1fa",
    // this is the url for the profile avatar
    avatarURL:
      "https://ca.slack-edge.com/T0BFXMWMV-U06HMDP185Q-3ca25f3772bf-512",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
