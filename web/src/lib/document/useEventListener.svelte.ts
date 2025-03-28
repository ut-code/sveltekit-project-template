export function useEventListener<NAME extends keyof DocumentEventMap>(
  event: NAME,
  callback: (event: DocumentEventMap[NAME]) => void,
) {
  $effect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback);
    };
  });
}
