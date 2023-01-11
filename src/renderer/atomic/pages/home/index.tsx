import styled from 'styled-components';
import React, { useState, useMemo, useCallback } from 'react';

import { FilePathObjectCollection, IPCRendererEvents } from 'types';

import { Color, FontWeight, Size } from 'renderer/atomic/constants';
import useIPCEventListener from 'renderer/hooks/electron/ipc';

import Typography from 'renderer/atomic/atoms/typography';
import * as Collapsible from 'renderer/atomic/atoms/collapsible';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Color.white};

  display: flex;

  border-top: 1px solid ${Color.borderTertiary};

  overflow: hidden;

  > :nth-child(1) {
    width: 250px;
    flex-shrink: 0;
    border-right: 1px solid ${Color.borderTertiary};
  }

  > :nth-child(2) {
    width: 100%;
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

  /**
   * Handles the current active item
   */
  const [current, setCurrent] = useState<string>('');

  const handleCollapsibleItemOnClick = useCallback((name: string) => {
    setCurrent(name);
  }, []);

  /**
   * Handles the selection of the items
   */
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxOnChange = useCallback(
    (name: string, event: React.SyntheticEvent<HTMLInputElement>) => {
      event.persist();

      const { checked } = event.currentTarget;

      if (checked && !selected.includes(name)) {
        setSelected((state) => [...state, name]);
      }

      if (!checked && selected.includes(name)) {
        setSelected((state) => state.filter((_selected) => _selected !== name));
      }
    },
    [selected]
  );

  useIPCEventListener(IPCRendererEvents.ADD_PATHS, (payload) => {
    setWorkingImages((state) => ({ ...state, ...payload }));

    // Sets a image active when some files are imported but only
    // if no other image is active
    if (!current) {
      const firstImageName = Object.keys(payload)[0];
      setCurrent(firstImageName);
    }
  });

  return (
    <Root>
      <div>
        <Collapsible.Root>
          <Collapsible.Header>
            <Typography weight={FontWeight.semibold} size={Size.small}>
              Files
            </Typography>
          </Collapsible.Header>
          <Collapsible.Body>
            {workingImageNames.map((name) => (
              <Collapsible.Item
                key={name}
                active={name === current}
                onClick={() => handleCollapsibleItemOnClick(name)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(name)}
                  onChange={(event) => handleCheckboxOnChange(name, event)}
                />
                <Typography size={Size.small}> {name} </Typography>
              </Collapsible.Item>
            ))}
          </Collapsible.Body>
        </Collapsible.Root>
      </div>
      <div>
        <Typography> One day it will be an image preview </Typography>
      </div>
    </Root>
  );
};

export default Home;
