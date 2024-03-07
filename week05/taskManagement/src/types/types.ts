export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  dueDate: Date;
}

export type TaskObserver = {
  update: (task: Task, action: string) => void;
};
