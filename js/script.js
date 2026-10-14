const users = [
    {
        name: "Maya Chen",
        email: "maya.chen@acme.example",
        role: "Admin",
        status: "active",
    },

    {
        name: "Oliver Grant",
        email: "oliver.grant@acme.example",
        role: "Editor",
        status: "active",
    },

    {
        name: "Sofia Patel",
        email: "sofia.patel@acme.example",
        role: "Editor",
        status: "active",
    },

    {
        name: "Lucas Reed",
        email: "lucas.reed@acme.example",
        role: "Viewer",
        status: "inactive",
    },

    {
        name: "Amara Okafor",
        email: "amara.okafor@acme.example",
        role: "Viewer",
        status: "active",
    },

    {
        name: "Noah Kim",
        email: "noah.kim@acme.example",
        role: "Editor",
        status: "inactive",
    }
];

const tableBody = document.querySelector(".table-body");
const searchingInput = document.querySelector('.searching-input');
const statusSelect = document.querySelector('.searching-selector');

function getInitials(name) {
   return name.split(" ").map(function (word) {
   return word[0]
   }).join("")
};

function renderUsers(list) {
    tableBody.innerHTML = ""
    list.forEach(function(user){
     const row = document.createElement('tr');
     row.innerHTML = `<td>
                  <div class="user-container">
                    <span class="user-avatar">${getInitials(user.name)}</span>
                    <div class="user-info">
                      <span class="user-name">${user.name}</span>
                      <span class="user-email">${user.email}</span>
                    </div>
                  </div>
                </td>
                <td class="user-role">${user.role}</td>
                <td>
                  <span class="user-status user-status--${user.status}">${user.status}</span>
                </td>`;
     tableBody.append(row)
    });
}

renderUsers(users)


function applyFilters() {
    const status = statusSelect.value
    const query = searchingInput.value.toLowerCase()
    
    const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const matchesStatus = status === "" || user.status === status
    return matchesSearch && matchesStatus
})
    renderUsers(filteredUsers)
}

searchingInput.addEventListener("input",applyFilters);

statusSelect.addEventListener("change",applyFilters)
