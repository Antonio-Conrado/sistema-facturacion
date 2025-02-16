import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

type InputSearchProps<T> = {
    value: (keyof T)[]; // value is an array of keys from the T type (representing the fields to search in)
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
    // Get the cached data from the query client
    const queryClient = useQueryClient();
    const data: T[] = queryClient.getQueryData([dataCache])!;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const word = e.target.value.trim().toLowerCase();

        if (!word) return setFilteredResults(data); // If the search term is empty, return all data

        // Split the search term into individual words by spaces example:['name  surname']  result: ['name' , 'surname']
        const searchTerms = word.split(/\s+/);

        const filteredResults = data.filter((item) =>
            value.some((key) => {
                console.log(key);
                if (value.length > 1) {
                    // Concatenate the values of the keys in 'value' array (e.g., name + surname)
                    const concatenatedItemValue = value
                        .map((key) => item[key]) // Get each field value from the item 'Antonio' and 'Conrado'
                        .join(' '); // Join them with a space in between 'Antonio Conrado'

                    const cleanedItemValue =
                        concatenatedItemValue.toLowerCase();

                    // Check if all search terms are present in the concatenated value
                    return searchTerms.every((term) =>
                        cleanedItemValue.includes(term),
                    );
                } else {
                    const itemValue = item[key]; // For single value search

                    // Ensure the item value is a string and check if it includes the search term
                    return (
                        typeof itemValue === 'string' &&
                        searchTerms.every((term) =>
                            itemValue.toLowerCase().includes(term),
                        )
                    );
                }
            }),
        );

        setFilteredResults(filteredResults); // Store the filtered results in state
    };

    return (
        <div className="flex justify-center items-center gap-3">
            <input
                type="text"
                className="p-2 rounded-lg border-2 border-cyan-700 sm:w-64"
                placeholder={placeholder}
                onChange={handleSearch}
                name="word"
            />
        </div>
    );
}
