import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, updateUser } from './requests';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, User } from './schema';


export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });
}


export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    });
}


export function useUserForm(user?: User) {
    return useForm<User>({
        resolver: zodResolver(userSchema),
        values: user,
        mode: 'onChange',
    });
}

