
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { FaPlus } from 'react-icons/fa';

function Foreground() {
    const ref = useRef(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [deleteError, setDeleteError] = useState(null); 


    
    useEffect(() => {
        async function fetchCards() {
            try {
                setLoading(true);
                setError(null); 
                setDeleteError(null);
                const response = await fetch('http:
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCards(data);
            } catch (e) {
                console.error("Failed to fetch cards:", e);
                setError("Failed to load card data. Please ensure the backend server is running.");
                setCards([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCards();
    }, []);

    
    const handleDeleteCard = async (cardId) => {
        setDeleteError(null); 
        try {
            const response = await fetch(`http:
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            
            setCards(prevCards => prevCards.filter(card => card.id !== cardId));
            
            
        } catch (err) {
            console.error("Failed to delete card:", err);
            setDeleteError(err.message || "Failed to delete card. Please try again.");
            
        }
    };


    if (loading) {
        return <div className="text-white text-center text-xl p-10">Loading cards...</div>;
    }

    
    if (error) {
        return <div className="text-red-500 text-center text-xl p-10">{error}</div>;
    }

    return (
        <>
            <Link
                to="/create"
                className="fixed bottom-6 right-6 z-[4] w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors duration-200"
                aria-label="Add new card"
            >
                <FaPlus size={24} />
            </Link>

            {}
            {deleteError && <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white p-3 rounded-md shadow-lg z-20">{deleteError}</div>}

            <div ref={ref} className='fixed top-0 left-0 w-full z-[3] h-full flex gap-10 flex-wrap p-5 pt-10'>
                {cards.length > 0 ? (
                    cards.map((item) => (
                        <Card 
                            data={item} 
                            reference={ref} 
                            key={item.id} 
                            onDelete={handleDeleteCard} 
                        />
                    ))
                ) : (
                    !loading && <div className="text-white text-center text-xl p-10">No cards to display.</div>
                )}
            </div>
        </>
    );
}

export default Foreground;