import {forwardRef, useCallback, useEffect} from 'react';
import {nanoid} from 'nanoid';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {components} from 'react-select';
import {TAGS} from '../../dataTags/TAGS';
import {COLORS} from '../../dataTags/COLORS';

export const TagsInputField = forwardRef(
  ({tags, setTags, setActiveTagId, setShowPopper}, ref) => {
    const addTag = (value) => setTags((prevState) => [...prevState, value]);

    const handleCreateOption = async (value) => {
      const additionalOption = createOption(value);

      addTag(additionalOption);

      setActiveTagId(additionalOption.id);
    };

    const listener = useCallback(
      (e) => {
        // if (e.key === 'Backspace') {
        //   setTags((prev) => prev.filter((_, i) => i !== tags.length - 1));
        //   if (ref.current) ref.current.focus();
        // }

        setShowPopper(false);
        setActiveTagId(null);
      },
      [ref, tags, setTags, setShowPopper, setActiveTagId]
    );

    useEffect(() => {
      if (ref.current) ref.current.focus();

      document.addEventListener('keydown', listener);

      return () => {
        document.removeEventListener('keydown', listener);
      };
    }, [ref, listener]);

    return (
      <AsyncCreatableSelect
        ref={ref}
        name="tags"
        value={{}}
        loadOptions={(value) => promiseOptions(value, tags)}
        menuPlacement={'auto'}
        components={{LoadingIndicator: null, Option, SinleValue}}
        classNamePrefix="select"
        placeholder=""
        styles={tagsListStyles}
        cacheOptions
        onCreateOption={handleCreateOption}
        onChange={addTag}
      />
    );
  }
);

const filterTags = (inputValue, tags) => {
  return TAGS.filter((x) => !tags.includes(x)).filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue, tags) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterTags(inputValue, tags));
    }, 1000);
  });

const createOption = (value) => ({
  id: nanoid(),
  value,
  label: value,
  color: COLORS[16]
});

const SinleValue = (props) => {
  const {data} = props;

  return (
    <components.SingleValue {...props}>
      <div className="Select-option">
        <span
          className="SelectColorSingleValue"
          style={{
            backgroundColor: data.color
          }}
        >
          {data.label}
        </span>
      </div>
    </components.SingleValue>
  );
};

const Option = (props) => {
  const {data} = props;

  return (
    <components.Option {...props}>
      <div className="Select-option">
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

const tagsListStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%'
  }),

  control: (provided, state) => ({
    ...provided,
    height: 46,
    minHeight: 28,
    width: '100%',
    fontSize: 16,
    borderRadius: 0,
    border: 'none',
    borderBottom: '1px solid #323232',
    padding: '0 0 0 8px',
    ':hover': {
      cursor: 'text'
    },
    'focus': {
      outline: '2px solid #b0b6f3',
      borderRadius: '10px'
    },
    backgroundColor: '#242424',
    color: '#fff',
    fontWeight: 600,
    fontFamily: 'Source Sans 3'
    // borderBottom: '1px solid #323232'
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none'
  }),

  indicatorContainer: (provided) => ({
    ...provided,
    padding: 3
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none'
  }),

  menu: (provided) => ({
    ...provided,
    boxShadow:
      '0 0 0 1px rgb(111 119 130 / 15%), 0 5px 20px 0 rgb(21 27 38 / 8%)',
    background: '#2B2B2B',
    width: '100%',
    boxSizing: 'border-box'
  }),

  option: (provided, {isSelected}) => ({
    ...provided,
    color: '#fff',
    fontSize: 14,
    minHeight: '36px',
    backgroundColor: '#2B2B2B',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#444444'
    }
  })
};
