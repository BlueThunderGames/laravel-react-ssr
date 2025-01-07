import Guest from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function NotFoundGuest() {
    return (
        <Guest
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Features App - Page Not Found
                </h2>
            }
        >
            <Head title="Page Not Found" />
            <div className="intro-upper mb-6">
                <h3 className="text-lg font-bold mb-4">Error! Page Not Found!</h3>
                <p>Sorry, the page you are looking for could not be found. Please check the URL in the address bar and try again.</p>
            </div>
        </Guest>
    );
}
            