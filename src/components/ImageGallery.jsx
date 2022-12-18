import PropTypes from 'prop-types';

import styled from 'styled-components';
import ImageGalleryItem from './ImageGalleryItem';
const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const ImageGallery = ({ collection, onClick }) => {
  // console.log(collection);
  return (
    <GalleryContainer onClick={onClick}>
      {collection.map(el => (
        <ImageGalleryItem
          key={el.id}
          small={el.webformatURL}
          large={el.largeImageURL}
          alt={el.tags}
        />
      ))}
    </GalleryContainer>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  collection: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
