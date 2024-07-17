import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DraggableContainer = styled.div`
  position: absolute;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  border: 1px solid black;
  background-color: white;
  cursor: grab;
  width: 80%;
  height: 80%;
  user-select: none;
  overflow: hidden;
`;

const TitleBar = styled.div`
  background: lightGray;
  padding: 10px;
  cursor: grab;
  user-select: none;
`;

const ContentArea = styled.div`
  padding: 10px;
  height: calc(100% - 40px);
  overflow: auto;
  position: relative;
  
`;

const Draggable = (props) => {
  const { children, title } = props;
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const draggableRef = useRef();

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) {
        setPosition(() => ({
          top: e.clientY - offset.y,
          left: e.clientX - offset.x,
        }));
      }
    };

    const onMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, offset.y, offset.x]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    const rect = draggableRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <DraggableContainer
      ref={draggableRef}
      position={position}
    >
      <TitleBar onMouseDown={onMouseDown}>
        {title}
      </TitleBar>
      <ContentArea>{children}</ContentArea>
    </DraggableContainer>
  );
};

export default Draggable;
