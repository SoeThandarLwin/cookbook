import PropTypes from 'prop-types';

const TextField = (props) => (
  <>
    <div>
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900 uppercase"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={props.placeholder}
        onChange={props.handler}
        required={props.required}
        value={props.value}
      />
    </div>
  </>
);

export default TextField;

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handler: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
};
