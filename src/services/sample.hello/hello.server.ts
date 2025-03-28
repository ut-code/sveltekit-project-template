function latency() {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 100 + 50);
  });
}

const SpecialHellos = new Map([
  [1, "first"],
  [2, "second"],
  [3, "third"],
]);

export class HelloService {
  count = 0;

  async get() {
    await latency();
    return {
      message: `You've said hello ${this.count} time(s)`,
      count: this.count,
    };
  }
  async hello() {
    await latency();
    this.count++;
    return {
      message: `That's your ${SpecialHellos.get(this.count) ?? `${this.count}th`} hello`,
      count: this.count,
    };
  }

  async reset() {
    await latency();
    const resp = {
      message: `You've reset count! it was ${this.count} before.`,
      count: this.count,
    };
    this.count = 0;
    return resp;
  }
}
