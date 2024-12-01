import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PaginatedData, Feature } from '@/types';
import { Head } from '@inertiajs/react';
import FeatureItem from '@/Components/FeatureItem';

export default function Index({features}: {features: PaginatedData<Feature>}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Features
                </h2>
            }
        >
            <Head title="Dashboard" />            
                {features.data.map((feature) => (
                    <FeatureItem key={feature.id} feature={feature} />
                ))}
        </AuthenticatedLayout>
    );
}