const ImageApi = (() => {
  const apiKey = 'O6pjTbPavg8ESXnWqd0nIaaZuMbG_vgko5QdryOSCt0';
  const defaultCity = 'London';
  let apiUrl = '';

  const getImage = async (city = '', desc = '') => {
    if (city === '') {
      apiUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${defaultCity}-${desc}`;
    } else {
      apiUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${city}-${desc}`;
    }

    const imageResponse = await fetch(`${apiUrl}`, { mode: 'cors' });
    const data = await imageResponse.json();
    return data;
  };

  return {
    getImage,
  };
})();

export default ImageApi;