import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Radio from '@/Components/Radio';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';


export default function Edit({roles, user, roleLabels}: {roles: any, user: User, roleLabels: string[]}) {
    const { data, setData, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        roles: user.roles,
    });

    const updateuser: FormEventHandler = (event) => {
        event.preventDefault();
        
        router.put(route('user.update', user.id), data, {
            preserveScroll: true,
        });
    };

    const onRoleChange = (ev: any) => {
        if(ev.target.checked){
            setData('roles', [ev.target.value]);
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit user "{user.name}"
                </h2>
            }
        >
            <Head title={`Edit user ` + user.name} />            
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-4">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                    <form onSubmit={updateuser} className="w-full">
                        <div className="mb-8">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                disabled
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="mb-8">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                disabled
                                value={data.email}
                                onChange={(e) => setData('name', e.target.value)}
                                autoComplete="Email"
                            />
                        </div>
                        <div className="mb-8">
                            <InputLabel value="Role" />
                            {roles.map((role: any) => (
                                <label className="flex items-center mb-1" key={role.id}>
                                <Radio 
                                    name="roles"
                                    checked={data.roles.includes(role.name)} 
                                    value={role.name}
                                    onChange={onRoleChange}
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{roleLabels[role.name]}</span>
                                </label>
                            )) }
                            
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                    </form>               
                </div>
            </div>
        </AuthenticatedLayout>
    );
}