import { ITask } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  task: ITask[];
}

const initialState: IInitialState = {
  task: [
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
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
