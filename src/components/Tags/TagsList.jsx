import ReactDOM from 'react-dom';
import {usePopper} from 'react-popper';
import {COLORS} from '../../dataTags/COLORS';
import {Tag} from './Tag';

export const TagsList = ({
                           referenceElement,
                           popperElement,
                           selectRef,
                           activeTagId,
                           tags,
                           tagsRef,
                           showPopper,
                           setPopperElement,
                           setTags
                         }) => {
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'flip',
        options: {fallbackPlacements: ['top-end']}
      },
      {
        name: 'offset',
        options: {offset: [0, 5]}
      }
    ]
  });

  const changeTagColor = (color) => {
    if (selectRef.current) selectRef.current.focus();

    setTags((prevState) =>
      prevState.map((tag) => {
        if (tag.id === activeTagId) {
          tag = {...tag, color};
        }
        return tag;
      })
    );
  };

  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          key={tag.id}
          ref={(el) => (tagsRef.current[index] = el)}
          tag={tag}
          setTags={setTags}
        />
      ))}

      {showPopper
        ? ReactDOM.createPortal(
          <div
            className="ColorSelectPopUp"
            ref={setPopperElement}
            style={{
              ...styles.popper
            }}
            {...attributes.popper}
          >
            {COLORS.map((color) => (
              <ColorItem
                key={color}
                color={color}
                changeTagColor={changeTagColor}
              />
            ))}
          </div>,
          document.querySelector('#root')
        )
        : null}
    </>
  );
};

const ColorItem = ({color, changeTagColor}) => {
  return (
    <div className="ColorItem" onClick={() => changeTagColor(color)}>
      <div
        style={{
          backgroundColor: `${color}`,
          height: 16,
          width: 16,
          borderRadius: 8
        }}
      ></div>
    </div>
  );
};
