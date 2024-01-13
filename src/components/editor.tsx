import React from 'react';
import { PlateContent } from '@udecode/plate-common';

import type { PlateContentProps } from '@udecode/plate-common';

export type EditorProps = PlateContentProps;

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
    (
        {
            className,
            disabled,
            readOnly,
            ...props
        },
        ref
    ) => {
        return (
            <div className="relative w-full" ref={ref}>
                <PlateContent
                    aria-disabled={disabled}
                    className={className}
                    // disableDefaultStyles
                    readOnly={disabled ?? readOnly}
                    {...props}
                />
            </div>
        );
    }
);
Editor.displayName = 'Editor';

export { Editor };
