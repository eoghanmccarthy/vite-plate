'use client';

import { Provider, Root, Trigger, Portal, Content } from '@radix-ui/react-tooltip';
import { withCn, withProps } from '@udecode/cn';

export const TooltipProvider = Provider;
export const Tooltip = Root;
export const TooltipTrigger = Trigger;
export const TooltipPortal = Portal;

export const TooltipContent = withCn(
  withProps(Content, {
    sideOffset: 4,
  }),
  'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md'
);
