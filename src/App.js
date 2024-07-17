import React, { useState } from 'react';
import Draggable from './DraggableComponnet';

const App = () => {
  const [components, setComponents] = useState([{ id: 0, title: 'Title (child)' }]);
  const [index, setIndex] = useState(1)

  const addParentView = () => {
    const newId = index;
    const newTitle = `Title (after click ${newId})`;
    setIndex(prev => prev + 1)
    setComponents(prevComponents => [{
      id: newId,
      title: newTitle,
      children: prevComponents
    }]);
  };

  const renderComponents = (components) => {
    if (!components || components.length === 0) return null;
    const { id, title, children } = components[0];
    return (
      <Draggable key={id} title={title}>
        {renderComponents(children)}
      </Draggable>
    );
  };

  return (
    <div>
      <button onClick={addParentView}>AddParent</button>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {renderComponents(components)}
      </div>
    </div>
  );
};

export default App;
