const bgDesktopDark = document.querySelector(".bg-desktop-dark");
const bgMobileDark = document.querySelector(".bg-mobile-dark");
const toggleTheme = document.getElementById("toggle-theme");
const iconSun = document.querySelector(".icon-sun");
const iconMoon = document.querySelector(".icon-moon");
const radioBtn = document.querySelectorAll(".radio");
const radioBtnActive = document.querySelectorAll(".radio-active");
const iconCheck = document.querySelectorAll(".icon-check");
const addTodo = document.querySelector(".add-todo");
const todosList = document.querySelector(".todos");
const todoItem = document.querySelectorAll(".todo-item");
const todo = document.querySelectorAll(".todo");
const removeTodo = document.querySelectorAll(".icon-cross");
const itemsLeft = document.querySelector(".items-left");
const state = document.querySelectorAll(".state");
const clearCompleted = document.querySelector(".clear-completed");

const bgDesktopLight = document.createElement("div");
bgDesktopLight.classList.add("bg-image-style");
bgDesktopLight.innerHTML = `<img style="width: 100%; height: 100%;" src="images/bg-desktop-light.jpg" class="bg-desktop-light" alt="Bg Desktop Light">`;

const bgMobileLight = document.createElement("div");
bgMobileLight.classList.add("bg-image-style");
bgMobileLight.innerHTML = `<img style="width: 100%; height: 100%;" src="images/bg-mobile-light.jpg" class="bg-mobile-light" alt="Bg Mobile Light">`;

for (let i = 0; i < todo.length; i++) {
  todo[i].addEventListener("mouseover", () => {
    {
      removeTodo[i].style.display = "block";
      removeTodo[i].addEventListener("mouseover", () => {
        removeTodo[i].style.display = "block";
      });

      removeTodo[i].addEventListener("mouseout", () => {
        removeTodo[i].style.display = "none";
      });
    }
  });
  todo[i].addEventListener("mouseout", () => {
    {
      removeTodo[i].style.display = "none";
    }
  });
}

let theme = localStorage.getItem("theme");

if (theme == null) {
  setTheme("dark");
} else {
  setTheme(theme);
}

let themePoints = document.getElementsByClassName("icon");

for (let i = 0; themePoints.length > i; i++) {
  themePoints[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == "light") {
    toggleTheme.href = "light-theme.css";
    iconSun.style.display = "none";
    iconMoon.style.display = "block";
    bgDesktopDark.replaceWith(bgDesktopLight);
    bgMobileDark.replaceWith(bgMobileLight);
  }
  if (mode == "dark") {
    toggleTheme.href = "style.css";
    iconMoon.style.display = "none";
    iconSun.style.display = "block";
    bgDesktopLight.replaceWith(bgDesktopDark);
    bgMobileLight.replaceWith(bgMobileDark);
  }

  localStorage.setItem("theme", mode);
}

let idx = 6;

function addScrollBar() {
  if (idx <= 6) {
    todosList.style.height = "auto";
    todosList.style.overflow = "hidden";
  } else if (idx > 6) {
    todosList.style.height = "396px";
    todosList.style.overflowY = "scroll";
  }
}

