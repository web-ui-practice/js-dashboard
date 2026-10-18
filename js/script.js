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
  },
];

const tableBody = document.querySelector(".table-body");
const searchingInput = document.querySelector(".searching-input");
const statusSelect = document.querySelector(".searching-selector");
const showing = document.querySelector(".text-table");
function getModalElements() {
  return {
    dialog: document.querySelector(".modal"),
    name: document.querySelector("#modal-name"),
    email: document.querySelector("#modal-email"),
    role: document.querySelector("#modal-role"),
    initials: document.querySelector("#modal-initials"),
    status: document.querySelector("#modal-status"),
    memberSince: document.querySelector("#modal-member-since"),
    lastActive: document.querySelector("#modal-last-active"),
    closeIcon: document.querySelector("#modal-close"),
    closeButton: document.querySelector("#modal-close-button"),
  };
}

const modal = getModalElements();

searchingInput.addEventListener("input", applyFilters);
statusSelect.addEventListener("change", applyFilters);
modal.closeIcon.addEventListener("click", () => modal.dialog.close());
modal.closeButton.addEventListener("click", () => modal.dialog.close());
modal.dialog.addEventListener("click", function (event) {
  if (event.target === modal.dialog) {
    modal.dialog.close();
  }
});

function getInitials(name) {
  return name
    .split(" ")
    .map(function (word) {
      return word[0];
    })
    .join("");
}

function openUserModal(user) {
  modal.status.className = `user-status user-status--${user.status}`;
  modal.initials.textContent = getInitials(user.name);
  modal.name.textContent = user.name;
  modal.email.textContent = user.email;
  modal.role.textContent = user.role;
  modal.status.textContent = user.status;
  modal.memberSince.textContent = user.memberSince;
  modal.lastActive.textContent = user.lastActive;
  modal.dialog.showModal();
}

function renderUsers(list) {
  tableBody.innerHTML = "";
  list.forEach(function (user) {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `<tr tabindex="0">
        <td>
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
        </td>
      </tr>`,
    );

    const row = tableBody.lastElementChild;

    row.addEventListener("click", () => {
      openUserModal(user);
    });
    row.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        openUserModal(user);
      }
    });
  });
}

applyFilters();

function applyFilters() {
  const status = statusSelect.value;
  const query = searchingInput.value.toLowerCase();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);
    const matchesStatus = status === "" || user.status === status;
    return matchesSearch && matchesStatus;
  });
  renderUsers(filteredUsers);

  showing.textContent = `Showing ${filteredUsers.length} of ${users.length} users`;
}
