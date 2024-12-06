import {Feature} from "../types";
import TextAreaInput from "./TextAreaInput";
import {useForm} from "@inertiajs/react";
import {FormEventHandler} from "react";
import PrimaryButton from "./PrimaryButton";

export default function NewCommentForm({feature} : {feature: Feature}) {
    const {
        data, 
        setData,
        post,
        processing
    } = useForm({
        comment: ''
    })

    const createComment: FormEventHandler = (ev) => {
        ev.preventDefault();
        
        post(route('comment.store', feature.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setData('comment', ''),
        })
    }
    return(
        <form onSubmit={createComment} className="flex items center py-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <TextAreaInput
                rows={1}
                value={data.comment}
                onChange={e => setData('comment', e.target.value)}
                className="mt-1 block w-full"
                placeholder="Your Comment Here"
            ></TextAreaInput>
            <PrimaryButton disabled={processing}>Comment</PrimaryButton>
        </form>
    );
};