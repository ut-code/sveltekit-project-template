import { HelloService } from "@/services/sample.hello/hello.server.ts";
import { command } from "$app/server";

const helloService = new HelloService();

export const get = command(async () => {
  return await helloService.get();
});
export const sayHello = command(async () => {
  return await helloService.hello();
});
export const reset = command(async () => {
  return await helloService.reset();
});
