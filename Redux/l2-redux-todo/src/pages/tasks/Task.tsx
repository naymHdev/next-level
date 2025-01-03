import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectTasks, updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Task = () => {
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className=" mx-auto max-w-7xl px-5 mt-20">
        <div className=" flex items-center justify-between">
          <h3 className=" font-bold text-lg">My Task:</h3>

          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                onClick={() => dispatch(updateFilter("All"))}
                value="All"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                onClick={() => dispatch(updateFilter("Medium"))}
                value="Medium"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger
                onClick={() => dispatch(updateFilter("High"))}
                value="High"
              >
                High
              </TabsTrigger>
              <TabsTrigger
                onClick={() => dispatch(updateFilter("Low"))}
                value="Low"
              >
                Low
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <AddTaskModal />
        </div>

        <div className=" space-y-5 mt-5">
          {tasks?.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
