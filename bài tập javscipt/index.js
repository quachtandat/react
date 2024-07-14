// Định nghĩa các phần tử DOM cần sử dụng
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Biến để lưu trữ danh sách công việc
let tasks = [];

// Hàm để render lại danh sách công việc
function renderTasks() {
  // Xóa hết các công việc hiện tại
  taskList.innerHTML = '';

  // Duyệt qua mảng tasks và thêm từng công việc vào danh sách
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem');
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskItem.innerHTML = `
      <span>${task.title}</span>
      <button class="deleteBtn" onclick="deleteTask(${index})">Xóa</button>
      <button class="editBtn" onclick="editTask(${index})">Sửa</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Hàm để thêm công việc mới
function addTask(event) {
  event.preventDefault(); // Ngăn chặn form submit

  const taskTitle = taskInput.value.trim(); // Lấy nội dung công việc

  if (taskTitle !== '') {
    const newTask = {
      title: taskTitle,
      completed: false
    };
    tasks.push(newTask); // Thêm công việc vào mảng tasks
    taskInput.value = ''; // Đặt lại giá trị của input thành rỗng
    renderTasks(); // Render lại danh sách công việc
  }
}

// Hàm để xóa công việc
function deleteTask(index) {
  tasks.splice(index, 1); // Xóa công việc khỏi mảng tasks
  renderTasks(); // Render lại danh sách công việc
}

// Hàm để sửa công việc
function editTask(index) {
  const newTitle = prompt('Nhập nội dung mới cho công việc:');
  if (newTitle !== null && newTitle.trim() !== '') {
    tasks[index].title = newTitle.trim();
    renderTasks(); // Render lại danh sách công việc sau khi sửa
  }
}

// Hàm để tìm kiếm công việc
function searchTasks(keyword) {
  const filteredTasks = tasks.filter(task => {
    return task.title.toLowerCase().includes(keyword.toLowerCase());
  });

  // Hiển thị lại danh sách công việc đã lọc
  taskList.innerHTML = '';
  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem');
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskItem.innerHTML = `
      <span>${task.title}</span>
      <button class="deleteBtn" onclick="deleteTask(${index})">Xóa</button>
      <button class="editBtn" onclick="editTask(${index})">Sửa</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Gắn sự kiện submit cho form để thêm công việc
taskForm.addEventListener('submit', addTask);

// Gắn sự kiện input cho ô nhập để tìm kiếm
taskInput.addEventListener('input', () => {
  const keyword = taskInput.value.trim();
  if (keyword !== '') {
    searchTasks(keyword);
  } else {
    renderTasks(); // Nếu không có từ khóa, hiển thị lại danh sách gốc
  }
});

// Khởi tạo danh sách công việc ban đầu từ HTML
document.addEventListener('DOMContentLoaded', () => {
  const initialTasks = taskList.querySelectorAll('li');
  initialTasks.forEach((taskElement) => {
    const taskTitle = taskElement.textContent.trim();
    tasks.push({ title: taskTitle, completed: false });
  });

  // Hiển thị danh sách công việc ban đầu
  renderTasks();
});
