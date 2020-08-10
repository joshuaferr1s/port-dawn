import { writable } from 'svelte/store';

export const user = writable(null);

export const party = writable([]);

export const dataLoading = writable(true);
