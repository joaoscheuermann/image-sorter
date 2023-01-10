import styled from 'styled-components';

import {
  TSizeToUnitMap,
  Size,
  Unit,
  FontWeight,
  Color,
} from '../../constants/index';

export interface ITypographyProps {
  size?: Size;
  color?: Color;
  weight?: FontWeight;
}

export const typographyAvailableFontSizes: TSizeToUnitMap = {
  [Size.smallest]: Unit.big,
  [Size.small]: Unit.xbig,
  [Size.medium]: Unit.xxbig,
  [Size.big]: Unit.xxxbig,
  [Size.biggest]: Unit.xxxxbig,
};

export const typographyAvailableLineHeights: TSizeToUnitMap = {
  [Size.smallest]: 14,
  [Size.small]: 16.34,
  [Size.medium]: 18.67,
  [Size.big]: 23.34,
  [Size.biggest]: 42,
};

const Typography = styled.div<ITypographyProps>`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;

  font-size: ${({ size }) =>
    typographyAvailableFontSizes[size || Size.medium]}px;

  font-weight: ${({ weight }) => weight || FontWeight.regular};

  line-height: ${({ size }) =>
    typographyAvailableLineHeights[size || Size.medium]}px;

  color: ${({ color }) => color || Color.black};

  word-break: break-all;
`;

export default Typography;
