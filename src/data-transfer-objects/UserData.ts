import {IUser} from "../contracts/User";

export interface UserData {
    id: string;
    country: {
        id: string;
        name: string;
    };
    name: string;
    username: string;
    email: string;
    avatar_url?: string;
    profile: {
        bio: string;
        set_public_at?: string;
    };
}

export function fromResponse(user: UserData): IUser {
    return {
        id: user.id,
        bio: user.profile.bio,
        email: user.email,
        profile_set_public_at: user.profile.set_public_at,
        username: user.username,
        name: user.name,
    };
}
