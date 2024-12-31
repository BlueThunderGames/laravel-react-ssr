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
            <Head title="Features App Introduction" />
            <h3>Welcome to my Features App powered by React and Laravel</h3>
            <p>This application allows users to interact with various Features, each with a title and description. Depending on your role, you have access to different functionalities. Here's a breakdown of what each role can do:</p>
            <h4>Admin</h4>
            <ul>
                <li>Manage Users</li>
                <li>Manage Features</li>
                <li>Manage Comments</li>
                <li>Upvote and Downvote Features</li>
            </ul>
            <h4>Commenter</h4>
            <ul>
                <li>Comment on Features</li>
                <li>Upvote and Downvote Features</li>
            </ul>
            <h4>User</h4>
            <ul>
                <li>Upvote and Downvote Features</li>
            </ul>
            <h3>Test the Application</h3>
            <p>To help you explore the application, here are credentials for each user role:</p>
            <h4>Admin</h4>
            <p>Email: admin@example.com</p> 
            <p>Password: password</p>
            <h4>Commenter</h4>
            <p>Email: commenter@example.com</p> 
            <p>Password: password</p>
            <h4>User</h4>
            <p>Email: user@example.com</p>
            <p>Password: password</p>
        </Guest>
    );
}
