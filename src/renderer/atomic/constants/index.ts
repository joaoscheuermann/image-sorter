export enum Kind {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

export enum Size {
  biggest = 'biggest',
  big = 'big',
  medium = 'medium',
  small = 'small',
  smallest = 'smallest',
}

export enum State {
  active = 'active',
  default = 'default',
  inactive = 'inactive',
}

export enum Unit {
  zero = 0.0,
  one = 1.0,
  xxxsmall = 2.0,
  xxsmall = 4.0,
  xsmall = 6.0,
  small = 8.0,
  medium = 10.0,
  big = 12.0,
  xbig = 14.0,
  xxbig = 16.0,
  xxxbig = 18.0,
  xxxxbig = 20.0,
}

export enum FontWeight {
  light = '300',
  regular = '400',
  medium = '500',
  semibold = '600',
  bold = '700',
}

export enum Color {
  white = '#ffffff',
  black = '#000000',
  background = '#333333',
  borderPrimary = 'rgba(0, 0, 0, 0.2)',
  borderSecondary = 'rgba(0, 0, 0, 0.15)',
  borderTertiary = 'rgba(0, 0, 0, 0.1)',
}

export type TSizeToUnitMap = {
  [key in Size]: Unit;
};

export interface LooseObject {
  [key: string | number]: any;
}
