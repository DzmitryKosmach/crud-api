import { v4 as uuid } from "uuid";

class User {
  id?: string;

  username: string;

  age: number;

  hobbies: Array<String>;

  constructor({
    id = uuid(),
    username = "Unknown user",
    age = 0,
    hobbies = [{}],
  } = {}) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies.map((hobby) => new String(hobby));
  }
}

export default User;
