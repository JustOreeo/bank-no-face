const createAccountFields = [
    {
        labelText: "Name",
        labelFor: "name",
        id: "name",
        name: "name",
        type: "text",
        autoComplete: "name",
        isRequired: true,
        placeholder: "Name"
    },
    {
        labelText: "Email",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email"   
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"   
    },
    {
        labelText: "Balance",
        labelFor: "balance",
        id: "balance",
        name: "balance",
        type: "number",
        autoComplete: "balance",
        isRequired: true,
        placeholder: "Balance"
    },
]

export { createAccountFields };