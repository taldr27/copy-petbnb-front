import PropTypes from 'prop-types';

const ModalHeader = (props) => {
  const { title, close } = props;
  return (
    <div className="modal-header">
      <h2>{title}</h2>
      <button onClick={close} type="button" className="btn btn-danger">X</button>
    </div>
  );
};

export default ModalHeader;

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
