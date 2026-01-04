document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('personas-table-body')) {
        const tableBody = document.getElementById('personas-table-body');
        personas.forEach(persona => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${persona.nombre}</td>
                <td>${persona.email}</td>
                <td>${persona.oficina}</td>
                <td>
                    <button class=\"btn btn-sm btn-primary\">Editar</button>
                    <button class=\"btn btn-sm btn-danger\">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (document.getElementById('oficinas-table-body')) {
        const tableBody = document.getElementById('oficinas-table-body');
        oficinas.forEach(oficina => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${oficina.denominacion}</td>
                <td>
                    <button class=\"btn btn-sm btn-primary\">Editar</button>
                    <button class=\"btn btn-sm btn-danger\">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const applyTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = 'Modo Claro';
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.textContent = 'Modo Oscuro';
        }
    };

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        applyTheme(isDarkMode);
    });

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(savedDarkMode);
});
