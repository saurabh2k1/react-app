export type Field ={
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    isRequired: boolean;
    placeholder?: string; // Optional property
  }
  
  const loginFields: Field[] = [
    {
      labelText: "Email address",
      labelFor: "email",
      id: "email",
      name: "email",
      type: "email",
      autoComplete: "email",
      isRequired: true,
      placeholder: "Email address",
    },
    {
      labelText: "Password",
      labelFor: "password",
      id: "password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
      isRequired: true,
      placeholder: "Password",
    },
  ];
  
  const signupFields: Field[] = [
    {
      labelText: "name",
      labelFor: "name",
      id: "name",
      name: "name",
      type: "text",
      autoComplete: "name",
      isRequired: true,
      placeholder: "Full Name",
    },
    {
      labelText: "Email address",
      labelFor: "email",
      id: "email",
      name: "email",
      type: "email",
      autoComplete: "email",
      isRequired: true,
      placeholder: "Email address",
    },
    {
      labelText: "Password",
      labelFor: "password",
      id: "password",
      name: "password",
      type: "password",
      autoComplete: "password",
      isRequired: true,
      placeholder: "Password",
    },
    {
      labelText: "Confirm Password",
      labelFor: "confirmPassword",
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      autoComplete: "confirmPassword",
      isRequired: true,
      placeholder: "Confirm Password",
    },
  ];

  const forgotFields: Field[] = [
    {
      labelText: "Email address",
      labelFor: "email",
      id: "email",
      name: "email",
      type: "email",
      autoComplete: "email",
      isRequired: true,
      placeholder: "Email address",
    }
  ];
  
  export { loginFields, signupFields, forgotFields };