import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Card from './Card/Card.jsx';

import './RecommendedItems.css';

import getRelatedItemsById from '../../../helperFunctions/App/getRelatedItemsById.js';
// import getProductById from '../../../helperFunctions/App/getProductById.js';

const RecommendedItems = ({
  currItem,
  setCurrId,
  setCurrItem,
  setCurrStyles,
  setCurrReviewMeta,
  setCurrAvgRating,
}) => {
  const [relatedItems, setRelatedItems] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  // const [cardsShifted, setCardsShifted] = useState(0);
  // const [showRightBtn, setShowRightBtn] = useState(true);
  const [reachMaxScroll, setReachMaxScroll] = useState(false);

  useEffect(() => {
    if (
      listRef.current &&
      scrollPosition + listRef.current.clientWidth + 100 >=
        listRef.current.scrollWidth
    ) {
      setReachMaxScroll(true);
    } else {
      setReachMaxScroll(false);
    }
  }, [scrollPosition]);
  /////////// Set up carousel
  const listRef = useRef(null);
  // const reachedMaxScrollWidth =
  //   scrollPosition + listRef.current.clientWidth >= listRef.current.scrollWidth;

  const scrollRight = () => {
    // Check to see if max scroll
    if (
      scrollPosition + listRef.current.clientWidth + 100 >=
      listRef.current.scrollWidth
    ) {
      setReachMaxScroll(true);
      return;
    }

    const newScrollPosition = scrollPosition + 220;
    setScrollPosition(newScrollPosition);

    // Scroll the list to the new position.
    if (listRef.current) {
      listRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    const newScrollPosition = scrollPosition - 220;
    setScrollPosition(newScrollPosition);
    if (listRef.current) {
      listRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };
  // Reset scroll position when currItem changes
  useEffect(() => {
    setScrollPosition(0);
  }, [currItem]);

  /// /////////// USE EFFECTS //////////////
  useEffect(() => {
    // Reset relateted items each time currItem is changed
    setRelatedItems(null);
    getRelatedItemsById(currItem.id)
      .then((data) => {
        setRelatedItems(data);
      })
      .catch((err) => {
        console.error(`There was an error: ${err}`);
      });
  }, [currItem]);

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!relatedItems) {
    return (
      <div className="items-comp--reco-container">
        <p style={{ fontSize: '2rem' }}>Loading...</p>;
      </div>
    );
  }

  if (!relatedItems || !Array.isArray(relatedItems)) {
    return (
      <div className="items-comp--reco_container">
        There are no related Products
      </div>
    );
  }

  /// /////////// DISPLAY ELEMENTS CREATION //////////////
  const cards = relatedItems.map((product) => (
    <Card
      productID={product}
      key={product}
      setCurrId={setCurrId}
      setCurrItem={setCurrItem}
      setCurrStyles={setCurrStyles}
      setCurrReviewMeta={setCurrReviewMeta}
      setCurrAvgRating={setCurrAvgRating}
    />
  ));
  let listWidth = 100;

  /// /////////// STYLES //////////////
  if (relatedItems.length > 3) {
    listWidth += (relatedItems.length - 3) * 30;
  }

  // /////////// JSX //////////////
  return (
    <>
      <h3 className="items-comp--reco-heading">RELATED PRODUCTS</h3>
      <div
        className={`items-comp--reco-container ${
          relatedItems.length > 2 ? 'fade' : ''
        }`}
      >
        {scrollPosition > 0 && (
          <button
            className="items-comp--reco-list_btn left"
            type="button"
            onClick={scrollLeft}
            aria-label="left-scroll"
          >
            <FaArrowLeft size="1rem" />
          </button>
        )}

        <ul
          className="items-comp--reco-list"
          // style={{ width: `${listWidth}%` }}
          ref={listRef}
        >
          {cards}
        </ul>
        {!reachMaxScroll && relatedItems.length > 3 && (
          <button
            className="items-comp--reco-list_btn right"
            aria-label="right-scroll"
            type="button"
            onClick={scrollRight}
          >
            <FaArrowRight size="1rem" />
          </button>
        )}
      </div>
    </>
  );
};

export default RecommendedItems;
