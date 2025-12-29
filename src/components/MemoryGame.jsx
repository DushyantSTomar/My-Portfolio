import React, { useState, useEffect } from 'react';
import styles from './MemoryGame.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ICONS = ['🚀', '💻', '⚛️', '🎨', '🎮', '📱', '🔥', '💡'];

const MemoryGame = ({ onClose }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    const initializeGame = () => {
        const duplicatedIcons = [...ICONS, ...ICONS];
        const shuffled = duplicatedIcons
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon }));

        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setWon(false);
        setDisabled(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleClick = (id) => {
        if (disabled || flipped.includes(id) || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
        } else {
            setFlipped([flipped[0], id]);
            setDisabled(true);
            checkForMatch(id);
        }
    };

    const checkForMatch = (secondId) => {
        const firstId = flipped[0];
        if (cards[firstId].icon === cards[secondId].icon) {
            setSolved((prev) => [...prev, firstId, secondId]);
            setFlipped([]);
            setDisabled(false);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            setWon(true);
        }
    }, [solved, cards]);

    return (
        <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className={styles.gameContainer}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <button className={styles.closeBtn} onClick={onClose}><X size={24} /></button>
                <h2>Memory Match</h2>

                <div className={styles.grid}>
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`${styles.card} ${flipped.includes(card.id) || solved.includes(card.id) ? styles.flipped : ''
                                } ${solved.includes(card.id) ? styles.matched : ''}`}
                            onClick={() => handleClick(card.id)}
                        >
                            {(flipped.includes(card.id) || solved.includes(card.id)) ? (
                                <span className={styles.cardContent}>{card.icon}</span>
                            ) : (
                                <span>❓</span>
                            )}
                        </div>
                    ))}
                </div>

                {won && (
                    <motion.div
                        className={styles.status}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p>🎉 You Won! 🎉</p>
                        <button onClick={initializeGame}>Play Again</button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default MemoryGame;
