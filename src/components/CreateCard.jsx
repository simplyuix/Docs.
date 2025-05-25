
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCard() {
    const navigate = useNavigate(); 

   
    const [desc, setDesc] = useState('');
    const [filesize, setFilesize] = useState('');
    const [tagTitle, setTagTitle] = useState('Download Now..');
    const [tagColor, setTagColor] = useState('green');
    const [tagIsOpen, setTagIsOpen] = useState(true);
    const [cardIsClosed, setCardIsClosed] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleAddCard = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const cardPayload = {
            desc,
            filesize,
            close: cardIsClosed,
            tag: {
                isOpen: tagIsOpen,
                tagTitle,
                tagColor,
            },
        };

        try {
            const response = await fetch('http://localhost:3001/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardPayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

          
            navigate('/'); 

        } catch (err) {
            console.error("Failed to add card:", err);
            setError(err.message || "Failed to add card. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-zinc-900 bg-opacity-90 z-[4] flex justify-center items-center p-5">
            <div className="p-6 bg-zinc-800 w-full max-w-lg rounded-lg shadow-xl relative">
                <button 
                    onClick={() => navigate('/')} 
                    className="absolute top-3 right-3 text-zinc-400 hover:text-white text-2xl"
                    aria-label="Close"
                >
                    &times; 
                </button>
                <h2 className="text-2xl text-white font-semibold mb-4 text-center">Create New Card</h2>
                <form onSubmit={handleAddCard} className="space-y-4">
                    <div>
                        <label htmlFor="desc" className="block text-sm font-medium text-zinc-300">Description:</label>
                        <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="filesize" className="block text-sm font-medium text-zinc-300">Filesize (e.g., .9mb):</label>
                        <input type="text" id="filesize" value={filesize} onChange={(e) => setFilesize(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="tagTitle" className="block text-sm font-medium text-zinc-300">Tag Title:</label>
                        <input type="text" id="tagTitle" value={tagTitle} onChange={(e) => setTagTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="tagColor" className="block text-sm font-medium text-zinc-300">Tag Color (e.g., green, blue, red):</label>
                        <input type="text" id="tagColor" value={tagColor} onChange={(e) => setTagColor(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="tagIsOpen" checked={tagIsOpen} onChange={(e) => setTagIsOpen(e.target.checked)} className="h-4 w-4 text-sky-600 border-zinc-600 rounded bg-zinc-700 focus:ring-sky-500" />
                        <label htmlFor="tagIsOpen" className="ml-2 block text-sm text-zinc-300">Tag is Open?</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="cardIsClosed" checked={cardIsClosed} onChange={(e) => setCardIsClosed(e.target.checked)} className="h-4 w-4 text-sky-600 border-zinc-600 rounded bg-zinc-700 focus:ring-sky-500" />
                        <label htmlFor="cardIsClosed" className="ml-2 block text-sm text-zinc-300">Card shows 'Close' icon?</label>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-sky-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Card'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default CreateCard;