export interface AddUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type Entity = {
  id: number;
};

export interface AddTemplateInput {
  name: string;
  description?: string;
  image: string;
  user: Entity;
}
