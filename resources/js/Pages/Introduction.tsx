import Guest from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

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
                <h3 className="text-lg font-bold mb-4">Welcome to my Features App powered by React, Typescript, and Laravel</h3>
                <p>This application allows users to interact with various Features, each with a title and description. Depending on your role, you have access to different functionality. Here's a breakdown of what each role can do:</p>
            </div>
            <div className="role-breakdown mb-6">
                <h4 className="font-bold">Admin</h4>
                <ul className="list-disc ml-6">
                    <li>Manage Users</li>
                    <li>Manage Features</li>
                    <li>Manage Comments</li>
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
            </div>
        </Guest>
    );
}
