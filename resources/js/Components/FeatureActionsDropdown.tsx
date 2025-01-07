import Dropdown from '@/Components/Dropdown';
import { Feature } from '@/types/';
import axios from 'axios';
import {can} from '@/helpers';
import { usePage } from '@inertiajs/react';

interface FeatureActionsDropdownProps {
    feature: Feature;
    onDelete: (id: number) => void;
}

const FeatureActionsDropdown: React.FC<FeatureActionsDropdownProps> = ({ feature, onDelete }) => {
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        onDelete(feature.id);
        
        try {
            await axios.post(route('feature.destroy', { feature: feature.id }), {
                _method: 'DELETE',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            
        } catch (error) {
            console.error(error);
        }
    };

    const user = usePage().props.auth.user;

    if(!can(user, 'manage_features'))
        return;

    return(
    <Dropdown>
        <Dropdown.Trigger>
            <span className="inline-flex rounded-md">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>


                    <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </span>
        </Dropdown.Trigger>
        <Dropdown.Content>
            
            <Dropdown.Link
                href={route('feature.edit', feature.id)}
            >
                Edit Feature
            </Dropdown.Link>
            <Dropdown.Link
                onClick={handleDelete}
                as="button"
                href="#"
            >
                Delete Feature
            </Dropdown.Link>
        </Dropdown.Content>

    </Dropdown>
    );
}

export default FeatureActionsDropdown;