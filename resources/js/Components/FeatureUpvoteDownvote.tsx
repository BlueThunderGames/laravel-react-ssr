import { Feature } from "../types/";
import { useForm } from "@inertiajs/react";
import { useState } from 'react';

export default function FeatureUpvoteDownvote({feature} : {feature: Feature})
{
    const [userHasUpvoted, setUserHasUpvoted] = useState<boolean>(feature.user_has_upvoted);
    const [userHasDownvoted, setUserHasDownvoted] = useState<boolean>(feature.user_has_downvoted);
    const [upvoteCount, setUpvoteCount] = useState<number>(feature.upvote_count);

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
        if(userHasUpvoted || userHasDownvoted && !upvote) {
            upvoteForm.delete(route('upvote.destroy', feature.id),  {
                preserveScroll: true,

                onSuccess: () => {

                    if(userHasUpvoted)
                    {
                        setUpvoteCount(upvoteCount - 1);
                    }
                    else 
                    {
                        setUpvoteCount(upvoteCount + 1);
                    }
                    
                    setUserHasUpvoted(false);
                    setUserHasDownvoted(false);
                }
            });
        }
        else 
        {
            let form =null;

            if(upvote) 
            {
                form = upvoteForm;
            }
            else 
            {
                form = downvoteForm;
            }

            form.post(route('upvote.store', feature.id), {
                preserveScroll: true,

                onSuccess: () => {
                    if(form == upvoteForm)
                    {
                        if(!userHasUpvoted)
                        {
                            setUpvoteCount(upvoteCount + 1);
                        }
                        setUserHasUpvoted(true);
                        setUserHasDownvoted(false);                        
                    }

                    if(form == downvoteForm)
                    {
                        if(!userHasDownvoted)
                        {
                            setUpvoteCount(upvoteCount - 1);
                        }

                        setUserHasDownvoted(true);
                        setUserHasUpvoted(false);
                    }
                }
            });
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => upvoteDownVote(true)} className={userHasUpvoted ? 'text-amber-600' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
            </button>
            <span className={'text-2xl font-semibold ' + 
                (userHasUpvoted || userHasDownvoted ? 'text-amber-500' : '')}>
                {upvoteCount}
            </span>
            <button onClick={() => upvoteDownVote(false)} className={userHasDownvoted ? 'text-amber-600' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
    );
}