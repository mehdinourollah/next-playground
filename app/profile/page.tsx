"use client";
import { useUser, useUpdateUser, useUserForm } from '@/lib/hooks';

export default function ProfilePage() {
    const { data: user, isLoading, isError, error } = useUser();
    const mutation = useUpdateUser();

    const { register, handleSubmit, formState: { errors, isDirty } } = useUserForm(user);

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{error.message}</p>

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl mb-4">User Profile</h1>
            <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                <div>
                    <label>Name</label>
                    <input {...register('name')} className="border p-2 w-full" />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input {...register('email')} className="border p-2 w-full" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Phone (optional)</label>
                    <input {...register('phone')} className="border p-2 w-full" />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
                {isDirty && <button type="submit" disabled={mutation.isPending} className="bg-blue-500 text-white p-2">
                    {mutation.isPending ? 'Saving...' : 'Save'}
                </button>}
                {mutation.isError && <p className="text-red-500">Error updating</p>}
                {mutation.isSuccess && <p className="text-green-500">Updated!</p>}
            </form>

        </div>
    );
}