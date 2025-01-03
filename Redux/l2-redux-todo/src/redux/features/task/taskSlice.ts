import { RootState } from "@/redux/store";
import { ITask } from "@/types/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  tasks: ITask[];
}

const initialState: IInitialState = {
  tasks: [
    {
      id: "109272918",
      title: "initialiZe front-end",
      description: "Create home page, and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "0921373273",
      title: "Create github repo",
      description: "Create home page, and routing",
      dueDate: "2025-13",
      isCompleted: false,
      priority: "Medium",
    },
    {
      id: "982368327",
      title: "Create Medium Blogs",
      description: "Create home page, and routing",
      dueDate: "2025-13",
      isCompleted: false,
      priority: "Low",
    },
  ],
};

type TDraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: TDraftTask) => {
  return {
    id: nanoid(),
    isCompleted: false,
    ...taskData,
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
      console.log("action", action);

      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const selectTasks = (state: RootState) => {
  return state?.todo.tasks;
};

export const { addTask, toggleCompleteState, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
