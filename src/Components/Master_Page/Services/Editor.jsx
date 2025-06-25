// MyEditor.jsx
import React, { useRef, useState , useEffect } from 'react';
import JoditEditor from 'jodit-react';

const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    placeholder: 'Start typing...',
    height : 400,
//     toolbar: true,
//     buttons: [
//     'bold', 'italic', 'underline', 'strikethrough',
//     '|',
//     'ul', 'ol',
//     '|',
//     'font', 'fontsize', 'brush', 'paragraph',
//     '|',
//     'align', 'undo', 'redo',
//     '|',
//     'hr', 'eraser', 'copyformat',
//     '|',
//     'source' // show code view
//   ]
  };



   useEffect(() => {
    const savedContent = localStorage.getItem('jodit-editor-content');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save to localStorage when content changes
  const handleBlur = (newContent) => {
    setContent(newContent);
    localStorage.setItem('jodit-editor-content', newContent);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Rich Text Editor</h2>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
      //  onBlur={newContent => setContent(newContent)} // update state on blur
        onChange={newContent => {}}
         onBlur={handleBlur}
      />
      <div className="mt-4">
        <h3 className="text-md font-medium">Output HTML:</h3>
        <div className="border p-2 mt-2 bg-gray-100 rounded">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Editor;
