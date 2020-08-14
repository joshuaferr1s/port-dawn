import { writable } from 'svelte/store';

export const user = writable(null);

export const party = writable([]);
export const people = writable([]);
export const sessions = writable([]);
export const locations = writable([]);
export const items = writable([]);
export const history = writable([]);

export const processing = writable(false);

function createNotifications() {
  const { subscribe, set, update } = writable({
    visible: false,
    error: false,
    message: null,
  });

  return {
    subscribe,
    error: (message) => update(n => ({
      visible: true,
      error: true,
      message,
    })),
    success: (message) => update(n => ({
      visible: true,
      error: false,
      message,
    })),
    clear: () => update(n => ({
      ...n,
      visible: false,
    })),
  };
}

export const notifications = createNotifications();
