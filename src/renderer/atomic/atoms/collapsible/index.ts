import React, { useState } from 'react';
import { Color } from 'renderer/atomic/constants';
import styled from 'styled-components';

export interface CollapsibleStateHook {
  opened: boolean;
  closed: boolean;
  toggle: () => void;
}

export function useCollapsibleState(): CollapsibleStateHook {
  const [state, setState] = useState(true);

  return {
    toggle: () => setState((bool) => !bool),
    closed: state === false,
    opened: state === true,
  };
}

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;

  height: 32px;

  padding: 0 12px;

  user-select: none;

  &:not(:last-child) {
    border-bottom: 1px solid ${Color.borderSecondary};
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  overflow-y: auto;

  /* > :not(:first-child) {
    margin-top: 4px;
  } */

  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export interface ItemProps {
  active?: boolean;
}

export const Item = styled.div<ItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 12px;

  cursor: pointer;

  background-color: ${({ active }) => (active ? '#ededed' : '#ffffff')};

  > :not(:first-child) {
    margin-left: 8px;
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#ededed' : '#f9f9f9')};
  }
`;

export interface TriggerProps {
  state: CollapsibleStateHook;
  children: React.ReactElement;
}

export const Trigger = ({ state, children }: TriggerProps) =>
  React.cloneElement(children, { onClick: () => state.toggle() });
