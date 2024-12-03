import {
    forwardRef,
    InputHTMLAttributes,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        className = '',
        rows = 2,
        ...props
    }: InputHTMLAttributes<HTMLTextAreaElement> & { rows: number },
    ref,
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    return (
        <textarea
            {...props}
            rows={rows}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ' +
                className
            }
            ref={localRef}
        ></textarea>
    );
});
