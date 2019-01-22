import axios from 'axios';

import { PhraseCategory } from './phrasesCategoriesTypes';

const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}/phrasesCategories` });

export function fetchPhrasesCategories(): Promise<{ err: string; data: PhraseCategory[] }> {
  return api.get('').then(res => res.data);
}

export function createPhraseCategory(name: string): Promise<{ err: string }> {
  return api.post('', { name }).then(res => res.data);
}

export function updatePhraseCategory(phraseCategory: PhraseCategory): Promise<{ err: string }> {
  return api.put('', phraseCategory).then(res => res.data);
}

export function deletePhraseCategory(id: number): Promise<{ err: string }> {
  return api.delete(`/${id}`).then(res => res.data);
}
