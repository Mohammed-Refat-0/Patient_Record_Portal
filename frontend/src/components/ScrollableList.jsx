import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const ScrollableList = ({ items, renderItem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    if (!items || items.length === 0) {
        return <ListGroup.Item>N/A</ListGroup.Item>;
    }

    return (
        <div className="scrollable-list">
            <Button variant="secondary" size="sm" onClick={handlePrev} disabled={items.length <= 1}>
                &lt;
            </Button>
            {renderItem(items[currentIndex])}
            <Button variant="secondary" size="sm" onClick={handleNext} disabled={items.length <= 1}>
                &gt;
            </Button>
        </div>
    );
};

export default ScrollableList;
