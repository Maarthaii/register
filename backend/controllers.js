  const formulario = document.getElementById("form-persona");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(formulario);

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      });
  });
