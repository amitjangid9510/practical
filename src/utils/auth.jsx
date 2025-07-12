
export function registerUser(newUser) {
  try {
    if (!newUser?.username || !newUser?.email || !newUser?.password) {
      throw new Error('Invalid user data');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.some(user => 
      user.username === newUser.username || user.email === newUser.email
    );
    
    if (userExists) {
      throw new Error('User already exists');
    }

    const userToStore = {
      ...newUser,
      password: `hashed_${newUser.password}_demo_only`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('users', JSON.stringify([...users, userToStore]));
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export function loginUser(username) {
  try {
    if (!username) throw new Error('Username required');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);
    
    if (!user) {
      throw new Error('User not found');
    }

    localStorage.setItem('currentUser', username);
    localStorage.setItem('lastLogin', new Date().toISOString());
    return true;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function getCurrentUser() {
  try {
    const username = localStorage.getItem('currentUser');
    if (!username) return null;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.username === username)?.username || null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export function logoutUser() {
  try {
    localStorage.removeItem('currentUser');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function isAuthenticated() {
  return !!getCurrentUser();
}