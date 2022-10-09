export const UrlQueries = {
  
  GetAllURL: `
  SELECT
    id,
    shortened_url,
    url_code,
    long_url,
    count,
    created_at
  FROM cocus_challenge.url
  WHERE cocus_challenge.url.user_id = ?
  `,

  GetURLByCode: `
  CALL code_procedure(?, @response); 
  `,

  AddURL: `
  INSERT INTO cocus_challenge.url (shortened_url, url_code, long_url, user_id, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?);
  `,

  DeleteURLById: `
  DELETE FROM cocus_challenge.url
  WHERE id = ?
  `,
  GetCode:`
  SELECT
    *
  FROM cocus_challenge.url
  WHERE url_code = ?
  `,
  UpdateUrl:`
  UPDATE cocus_challenge.url
    SET url_code = ?, 
    shortened_url = ?,
    updated_at = ?
  WHERE id = ?;`
};