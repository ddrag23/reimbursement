import { User } from "@/types";

export default function can(user: User | undefined, permission: string) {
    const roles = user?.roles.map((item) => item.permissions);
    const permissions = roles?.map((item) => item.map((p) => p.name))[0];
    return permissions != undefined && permissions.includes(permission);
}
