import { RootState } from "@/redux/store";
import { ITask, TFilter, TPriority } from "@/types/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  tasks: ITask[];
  filter: TFilter;
}

const initialState: IInitialState = {
  tasks: [
    {
      id: "109272918",
      title: "initialiZe front-end",
      description: "Create home page, and routing",
      dueDate: "2025-11",
      assignedTo: null,
      isCompleted: false,
      priority: "High",
    },
    {
      id: "0921373273",
      title: "Create github repo",
      description: "Create home page, and routing",
      dueDate: "2025-13",
      assignedTo: null,
      isCompleted: false,
      priority: "Medium",
    },
    {
      id: "982368327",
      title: "Create Medium Blogs",
      description: "Create home page, and routing",
      dueDate: "2025-13",
      assignedTo: null,
      isCompleted: false,
      priority: "Low",
    },
  ],
  filter: "All",
};

type TDraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority" | "assignedTo"
>;

const createTask = (taskData: TDraftTask) => {
  return {
    ...taskData,
    id: nanoid(),
    isCompleted: false,
    assignedTo: taskData.assignedTo ? taskData.assignedTo : null,
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },

    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateFilter: (state, action: PayloadAction<TPriority>) => {
      state.filter = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;

  if (filter == "Low") {
    return state.todo.tasks.filter((task) => task.priority == "Low");
  } else if (filter == "Medium") {
    return state.todo.tasks.filter((task) => task.priority == "Medium");
  } else if (filter == "High") {
    return state.todo.tasks.filter((task) => task.priority == "High");
  } else {
    return state?.todo.tasks;
  }
};

export const { addTask, toggleCompleteState, deleteTask, updateFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
