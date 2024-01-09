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
            <div ref={ref} className="relative w-full">
                <PlateContent
                    className={className}
                    // disableDefaultStyles
                    readOnly={disabled ?? readOnly}
                    aria-disabled={disabled}
                    {...props}
                />
            </div>
        );
    }
);
Editor.displayName = 'Editor';

export { Editor };
