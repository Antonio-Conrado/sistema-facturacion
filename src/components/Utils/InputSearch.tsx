import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

type InputSearchProps<T> = {
    value: (keyof T | string)[]; // 'value' is an array of keys from the T type (representing the fields to search in), allowing access through nested objects via strings.
    placeholder: string;
    dataCache: string;
    setFilteredResults: Dispatch<SetStateAction<T[]>>;
};

export default function InputSearch<T>({
    value,
    placeholder,
    dataCache,
    setFilteredResults,
}: InputSearchProps<T>) {
    const queryClient = useQueryClient();
    const data: T[] = queryClient.getQueryData([dataCache]) ?? [];

    // 'targetObject' is an individual element from the 'data' array.
    // 'path' is a string representing the nested path (example., 'address.city') used to access a specific property.
    const getPropertyValueByPath = (targetObject: any, path: string) => {
        return path
            .split('.')
            .reduce(
                (accumulatedValue, key) => accumulatedValue?.[key],
                targetObject,
            );
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const word = e.target.value.trim().toLowerCase();
        if (!word) return setFilteredResults(data);

        const searchTerms = word.split(/\s+/);

        const filteredResults = data.filter((item) =>
            value.some((key) => {
                const itemValue = getPropertyValueByPath(item, key.toString());

                // If the value is an array, check if any sub-item matches the search terms.
                if (Array.isArray(itemValue)) {
                    return itemValue.some((subItem) =>
                        searchTerms.every((term) =>
                            String(subItem).toLowerCase().includes(term),
                        ),
                    );
                }

                // Convert the value to a string and check if it matches all search terms.
                const stringValue = String(itemValue ?? '').toLowerCase();
                return searchTerms.every((term) => stringValue.includes(term));
            }),
        );
        setFilteredResults(filteredResults);
    };

    return (
        <div className="flex justify-center items-center gap-3 w-[90%] sm:w-fit">
            <input
                type="text"
                className="p-2 rounded-lg border-2 border-gray-300"
                style={{ width: `${placeholder.length * 8 + 10}px` }} // 8px per character, +10 for base width
                placeholder={placeholder}
                onChange={handleSearch}
                name="word"
            />
        </div>
    );
}
