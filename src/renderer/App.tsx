import './App.css';

import styled from 'styled-components';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { useMemo, useState } from 'react';
import { FilePathObjectCollection, IPCRendererEvents } from 'types';
import { Color } from './atomic/constants';
import Typography from './atomic/atoms/typography';
import useIPCEventListener from './hooks/electron/ipc';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Color.background};

  display: flex;

  border-top: 1px solid ${Color.borderTertiary};

  overflow: hidden;

  > :nth-child(1) {
    width: 250px;
    flex-shrink: 0;
    border-right: 1px solid ${Color.borderTertiary};
    background-color: ${Color.white};
    overflow-y: scroll;
  }

  > :nth-child(2) {
    width: 100%;
    background-color: ${Color.white};
  }

  * {
    color: ${Color.black};
  }
`;

const Home = () => {
  const [workingImages, setWorkingImages] = useState<FilePathObjectCollection>(
    {}
  );

  const workingImageNames = useMemo(
    () => Object.keys(workingImages),
    [workingImages]
  );

  useIPCEventListener(IPCRendererEvents.ADD_PATHS, (payload) => {
    setWorkingImages((state) => ({ ...state, ...payload }));
  });

  return (
    <Root>
      <div>
        {workingImageNames.map((imageName) => (
          <div key={imageName}> {imageName} </div>
        ))}
      </div>
      <div>
        <Typography> asdasdasd </Typography>
      </div>
    </Root>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
