import {load,save as persist,wipe} from './storage.js';
export const state=load();
export const save=()=>persist(state);
export function reset(){Object.assign(state,wipe());save()}
