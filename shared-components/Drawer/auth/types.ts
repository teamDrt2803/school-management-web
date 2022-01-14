export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = LoginFormData & {
  confirmPassword: string;
  displayName: string;
};
