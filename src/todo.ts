
export type TodoObject = Omit<TodoData, "createdAt" | "updatedAt" | "__v" | "_id">
export type TodoData = {
    isComplete: boolean;
    todoName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  export type TodoResponse = {
    code: number;
    data: TodoData[];
  };
