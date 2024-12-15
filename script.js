// Mock data arrays
const users = [];
const roles = [];
const permissions = ["Read", "Write", "Delete"];

// Helper functions to update tables
const updateUserTable = () => {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}">${user.status}</span></td>
            <td>
                <button class="btn btn-info btn-sm action-btn" onclick="editUser(${index})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm action-btn" onclick="deleteUser(${index})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

const updateRoleTable = () => {
    const tbody = document.getElementById('roleTableBody');
    tbody.innerHTML = '';
    roles.forEach((role, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${role.name}</td>
            <td>${role.permissions.join(', ')}</td>
            <td>
                <button class="btn btn-info btn-sm action-btn" onclick="editRole(${index})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm action-btn" onclick="deleteRole(${index})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

const updatePermissionTable = () => {
    const tbody = document.getElementById('permissionTableBody');
    tbody.innerHTML = '';
    permissions.forEach((permission, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${permission}</td>
            <td>Permission for user actions</td>
        `;
        tbody.appendChild(row);
    });
};

// Event listener for adding a user
document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const role = document.getElementById('userRole').value;
    const status = document.getElementById('userStatus').value;

    // Add user to the mock users array
    users.push({ name, email, role, status });
    updateUserTable();
    
    // Close the modal
    document.getElementById('addUserModal').querySelector('button.btn-close').click();
});

// Event listener for adding a role
document.getElementById('addRoleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const roleName = document.getElementById('roleName').value;
    const rolePermissions = Array.from(document.getElementById('rolePermissions').selectedOptions).map(opt => opt.value);

    // Add role to the mock roles array
    roles.push({ name: roleName, permissions: rolePermissions });
    updateRoleTable();

    // Close the modal
    document.getElementById('addRoleModal').querySelector('button.btn-close').click();
});

// Function to edit a user
const editUser = (index) => {
    const user = users[index];
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;
    document.getElementById('userStatus').value = user.status;
    // Open the modal to edit user details (you can customize the modal)
    const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));
    addUserModal.show();
    
    // Update submit action for editing
    const addUserForm = document.getElementById('addUserForm');
    addUserForm.onsubmit = (e) => {
        e.preventDefault();
        user.name = document.getElementById('userName').value;
        user.email = document.getElementById('userEmail').value;
        user.role = document.getElementById('userRole').value;
        user.status = document.getElementById('userStatus').value;
        updateUserTable();
        addUserModal.hide();
    };
};

// Function to delete a user
const deleteUser = (index) => {
    users.splice(index, 1);
    updateUserTable();
};

// Function to edit a role
const editRole = (index) => {
    const role = roles[index];
    document.getElementById('roleName').value = role.name;
    const rolePermissions = document.getElementById('rolePermissions');
    for (let option of rolePermissions.options) {
        option.selected = role.permissions.includes(option.value);
    }
    // Open the modal to edit role details
    const addRoleModal = new bootstrap.Modal(document.getElementById('addRoleModal'));
    addRoleModal.show();
    
    // Update submit action for editing
    const addRoleForm = document.getElementById('addRoleForm');
    addRoleForm.onsubmit = (e) => {
        e.preventDefault();
        role.name = document.getElementById('roleName').value;
        role.permissions = Array.from(document.getElementById('rolePermissions').selectedOptions).map(opt => opt.value);
        updateRoleTable();
        addRoleModal.hide();
    };
};

// Function to delete a role
const deleteRole = (index) => {
    roles.splice(index, 1);
    updateRoleTable();
};

// Initial data population
updateUserTable();
updateRoleTable();
updatePermissionTable();
