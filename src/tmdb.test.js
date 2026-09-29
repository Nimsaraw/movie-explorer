import { friendlyError } from './api/tmdb';

describe('friendlyError', () => {
  beforeEach(() => { process.env.REACT_APP_TMDB_API_KEY = 'test-key'; });

  test('explains a bad API key', () => {
    expect(friendlyError({ response: { status: 401 } })).toMatch(/API key/i);
  });
  test('explains a missing movie', () => {
    expect(friendlyError({ response: { status: 404 } })).toMatch(/could not be found/i);
  });
  test('explains being offline', () => {
    expect(friendlyError({})).toMatch(/internet connection/i);
  });
});
