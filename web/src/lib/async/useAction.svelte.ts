export function useAction<T>(fn: () => Promise<T>) {
  let processing = $state(false);
  let error = $state<Error | null>(null);
  let data = $state<T | null>(null);

  async function run() {
    processing = true;
    error = null;
    data = null;
    try {
      data = await fn();
    } catch (err) {
      error = err as Error;
    } finally {
      processing = false;
    }
  }

  return {
    processing,
    error,
    data,
    run,
  };
}
