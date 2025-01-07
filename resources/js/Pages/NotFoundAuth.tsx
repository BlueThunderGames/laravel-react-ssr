import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function NotFoundAuth() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Features App - Page Not Found
                </h2>
            }
        >
            <Head title="Page Not Found" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 text-gray-900">
                        <div className="intro-upper">
                            <h3 className="text-lg font-bold mb-4">Error! Page Not Found!</h3>
                            <p>Sorry, the page you are looking for could not be found. Please check the URL in the address bar and try again.</p>
                        </div>
                    </div>
                </div> 
            </div>
        </AuthenticatedLayout>
    );
}