import { RootState } from "@/redux/store";
import { ITask } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

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

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const selectTasks = (state: RootState) => {
  return state?.todo.tasks;
};

export default taskSlice.reducer;
