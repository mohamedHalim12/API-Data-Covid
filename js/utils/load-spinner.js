const useLoadSpinner = (spinnerParentClass = 'spinner-preloader') => {
  const spinner = document.querySelector(`.${spinnerParentClass}`);
  const spinnerObj = {
    show: () => spinner?.classList.remove('hidden'),
    hide: () => spinner?.classList.add('hidden'),
  };

  return spinnerObj;
};

export default useLoadSpinner;
