import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/stores/users';


describe('User Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useUserStore();
  });

  it('should return an empty users array initially', () => {
    expect(store.getUsers).toEqual([]);
  });



  it('should set the logged-in user correctly', () => {
    const username = 'testuser';
    const password = 'password123';

    store.createAccount(username, 'testuser@example.com', password);
    const loginSuccess = store.CheckLogUserIn(username, password);

    expect(loginSuccess).toBe(true);
    expect(store.getUserNameLoggedIn).toBe(username);
  });


});
