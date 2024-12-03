import { Feature } from "../types/";
import { useForm } from "@inertiajs/react";

export default function FeatureUpvoteDownvote({feature} : {feature: Feature})
{
    const upvoteForm = useForm(
        {
            upvote: true
        }
    );

    const downvoteForm = useForm(
        {
            upvote: false
        }
    );

    const upvoteDownVote = (upvote: boolean) => {
        if(feature.user_has_upvoted && upvote || feature.user_has_downvoted && !upvote) {
            return;
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button className={feature.user_has_upvoted ? 'text-amber-600' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
            </button>
            <span className={'text-2xl font-semibold ' + 
                (feature.user_has_upvoted || feature.user_has_downvoted ? 'text-amber-500' : '')}>
                {feature.upvote_count}
            </span>
            <button className={feature.user_has_downvoted ? 'text-amber-600' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
    );
}