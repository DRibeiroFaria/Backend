export const UserQueries = {
  FindUser: `
  SELECT 
  * 
  FROM cocus_challenge.users where email = ?
  `,

  AddUser: `
  INSERT INTO cocus_challenge.users (username, email, pass, created_at, updated_at) 
  VALUES (?, ?, ?, ?, ?);
  `,
};