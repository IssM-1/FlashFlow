// ====================
// CONFIG SUPABASE
// ====================

const supabaseUrl = "https://erwcogmwyxkndohkbmgz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyd2NvZ213eXhrbmRvaGtibWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDA4MTksImV4cCI6MjA5NzExNjgxOX0.ZZfV7hFM8j2jJOTMnjo1DZFHxtu7ma-A5-e89MjAY3g";

const { createClient } = supabase;

const db = createClient(
  supabaseUrl,
  supabaseKey
);

// ====================
// ELEMENTS HTML
// ====================

const addButton =
  document.getElementById("addSubject");

const subjectsContainer =
  document.getElementById("subjects");

// ====================
// AJOUTER UNE MATIERE
// ====================

addButton.addEventListener(
  "click",
  async () => {

    const name =
      prompt("Nom de la matière");

    if (!name) return;

    const { error } =
      await db
        .from("subjects")
        .insert([
          {
            name: name
          }
        ]);

    if (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
      return;
    }

    loadSubjects();
  }
);

// ====================
// CHARGER LES MATIERES
// ====================

async function loadSubjects() {

  const { data, error } =
    await db
      .from("subjects")
      .select("*");

  if (error) {
    console.error(error);
    return;
  }

  subjectsContainer.innerHTML = "";

  data.forEach(subject => {

    const card =
      document.createElement("div");

    card.className =
      "subject-card";

    card.innerHTML = `
      <h3>${subject.name}</h3>
    `;

    subjectsContainer.appendChild(card);
  });
}

loadSubjects();