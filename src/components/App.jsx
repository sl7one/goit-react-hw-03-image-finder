import React from 'react';
import styled from 'styled-components';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { ThreeDots } from 'react-loader-spinner';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 40px;
  color: #010101;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
`;
const PP = 12;
const KEY = `31355844-a483d10f60d89145c2ddc6122`;

class App extends React.Component {
  state = {
    collection: [],
    query: '',
    currentPage: 1,
    modal: false,
    target: {},
    loader: false,
  };

  async componentDidMount() {
    this.setState({ loader: true });
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?page=${this.state.currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PP}`
      );
      this.setState({ collection: response.data.hits });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loader: false });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { query: prevQuery, currentPage: prevPage } = prevState;
    const { query: currentQuery, currentPage } = this.state;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ loader: true });
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PP}`
        );

        this.setState(prevState => ({
          collection: [...prevState.collection, ...response.data.hits],
        }));
      } catch (e) {
        console.log(e);
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  onEscPress = boollean => {
    this.setState({ modal: boollean });
  };

  onSubmit = value => {
    this.setState({
      query: value,
      currentPage: 1,
      collection: [],
      loader: true,
    });
  };

  onClickLoadMore = () => {
    this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  openItemInModal = event => {
    if (event.target.nodeName === 'IMG') {
      const { target } = event;
      this.setState({
        modal: true,
        target,
      });
    }
  };

  closeModal = event => {
    if (event.target.nodeName !== 'IMG') {
      this.setState({ modal: false });
    }
  };

  // uniqueItems = (newData, prevData) => {
  //   const prevIds = prevData.map(el => el.id);
  //   const result = newData.filter(el => {
  //     return !prevIds.includes(el.id);
  //   });
  //   return result;
  // };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.collection.length > 0 ? (
          <ImageGallery
            collection={this.state.collection}
            onClick={this.openItemInModal}
          />
        ) : (
          'Уточните поиск'
        )}

        {this.state.modal && (
          <Modal
            target={this.state.target}
            onClick={this.closeModal}
            onPressKey={this.onEscPress}
          />
        )}

        {this.state.loader && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}

        {this.state.collection.length > 0 ? (
          <Button onClick={this.onClickLoadMore} />
        ) : null}
      </Container>
    );
  }
}

export default App;
