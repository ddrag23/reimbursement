export interface Permissions {
    name: string;
}
export interface Roles {
    id: number;
    name: string;
    permissions: Permissions[];
}
export interface User {
    id: number;
    name: string;
    email: string;
    roles: Roles[];
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: string;
    };
};
