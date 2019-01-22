import axios from 'axios';

import { Phrase, PhraseWithoutId } from './phrasesTypes';

const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}/phrases` });

export function fetchPhrases(): Promise<{ err: string; data: Phrase[] }> {
  return api.get('').then(res => res.data);
}

export function createPhrase(phraseWithoutId: PhraseWithoutId): Promise<{ err: string }> {
  return api.post('', phraseWithoutId).then(res => res.data);
}

export function updatePhrase(phrase: Phrase): Promise<{ err: string }> {
  return api.put('', phrase).then(res => res.data);
}

export function deletePhrase(id: number): Promise<{ err: string }> {
  return api.delete(`/${id}`).then(res => res.data);
}
