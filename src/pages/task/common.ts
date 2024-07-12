import { createContext } from "react";
import { getBatchState } from "../../apis/task";
import { TASK_STATUS } from "../../utils/constant";

export type Task = {
  id: number;
  name: string;
  pipeline_name: string;
  create_time: string;
  update_time: string;
  status: string;
  component_instance_status_list: Array<string>;
};

export function canTaskStart(task: Task): boolean {
  return [TASK_STATUS.NOT_START].includes(task.status);
}

export function canTaskPause(task: Task): boolean {
  return [TASK_STATUS.ONGOING].includes(task.status);
}

export type BatchStateType = Awaited<ReturnType<typeof getBatchState>>;
export const BatchStateContext = createContext<BatchStateType>("Stop");
