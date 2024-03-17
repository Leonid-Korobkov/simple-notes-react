import {useCallback, useEffect, useRef, useState} from 'react';
import {TAGS} from '../../dataTags/TAGS';
import {TagsList} from './TagsList';
import {TagsInputField} from './TagsInputField';
import './Tags.css'

export const Tags = () => {
  const [tags, setTags] = useState(TAGS.slice(0, 3));

  const [referenceElement, setReferenceElement] = useState(null);

  const [popperElement, setPopperElement] = useState(null);
  const [showPopper, setShowPopper] = useState(false);

  const [activeTagId, setActiveTagId] = useState(null);

  const tagsRef = useRef([]);

  useEffect(() => {
    if (activeTagId === null) return;

    if (tags.indexOf(tags.find((tag) => tag.id === activeTagId)) >= 0) {
      setReferenceElement(
        tagsRef.current[
          tags.indexOf(tags.find((tag) => tag.id === activeTagId))
          ]
      );
      setShowPopper(true);
    }
  }, [setShowPopper, tags, tagsRef, activeTagId]);

  const selectRef = useRef(null);

  const outsideClickHandler = useCallback(
    (event) => {
      if (!popperElement || popperElement.contains(event.target)) {
        return;
      }
      if (popperElement && !popperElement.contains(event.target)) {
        setShowPopper(false);
        setActiveTagId(null);
      }
    },
    [popperElement, setShowPopper, setActiveTagId]
  );

  useEffect(() => {
    if (popperElement) {
      document.addEventListener('mousedown', outsideClickHandler);
      return () => {
        document.removeEventListener('mousedown', outsideClickHandler);
      };
    }
  }, [popperElement, outsideClickHandler]);

  return (
    <div className="TaskTags">
      <TagsList
        referenceElement={referenceElement}
        popperElement={popperElement}
        selectRef={selectRef}
        activeTagId={activeTagId}
        tags={tags}
        tagsRef={tagsRef}
        showPopper={showPopper}
        setPopperElement={setPopperElement}
        setTags={setTags}
      />

      <TagsInputField
        ref={selectRef}
        tags={tags}
        setTags={setTags}
        setActiveTagId={setActiveTagId}
        setShowPopper={setShowPopper}
      />
    </div>
  );
};
