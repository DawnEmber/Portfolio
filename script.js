// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Cursor follow effect
  const cursor = document.getElementById("cursor");
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Card hover effect
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Form navigation on Enter key
  const inputIds = ["name", "mail", "mbl", "msg"];
  inputIds.forEach((id, index) => {
    const input = document.getElementById(id);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();

        const nextId = inputIds[index + 1];
        if (nextId) {
          document.getElementById(nextId).focus();
        } else {
          // Get current input values
          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("mail").value.trim();
          const mobile = document.getElementById("mbl").value.trim();
          const message = document.getElementById("msg").value.trim();

          // Validate before sending
          if (!name || !email || !mobile || !message) {
            formalert();
            return;
          }
          sendThnx();
          clearForm();
        }
      }
    });
  });

  // Small mobile Nav bar 
  let bur = document.getElementById("top-sm-bur")
  let cls = document.getElementById("top-sm-cls")
  let nav = document.querySelector("#sml-nav ul")
  let lst = document.querySelectorAll("#sml-nav ul li a")
  bur.addEventListener("click", () => {
    bur.style.display = "none"
    cls.style.display = "flex"
    nav.style.display = "initial"
  });
  cls.addEventListener("click", () => {
    cls.style.display = "none"
    bur.style.display = "flex"
    nav.style.display = "none"
  });
  lst.forEach(link => {
  link.addEventListener("click", () => {
    nav.style.display = "none";
    cls.style.display = "none"
    bur.style.display = "flex"
  });
});
});

// Modal functions
function formalert() {
  document.getElementById("customAlert").style.display = "flex";
}
function send_btn(){
  document.getElementById("confirm-bar").style.display = "flex";
}

function alertclose() {
  document.getElementById("customAlert").style.display = "none";
}
function closeModal() {
  document.getElementById("confirm-bar").style.display = "none";
}

// Clear form fields
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("mbl").value = "";
  document.getElementById("msg").value = "";
}

// Print form data to console (optional)
function getFormData() {
 
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("mail").value.trim();
  const mobile = document.getElementById("mbl").value.trim();
  const message = document.getElementById("msg").value.trim();

  // Validate before sending
  if (!name || !email || !mobile || !message) {
    formalert();
    return;
  }
  sendThnx();
  clearForm();

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Mobile:", mobile);
  console.log("Message:", message);
}

// Send email via EmailJS
function sendThnx() {
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("mail").value,
    mobile: document.getElementById("mbl").value,
    message: document.getElementById("msg").value,
  };

  // Send two emails (as in your original code)
  emailjs.send("service_6ldlxe6", "template_bh9fjze", params)
    .then(send_btn())
    .catch((error) => console.error("Email sending failed:", error));

  emailjs.send("service_6ldlxe6", "template_0kp6x03", params)
    .catch((error) => console.error("Second email failed:", error));
}



