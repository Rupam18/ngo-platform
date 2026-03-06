import { z } from "zod";

try {
  z.string().parse(1);
} catch (error: any) {
  if (error instanceof z.ZodError) {
    console.log(error.errors);
  }
}
