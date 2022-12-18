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
// axios.defaults.baseURL = `https://pixabay.com/api/?key=31355844-a483d10f60d89145c2ddc6122&q=`;

class App extends React.Component {
  state = {
    collection: [],
    query: '',
    currentPage: 1,
    modal: false,
    target: {},
    loader: true,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?page=${this.state.currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PP}`
      );
      this.setState({ collection: response.data.hits });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState(prevState => ({ loader: !prevState.loader }));
    }
  }

  async componentDidUpdate(_, prevState) {
    const { query: prevQuery, currentPage: prevPage } = prevState;
    const { query: currentQuery, currentPage } = this.state;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PP}`
        );
        // console.log(response.data.hits, this.state.collection);
        const result = this.uniqueItems(
          response.data.hits,
          this.state.collection
        );
        this.setState(prevState => ({
          collection: [...prevState.collection, ...result],
        }));
      } catch (e) {
        console.log(e);
      } finally {
        this.setState(prevState => ({ loader: !prevState.loader }));
      }
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { value } = event.target.elements.query;
    this.setState({
      query: value.toLowerCase(),
      currentPage: 1,
      collection: [],
      loader: true,
    });
  };

  onClickLoadMore = () => {
    this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
        loader: true,
      };
    });
  };

  openItemInModal = event => {
    // console.log(event);
    if (event.target.nodeName === 'IMG') {
      const { target } = event;
      this.setState(prevState => ({
        modal: !prevState.modal,
        target,
      }));
    }
  };

  closeModal = event => {
    if (event.target.nodeName !== 'IMG') {
      this.setState(prevState => ({ modal: !prevState.modal }));
    }
    // console.dir(event.target.nodeName);
  };

  onEscPress = event => {
    console.log(event);
  };

  uniqueItems = (newData, prevData) => {
    const prevIds = prevData.map(el => el.id);
    const result = newData.filter(el => {
      return !prevIds.includes(el.id);
    });
    return result;
  };

  render() {
    // console.log(this.state.collection.length);
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
            wrapperStyle={{}}
            wrapperClassName=""
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
