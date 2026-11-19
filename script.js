// PROVIDED: use this collection to generate the entries.
const $creatures = [
  {
    "name": "Moss Dragon",
    "description": "A gentle gardener who grows tiny forests wherever it naps.",
    "image": "assets/moss-dragon.svg",
    "alt": "A green dragon with leafy horns and small wings."
  },
  {
    "name": "Cloud Fox",
    "description": "A sky wanderer collecting soft clouds and lost daydreams.",
    "image": "assets/cloud-fox.svg",
    "alt": "A pale blue fox with pointed ears and a fluffy tail."
  },
  {
    "name": "Ember Salamander",
    "description": "A warm little companion that keeps campfires glowing.",
    "image": "assets/ember-salamander.svg",
    "alt": "An orange salamander with a flame at the end of its tail."
  },
  {
    "name": "Moon Owl",
    "description": "A quiet navigator who reads the stories written in stars.",
    "image": "assets/moon-owl.svg",
    "alt": "A purple owl with a crescent moon on its forehead."
  },
  {
    "name": "Crystal Turtle",
    "description": "A patient explorer carrying a sparkling crystal garden.",
    "image": "assets/crystal-turtle.svg",
    "alt": "A mint green turtle with purple crystals on its shell."
  },
  {
    "name": "Mushroom Sprite",
    "description": "A woodland storyteller with a spotted cap and muddy boots.",
    "image": "assets/mushroom-sprite.svg",
    "alt": "A small cream sprite wearing a red spotted mushroom cap."
  }
]

// YOUR WORK: build these features using the supplied HTML, CSS, and data.
// 1. Select the collection and preference controls.

const collectionList = document.getElementById("collection");
const themeSelect = document.getElementById("theme");
const layoutSelect = document.getElementById("layout");
const statusMessage = document.getElementById("status");

// 2. Use a loop to generate the creature entries. See START-HERE.md for markup.

// PSEUDOCODE:
// clear the list so entries never duplicate
// for each creature in the array
//   build an <li> with an image, name and description
//   add it to the collection list

function renderCollection() {
  collectionList.innerHTML = "";

  for (const creature of $creatures) {
    const item = document.createElement("li");
    item.className = "creature";

    item.innerHTML = `
      <img src="${creature.image}" alt="${creature.alt}">
      <div class="creature-info">
        <h3>${creature.name}</h3>
        <p class="creature-description">${creature.description}</p>
      </div>
    `;

    collectionList.appendChild(item);
  }
}

renderCollection();

// 3. Listen for changes to each preference control and update the appearance.

// PSEUDOCODE:
// take a theme value (forest, sky or desert)
// set it as the body's data-theme attribute

function applyTheme(theme) {
  document.body.dataset.theme = theme;
}

// PSEUDOCODE:
// take a layout value (cards, detailed or compact)
// set it as the collection's data-layout attribute

function applyLayout(layout) {
  collectionList.dataset.layout = layout;
}

// PSEUDOCODE:
// when the theme dropdown changes, apply the newly selected theme
// when the layout dropdown changes, apply the newly selected layout

themeSelect.addEventListener("change", function () {
  applyTheme(themeSelect.value);
  savePreferences(); 
});

layoutSelect.addEventListener("change", function () {
  applyLayout(layoutSelect.value);
  savePreferences();
});

// 4. Save both selected preferences to Local Storage.

const STORAGE_KEY = "mtm6302-a4-creature-preferences";

// PSEUDOCODE:
// read the current theme and layout from the dropdowns
// put them together in one object
// turn the object into a JSON string and store it
// tell the visitor their choices were saved

function savePreferences() {
  const preferences = {
    theme: themeSelect.value,
    layout: layoutSelect.value
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  statusMessage.textContent = "Your preferences have been saved!";
}

// 5. Check for saved data on load and restore the controls and appearance.

// PSEUDOCODE:
// look for saved data in Local Storage
// if nothing is saved
//   keep the Forest/Cards look and show a welcome message
// otherwise
//   parse the saved object
//   set both dropdowns to the saved values
//   apply the theme and layout to the page
//   tell the visitor their choices were restored

function loadPreferences() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData === null) {
    statusMessage.textContent = "No saved preferences yet. Choose a theme and layout to make this collection yours.";
    return;
  }

  const preferences = JSON.parse(savedData);

  themeSelect.value = preferences.theme;
  layoutSelect.value = preferences.layout;

  applyTheme(preferences.theme);
  applyLayout(preferences.layout);

  statusMessage.textContent = "Your saved preferences have been restored.";
}

loadPreferences();

// Add short pseudocode comments