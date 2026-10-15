const users = [
    {
        name: "Maya Chen",
        email: "maya.chen@acme.example",
        role: "Admin",
        status: "active",
        memberSince: "Sep 12, 2025",
        lastActive: "Today, 9:41 AM",
    },

    {
        name: "Oliver Grant",
        email: "oliver.grant@acme.example",
        role: "Editor",
        status: "active",
        memberSince: "Oct 10, 2025",
        lastActive: "Today, 8:31 PM",
    },

    {
        name: "Sofia Patel",
        email: "sofia.patel@acme.example",
        role: "Editor",
        status: "active",
        memberSince: "Sep 8, 2025",
        lastAcrive: "Yesterday, 8:24 AM",
    },

    {
        name: "Lucas Reed",
        email: "lucas.reed@acme.example",
        role: "Viewer",
        status: "inactive",
        memberSince: "Nov 15, 2025",
        lastActive: "Today, 9:37 AM",
    },

    {
        name: "Amara Okafor",
        email: "amara.okafor@acme.example",
        role: "Viewer",
        status: "active",
        memberSince: "Sep 26, 2025",
        lastActive: "Today, 12:19 AM",
    },

    {
        name: "Noah Kim",
        email: "noah.kim@acme.example",
        role: "Editor",
        status: "inactive",
        memberSince: "Oct 28, 2025",
        lastActive: "Yesterday, 10:15 PM",
    }
];

const tableBody = document.querySelector(".table-body");
const searchingInput = document.querySelector('.searching-input');
const statusSelect = document.querySelector('.searching-selector');
const showing = document.querySelector('.text-table');
const modal = document.querySelector('.modal');
const modalInitials = document.querySelector('#modal-initials');
const modalName = document.querySelector('#modal-name');
const modalEmail = document.querySelector('#modal-email');
const modalRole = document.querySelector('#modal-role');
const modalStatus = document.querySelector('#modal-status');
const modalMemberSince = document.querySelector('#modal-member-since');
const modalLastActive = document.querySelector('#modal-last-active');



function getInitials(name) {
   return name.split(" ").map(function (word) {
   return word[0]
   }).join("")
};

function openUserModal (user) {
 modalStatus.className = `user-status user-status--${user.status}`;
 modalInitials.textContent = getInitials(user.name);
 modalName.textContent = user.name;
 modalEmail.textContent = user.email;
 modalRole.textContent = user.role;
 modalStatus.textContent = user.status;
 modalMemberSince.textContent = user.memberSince;
 modalLastActive.textContent = user.lastActive;
 modal.showModal()
}

function renderUsers(list) {
    tableBody.innerHTML = ""
    list.forEach(function(user){
     const row = document.createElement('tr');
     row.addEventListener("click", () => {
        openUserModal(user)
     })
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

applyFilters()

function applyFilters() {
    const status = statusSelect.value
    const query = searchingInput.value.toLowerCase()

    const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const matchesStatus = status === "" || user.status === status
    return matchesSearch && matchesStatus
})
    renderUsers(filteredUsers)
    
    showing.textContent = `Showing ${filteredUsers.length} of ${users.length} users`;
}

searchingInput.addEventListener("input",applyFilters);

statusSelect.addEventListener("change",applyFilters)

