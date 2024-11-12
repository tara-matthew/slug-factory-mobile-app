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
    favourites_count: number;
    prints_count: number;
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
        avatar_url: user.avatar_url,
        profile_set_public_at: user.profile.set_public_at,
        username: user.username,
        name: user.name,
        favourites_count: user.favourites_count,
        prints_count: user.prints_count,
    };
}
