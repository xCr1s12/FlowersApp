export const mockMemories = [
  {
    id: "recuerdo-1",
    title: "Rosa",
    date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    text: "Felicidades",
    favorite: false,
  },
  {
    id: "recuerdo-2",
    title: "Lirio",
    date: "10/8/2020",
    text: "Felicidades",
    favorite: true,
    accent: "#F4B99A",
  },
];

const mockUsers = [
  {
    id: "usuario-demo-jose",
    username: "jose",
    email: "jose@flowersapp.com",
    password: "Flowers123",
    memories: mockMemories,
  },
  {
    id: "usuario-demo-pepito",
    username: "pepito",
    email: "pepito@flowersapp.com",
    password: "Flowers123!",
    memories: [],
  },
  {
    id: "usuario-demo-xcr1s21",
    username: "xCr1s21",
    email: "xcr1s21@flowersapp.com",
    password: "Flowers123!",
    memories: [],
  },
];

let currentMockUser = null;

export function getMockUsers() {
  return mockUsers;
}

export function isMockUsernameAvailable(username) {
  const normalizedUsername = username.trim().toLowerCase();
  return !mockUsers.some(
    (user) => user.username.toLowerCase() === normalizedUsername,
  );
}

export function isMockEmailAvailable(email) {
  const normalizedEmail = email.trim().toLowerCase();
  return !mockUsers.some((user) => user.email === normalizedEmail);
}

export function registerMockUser({ username, email, password }) {
  if (!isMockUsernameAvailable(username)) {
    throw new Error("Ese nombre de usuario ya está registrado.");
  }
  if (!isMockEmailAvailable(email)) {
    throw new Error("Ese correo electrónico ya está registrado.");
  }

  const user = {
    id: `usuario-${Date.now()}`,
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password,
    memories: [],
  };

  mockUsers.push(user);
  currentMockUser = user;
  return user;
}

export function loginMockUser(identifier, password) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const user = mockUsers.find(
    (candidate) =>
      candidate.username.toLowerCase() === normalizedIdentifier ||
      candidate.email === normalizedIdentifier,
  );

  if (!user || user.password !== password) {
    return null;
  }

  currentMockUser = user;
  return user;
}

export function getCurrentMockUser() {
  return currentMockUser;
}

export function getCurrentMockMemories() {
  return currentMockUser?.memories ?? [];
}

export function logoutMockUser() {
  currentMockUser = null;
}
