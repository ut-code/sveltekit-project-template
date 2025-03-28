import { Hono } from "hono";

let count = 0;

const route = new Hono()
  .get("/", async (c) => {
    return c.json({
      message: `You've hello'ed ${count} time(s)`,
      count,
    });
  })
  .post("/", async (c) => {
    count++;
    return c.json({
      message: `That's your ${
        count === 1
          ? "first"
          : count === 2
            ? "second"
            : count === 3
              ? "third"
              : `${count}th`
      } hello`,
      count,
    });
  })
  .delete("/", async (c) => {
    const preCount = count;
    count = 0;
    return c.json({
      message: `You've reset count! it was ${preCount} before.`,
      count,
    });
  });

export default route;
