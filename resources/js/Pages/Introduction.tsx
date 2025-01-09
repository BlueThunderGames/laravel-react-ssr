import Guest from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Introduction() {
    return (
        <Guest
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Features App - Introduction
                </h2>
            }
        >
            <Head title="Introduction" />
            <div className="intro-upper mb-6">
                <h3 className="text-lg font-bold mb-4">Welcome to my Features App powered by React, TypeScript, and Laravel</h3>
                <p>This application allows users to interact with various Features, each with a title and description. Depending on your role, you have access to different functionality. Here's a breakdown of what each role can do:</p>
            </div>
            <div className="role-breakdown mb-6">
                <h4 className="font-bold">Admin</h4>
                <ul className="list-disc ml-6">
                    <li>Manage Users</li>
                    <li>Manage Features</li>
                    <li>Comment on Features</li>
                    <li>Upvote and Downvote Features</li>
                </ul>
            </div>
            <div className="role-breakdown mb-6">
                <h4 className="font-bold">Commenter</h4>
                <ul className="list-disc ml-6">
                    <li>Comment on Features</li>
                    <li>Upvote and Downvote Features</li>
                </ul>
            </div>
            <div className="role-breakdown mb-6">
                <h4 className="font-bold">User</h4>
                <ul className="list-disc ml-6">
                    <li>Upvote and Downvote Features</li>
                </ul>
            </div>
            <div className="credentials-wrapper">
                <div className="mb-4">
                    <h3 className="font-bold">Test the Application</h3>
                    <p>To help you explore the application, here are credentials for each user role:</p>
                </div>
                <div className="credential mb-6">
                    <h4 className="font-bold">Admin</h4>
                    <p>Email: admin@example.com</p> 
                    <p>Password: password</p>
                </div>
                <div className="credential mb-6">
                    <h4 className="font-bold">Commenter</h4>
                    <p>Email: commenter@example.com</p> 
                    <p>Password: password</p>
                </div>
                <div className="credential mb-6">
                    <h4 className="font-bold">User</h4>
                    <p>Email: user@example.com</p>
                    <p>Password: password</p>
                </div>
                <div className="block sm:flex items-start">
                    <Link
                        className="max-sm:block sm:inline-flex max-md:mb-4 text-center items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 false"
                        href={route('login')}
                    >Click here to Login</Link>
                    <a href="https://github.com/BlueThunderGames/laravel-react-ssr" className="max-md:block md:inline-flex text-center items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 false sm:ms-4" target="_blank">View Code</a>
                </div>
            </div>
        </Guest>
    );
}