function addNewTodo() {
  const newTodoItem = document.createElement("li");
  newTodoItem.classList.add("todo-item");
  newTodoItem.innerHTML = `
  <div class="radio"></div>
  <div class="radio-active add-radio-bg">
      <img src="images/icon-check.svg" class="icon-check" alt="Icon Check">
  </div>
  <p class="todo"></p>
  <img
    src="images/icon-cross.svg"
    class="icon-cross"
    alt="Icon Cross"
  />
`;
  const newTodo = newTodoItem.querySelector(".todo");
  const newRadioBtn = newTodoItem.querySelector(".radio");
  const newRadioBtnActive = newTodoItem.querySelector(".radio-active");
  const newTodoRemove = newTodoItem.querySelector(".icon-cross");

  if (addTodo.value != "") {
    newTodo.innerText = addTodo.value;
    todosList.appendChild(newTodoItem);
  } else if (addTodo.value === "") {
    inactiveBtns--;
    idx--;
  }

  inactiveBtns++;
  itemsLeft.innerText = `${inactiveBtns} items left`;

  newTodo.addEventListener("mouseover", () => {
    {
      newTodoRemove.style.display = "block";
      newTodoRemove.addEventListener("mouseover", () => {
        newTodoRemove.style.display = "block";
      });

      newTodoRemove.addEventListener("mouseout", () => {
        newTodoRemove.style.display = "none";
      });
    }
  });
  newTodo.addEventListener("mouseout", () => {
    {
      newTodoRemove.style.display = "none";
    }
  });

  newTodoItem.style.backgroundColor = "inherit";

  newRadioBtn.addEventListener("click", () => {
    newTodo.style.color = "var(--footer-text)";
    newTodo.style.textDecoration = "line-through";
    newTodo.addEventListener("mouseover", () => {
      newTodoRemove.style.display = "none";
    });
    newTodoItem.style.backgroundColor = "var(--list-bg)";

    inactiveBtns--;
    itemsLeft.innerText = `${inactiveBtns} items left`;

    clearCompleted.addEventListener("click", () => {
      newTodoItem.style.display = "none";

      // ALL
      state[0].addEventListener("click", () => {
        newTodoItem.style.display = "none";
      });
    });

    newRadioBtn.style.display = "none";
    newRadioBtnActive.style.display = "grid";
    iconCheck.style.display = "block";
  });

  newRadioBtnActive.addEventListener("click", () => {
    newTodo.style.color = "var(--text)";
    newTodo.style.textDecoration = "none";
    newTodo.addEventListener("mouseover", () => {
      newTodoRemove.style.display = "block";
    });
    newTodoItem.style.backgroundColor = "inherit";

    inactiveBtns++;
    itemsLeft.innerText = `${inactiveBtns} items left`;

    clearCompleted.addEventListener("click", () => {
      newTodoItem.style.display = "flex";
    });

    newRadioBtn.style.display = "block";
    newRadioBtnActive.style.display = "none";
  });

  newTodoRemove.addEventListener("click", () => {
    newTodoItem.style.display = "none";
    inactiveBtns--;
    idx--;
    addScrollBar();
    itemsLeft.innerText = `${inactiveBtns} items left`;

    // ALL
    state[0].addEventListener("click", () => {
      newTodoItem.style.display = "none";
    });

    // ACTIVE
    state[1].addEventListener("click", () => {
      newTodoItem.style.display = "none";
    });
  });

  // ALL
  state[0].addEventListener("click", () => {
    newTodoItem.style.display = "flex";
  });

  // ACTIVE
  state[1].addEventListener("click", () => {
    if (newTodoItem.style.backgroundColor === "var(--list-bg)") {
      newTodoItem.style.display = "none";
    } else if (newTodoItem.style.backgroundColor === "inherit") {
      newTodoItem.style.display = "flex";
    }
  });

  // COMPLETED
  state[2].addEventListener("click", () => {
    if (newTodoItem.style.backgroundColor === "var(--list-bg)") {
      newTodoItem.style.display = "flex";
    } else if (newTodoItem.style.backgroundColor === "inherit") {
      newTodoItem.style.display = "none";
    }
  });

  newTodoItem.addEventListener("drag", () => {
    newTodoItem.style.opacity = "0.25";
  });

  newTodoItem.addEventListener("drop", () => {
    newTodoItem.style.opacity = "1";
  });
}

radioBtn[0].addEventListener("click", () => {
  addNewTodo();
  idx++;
  addScrollBar();

  addTodo.value = "";
});

addTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
    idx++;
    addScrollBar();

    e.target.value = "";
  }
});

radioBtn[1].style.display = "none";
radioBtnActive[1].style.display = "grid";
todoItem[0].style.backgroundColor = "var(--list-bg)";
todo[0].addEventListener("mouseover", () => {
  removeTodo[0].style.display = "none";
});
clearCompleted.addEventListener("click", () => {
  todoItem[0].style.display = "none";

  // ALL
  state[0].addEventListener("click", () => {
    todoItem[0].style.display = "none";
  });
});

let inactiveBtns = radioBtn.length - 2;

clearCompleted.addEventListener("click", () => {
  idx = inactiveBtns;
  addScrollBar();
});

