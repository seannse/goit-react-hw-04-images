import css from './App.module.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from './API';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

const api = new API();

export function App() {
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (search) {
      fetchImages(search, page);
    }
  }, [search, page]);

  async function fetchImages(search, page) {
    try {
      setStatus('pending');
      setDisabled(true);

      api.query = search;
      api.page = page;
      const imagesObj = await api.getPhotos();
      const images = imagesObj.hits;

      if (!images.length) {
        setStatus('rejected');
        setMessage('Nothing found');
        return;
      }

      setImages(prevImages => [...prevImages, ...images]);
      setStatus('resolved');
      setTotalImages(imagesObj.totalHits);
    } catch (error) {
      setMessage(error.message);
      setStatus('rejected');
    } finally {
      setDisabled(false);
    }
  }

  function getQuery(value) {
    if (search.toLowerCase() !== value.toLowerCase()) {
      setSearch(value);
      setImages([]);
      setPage(1);
      setTotalImages(0);
      return;
    }

    toast.info('Your request has already been completed');
  }

  return (
    <div className={css.App}>
      <ToastContainer />
      <Searchbar getQuery={getQuery} disabled={disabled} />
      {images.length !== 0 && (
        <ImageGallery array={images} getLargeImage={setLargeImageURL} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <p style={{ textAlign: 'center' }}>{message}</p>
      )}
      {status === 'resolved' && images.length !== totalImages && (
        <Button
          loadMore={() => {
            setPage(prevPage => prevPage + 1);
          }}
        />
      )}
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          closeModal={() => {
            setLargeImageURL(null);
          }}
        />
      )}
    </div>
  );
}
