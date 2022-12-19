import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const Wrapper = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

class Modal extends React.Component {
  onEscPress = event => {
    console.log(event);
    if (event.code === 'Escape') {
      this.props.onPressKey(false);
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscPress);
  }

  render() {
    const { value } = this.props.target.attributes.href;
    return (
      <Overlay className="overlay" onClick={this.props.onClick}>
        <Wrapper className="modal">
          <img src={value} alt={this.props.target.alt} />
        </Wrapper>
      </Overlay>
    );
  }
}

export default Modal;

Modal.propTypes = {
  target: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onPressEsc: PropTypes.func,
};
