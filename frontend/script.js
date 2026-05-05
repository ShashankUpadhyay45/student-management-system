const API = "http://localhost:5000/api/students";

let students = [];
let editId = null;

const token = localStorage.getItem("token");

// 🚫 Redirect if not logged in
if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// 🔹 Load students
async function loadStudents() {
  try {
    const res = await fetch(API, {
      headers: { Authorization: token }
    });

    // 🔐 Session expired check
    if (res.status === 401 || res.status === 403) {
      alert("Session expired. Please login again.");
      logout();
      return;
    }

    const data = await res.json();
    students = data;
    render(students);

  } catch (err) {
    console.error("Load error:", err);
  }
}

// 🔹 Add / Update student
document.getElementById("studentForm").onsubmit = async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value
  };

  console.log("Sending:", data);

  try {
    const res = await fetch(editId ? `${API}/${editId}` : API, {
      method: editId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    });

    // 🔐 Session expired check
    if (res.status === 401 || res.status === 403) {
      alert("Session expired. Please login again.");
      logout();
      return;
    }

    console.log("Status:", res.status);

    const result = await res.json();
    console.log("Response:", result);

    editId = null;
    document.getElementById("studentForm").reset();

    loadStudents();

  } catch (err) {
    console.error("Submit error:", err);
  }
};

// 🔹 Delete student
async function del(id) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });

    if (res.status === 401 || res.status === 403) {
      alert("Session expired");
      logout();
      return;
    }

    loadStudents();

  } catch (err) {
    console.error("Delete error:", err);
  }
}

// 🔹 Edit student
function edit(id, nameVal, emailVal, ageVal) {
  document.getElementById("name").value = nameVal;
  document.getElementById("email").value = emailVal;
  document.getElementById("age").value = ageVal;

  editId = id;
}

// 🔹 Render table
function render(data) {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  data.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.age}</td>
        <td>
          <button onclick="edit(${s.id}, '${s.name}', '${s.email}', ${s.age})">Edit</button>
          <button onclick="del(${s.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// 🔹 Search
document.getElementById("search").oninput = (e) => {
  const q = e.target.value.toLowerCase();

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q)
  );

  render(filtered);
};

// 🔹 Sorting
function sortByName() {
  const sorted = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  render(sorted);
}

function sortByAge() {
  const sorted = [...students].sort((a, b) =>
    a.age - b.age
  );
  render(sorted);
}

// 🔹 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// 🔹 Initial load
loadStudents();