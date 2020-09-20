const UIComponents = (() => {
  const getWrapper = (wrapperType, wrapperClass = '', wrapperId = '') => {
    const blockWrapper = document.createElement(`${wrapperType}`);

    if (wrapperClass === '') {
      blockWrapper.removeAttribute('class');
    } else {
      blockWrapper.className = `${wrapperClass}`;
    }

    if (wrapperId === '') {
      blockWrapper.removeAttribute('id');
    } else {
      blockWrapper.id = `${wrapperId}`;
    }

    return blockWrapper;
  };

  return {
    getWrapper,
  };
})();

export default UIComponents;