import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  const { user_id, name, roles } = jwtDecode(token);
  const decoded = { user_id, name, roles };
  return decoded;
}

export default decodeToken;