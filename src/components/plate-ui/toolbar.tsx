"use client";

import { useState, useEffect, Children } from "react";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn, withCn, withRef, withVariants } from "@udecode/cn";

import { Icons } from "@/components/icons";

import { Separator } from "./separator";
import { Toggle, toggleVariants } from "./toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "./tooltip";

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  "relative flex select-none items-stretch gap-1 bg-background",
);

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  "flex items-center",
);

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  "font-medium underline underline-offset-4",
);

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  "my-1 w-[1px] shrink-0 bg-border",
);

export const ToolbarButton = withRef<
  typeof ToolbarPrimitive.Button,
  Omit<ComponentPropsWithoutRef<typeof Toggle>, "type"> & {
    buttonType?: "button" | "toggle";
    isDropdown?: boolean;
    pressed?: boolean;
    tooltip?: ReactNode;
  }
>(
  (
    {
      children,
      className,
      isDropdown,
      pressed,
      size = "sm",
      tooltip,
      value,
      variant,
      ...props
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      setIsLoaded(true);
    }, []);

    const content =
      typeof pressed === "boolean" ? (
        <ToolbarToggleGroup type="single" value="single">
          <ToolbarToggleItem
            className={cn(
              toggleVariants({
                size,
                variant,
              }),
              isDropdown && "my-1 justify-between pr-1",
              className,
            )}
            ref={ref}
            value={pressed ? "single" : ""}
            {...props}
          >
            <div className="flex flex-1">{children}</div>
            <div>
              {isDropdown && (
                <Icons.arrowDown className="ml-0.5 h-4 w-4" data-icon />
              )}
            </div>
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          className={cn(
            toggleVariants({
              size,
              variant,
            }),
            isDropdown && "pr-1",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );

    return isLoaded && tooltip ? (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>

        <TooltipPortal>
          <TooltipContent>{tooltip}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    ) : (
      <>{content}</>
    );
  },
);

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toggleVariants,
  ["variant", "size"],
);

export const ToolbarGroup = withRef<
  "div",
  {
    noSeparator?: boolean;
  }
>(({ children, className, noSeparator }, ref) => {
  const childArr = Children.map(children, (c) => c);
  if (!childArr || childArr.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex", className)} ref={ref}>
      {!noSeparator && (
        <div className="h-full py-1">
          <Separator orientation="vertical" />
        </div>
      )}

      <div className="mx-1 flex items-center gap-1">{children}</div>
    </div>
  );
});
