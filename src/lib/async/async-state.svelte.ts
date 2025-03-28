type ClientCommand<T> = {
  run: () => Promise<T>;
  current: T | null;
  processing: boolean;
};

export function clientCommand<T>(command: () => Promise<T>): ClientCommand<T> {
  let current = $state<T | null>(null);
  let processing = $state(false);
  return {
    get processing() {
      return processing;
    },
    run: async () => {
      processing = true;
      current = await command();
      processing = false;
      return current;
    },
    get current() {
      return current;
    },
  };
}
