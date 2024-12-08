import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
}); 

export const updateTaskSchema = createTaskSchema.partial(); //creates a partial schema from createTaskSchema were all properties are optional
