import { User } from "./schema";

export async function fetchUser() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json() as Promise<User>;
}

export async function updateUser(data: User) {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to update');
    return res.json();
}