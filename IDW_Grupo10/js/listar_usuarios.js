document.addEventListener('DOMContentLoaded', async() =>{
    const tablaUsuarios = document.querySelector('#tablaUsuarios tbody')

    try {
        const response = await fetch('https://dummyjson.com/users');
        if(response.ok){
            const data = await response.json();
            const usuarios = data.users;

            usuarios.forEach(element => {
                const fila = document.createElement('tr');
                fila.innerHTML =  `
                    <td>${element.lastName} ${element.firstName}</td>
                    <td>${element.username}</td>
                    <td>${element.email}</td>
                    <td>${element.phone}</td>
                
        `;
        tablaUsuarios.appendChild(fila);                
            });

        }else{
            console.error(response.estatus);
            throw Error('Error al listar');
        }

    }catch{
        console.error(response.estatus);
        throw Error('Error de API');

    }
})