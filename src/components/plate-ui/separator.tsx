'use client';

import { Root } from '@radix-ui/react-separator';
import { withProps, withVariants } from '@udecode/cn';
import { cva } from 'class-variance-authority';

const separatorVariants = cva('shrink-0 bg-border', {
  defaultVariants: {
    orientation: 'horizontal',
  },
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
});

export const Separator = withVariants(
  withProps(Root, {
    decorative: true,
    orientation: 'horizontal',
  }),
  separatorVariants
);
