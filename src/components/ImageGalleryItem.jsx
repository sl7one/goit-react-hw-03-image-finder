import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgWrapper = styled.li`
  border-radius: 5px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  height: 150px;
  width: 250px;
  overflow: hidden;
  display: inline-block;
`;

const Img = styled.img`
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.1);
    cursor: zoom-in;
  }
`;

const ImageGalleryItem = ({ small, large, alt }) => {
  return (
    <ImgWrapper>
      <Img src={small} href={large} alt={alt} />
    </ImgWrapper>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  small: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