for (let i = 0; i < radioBtn.length; i++) {
  radioBtn[i].addEventListener("click", () => {
    radioBtn[i].style.display = "none";
    radioBtnActive[i].style.display = "grid";
    iconCheck[i].style.display = "block";
  });

  radioBtnActive[i].addEventListener("click", () => {
    radioBtn[i].style.display = "block";
    radioBtnActive[i].style.display = "none";
  });

  removeTodo[i].addEventListener("click", () => {
    todoItem[i].style.display = "none";
    inactiveBtns--;
    idx--;
    addScrollBar();
    itemsLeft.innerText = `${inactiveBtns} items left`;

    // ALL
    state[0].addEventListener("click", () => {
      todoItem[i].style.display = "none";
    });

    // ACTIVE
    state[1].addEventListener("click", () => {
      todoItem[i].style.display = "none";
    });
  });

  radioBtn[i + 1].addEventListener("click", () => {
    todo[i].style.color = "var(--footer-text)";
    todo[i].style.textDecoration = "line-through";
    todo[i].addEventListener("mouseover", () => {
      removeTodo[i].style.display = "none";
    });
    todoItem[i].style.backgroundColor = "var(--list-bg)";
    inactiveBtns--;
    itemsLeft.innerText = `${inactiveBtns} items left`;

    clearCompleted.addEventListener("click", () => {
      todoItem[i].style.display = "none";

      // ALL
      state[0].addEventListener("click", () => {
        todoItem[i].style.display = "none";
      });
    });

    todoItem[0].addEventListener("drag", () => {
      todo[i].style.color = "var(--footer-text)";
      todo[i].style.textDecoration = "line-through";
    });

    todoItem[i].addEventListener("drag", () => {
      todo[i].style.color = "var(--footer-text)";
      todo[i].style.textDecoration = "line-through";
    });
  });

  radioBtnActive[i + 1].addEventListener("click", () => {
    todo[i].style.color = "var(--text)";
    todo[i].style.textDecoration = "none";
    todo[i].addEventListener("mouseover", () => {
      removeTodo[i].style.display = "block";
    });
    todoItem[i].style.backgroundColor = "inherit";
    inactiveBtns++;
    itemsLeft.innerText = `${inactiveBtns} items left`;

    clearCompleted.addEventListener("click", () => {
      todoItem[i].style.display = "flex";
    });

    todoItem[0].addEventListener("drag", () => {
      todo[i].style.color = "var(--text)";
      todo[i].style.textDecoration = "none";
    });

    todoItem[i].addEventListener("drag", () => {
      todo[i].style.color = "var(--text)";
      todo[i].style.textDecoration = "none";
    });
  });

  // ALL
  state[0].addEventListener("click", () => {
    todoItem[i].style.display = "flex";
    state[0].classList.add("active");

    state[1].classList.remove("active");
    state[2].classList.remove("active");
  });

  // ACTIVE
  state[1].addEventListener("click", () => {
    if (todoItem[i].style.backgroundColor === "var(--list-bg)") {
      todoItem[i].style.display = "none";
    } else if (todoItem[i].style.backgroundColor === "inherit") {
      todoItem[i].style.display = "flex";
    }

    state[1].classList.add("active");

    state[0].classList.remove("active");
    state[2].classList.remove("active");
  });

  // COMPLETED
  state[2].addEventListener("click", () => {
    if (todoItem[i].style.backgroundColor === "var(--list-bg)") {
      todoItem[i].style.display = "flex";
    } else if ((todoItem[i].style.backgroundColor = "inherit")) {
      todoItem[i].style.display = "none";
    }

    state[2].classList.add("active");

    state[0].classList.remove("active");
    state[1].classList.remove("active");
  });

  new Sortable(todosList);

  todoItem[i].addEventListener("drag", () => {
    todoItem[i].style.opacity = "0.25";
  });

  todoItem[i].addEventListener("drop", () => {
    todoItem[i].style.opacity = "1";
  });

  todoItem[0].addEventListener("drag", () => {
    todo[0].style.color = "var(--footer-text)";
    todo[0].style.textDecoration = "line-through";

    todo[i + 1].style.color = "var(--text)";
    todo[i + 1].style.textDecoration = "none";
  });

  todoItem[i].addEventListener("drag", () => {
    todo[i].style.color = "var(--text)";
    todo[i].style.textDecoration = "none";

    todo[0].style.color = "var(--footer-text)";
    todo[0].style.textDecoration = "line-through";
  });

  radioBtnActive[1].addEventListener("click", () => {
    todoItem[i + 1].addEventListener("drag", () => {
      todo[i].style.color = "var(--text)";
      todo[i].style.textDecoration = "none";

      todo[0].style.color = "var(--text)";
      todo[0].style.textDecoration = "none";
    });
  });
}
