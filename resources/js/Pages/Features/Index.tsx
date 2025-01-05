import React, { useState, useEffect, useRef} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature } from '@/types';
import { Head, usePoll , Link} from '@inertiajs/react';
import FeatureItem from '@/Components/FeatureItem';
import {can} from '@/helpers';
import { PageProps } from '@/types';
import axios from 'axios';

const fetchFeatures = async (page: number) => {
    try {
        const response = await axios.get(route('feature.fetch', { page }));
        return response.data;
    } catch (error) {
        
        throw error;
    }
};

// This is different because we're using auth to get the user's data and passing features as a part of the PageProps
export default function Index({auth, features: initialFeatures, page: initialPage}: PageProps<{features: Feature[], page: number}>) {
    
    const [features, setFeatures] = useState(initialFeatures);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const loadMoreFeatures = async () => {
        setLoading(true);
        try {
            const data = await fetchFeatures(page + 1);
            setFeatures((prevFeatures) => [...prevFeatures, ...data.data]);
            setPage(data.meta.current_page);

            if(data.data.length === 0 || data.meta.current_page === data.meta.last_page)
            {
                setHasMore(false);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleObserver = (entities: IntersectionObserverEntry[]) => {
            const target = entities[0];

            if(target.isIntersecting && !loading && hasMore) {
                loadMoreFeatures();
            }
        };

        observer.current = new IntersectionObserver(handleObserver);

        if(observer.current && observer.current.observe)
        {
            observer.current.observe(document.getElementById('load-more-trigger') as Element);
        }

        return () => {
            if(observer.current && observer.current.disconnect)
            {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore]);


    usePoll(3000);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Features
                </h2>
            }
        >
            <Head title="Features" />  
            {can(auth.user, 'manage_features') && <div className="mb-8">
                <Link href={route('feature.create')} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300">
                    Create New Feature
                </Link>  
            </div>}
                    
                {features.map((feature) => (
                    <FeatureItem key={feature.id} feature={feature} />
                ))}
                <div id="load-more-trigger" className="h-1"></div>
                {loading && <p>Loading more features...</p>}
                {/* Beta Feature for Lazy Loading, check this in the future to see if it's working
                <WhenVisible fallback={<div>Loading..</div>} 
                    params={{
                        data: {page: page + 1},
                        only: ['features', 'page'],
                        //preserveUrl: true,

                }}>
                    This is visible
                </WhenVisible>
                */}
        </AuthenticatedLayout>
    );
}