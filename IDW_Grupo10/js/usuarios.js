document.addEventListener("DOMContentLoaded", async () => {
  const tableUsuariosBody = document.querySelector("#tablausuarios tbody");

  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Error al listar usuarios");
    }

    const data = await response.json();
    const usuarios = data.users;

    usuarios.forEach((element) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${element.firstName}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
      `;
      tableUsuariosBody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
