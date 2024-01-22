import {TodoData, TodoObject, TodoResponse } from './todo'
import axios from 'axios';

export const addTodo = async (requestBody: TodoObject) => {
    try {
      await axios.post<TodoData>(
        "https://calm-plum-jaguar-tutu.cyclic.app/todos",
        {
          todoName: requestBody.todoName,
          isComplete: requestBody.isComplete,
        }
      )
      location.reload()
    } catch (error) {
      console.error(error)
    }
  }

export const getTodos = async (id?:string): Promise<TodoData | TodoData[]> => {
    try {
      const { data } = await axios.get<TodoResponse>(
        `https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`
      );
      console.log(data);
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateTodo = async (id: string, isComplete: boolean) => {
    try {
      await axios.put(`https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`, {
        isComplete: isComplete,
      });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  export const deleteTodo = async (id: string) => {
    try {
      await axios.delete<TodoData>(
        `https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`
      );
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };