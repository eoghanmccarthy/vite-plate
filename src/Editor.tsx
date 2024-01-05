import { withProps } from '@udecode/cn';
import { createPlugins, Plate, PlateContent, PlateLeaf } from '@udecode/plate-common';
import { createBoldPlugin, MARK_BOLD, createCodePlugin, MARK_CODE } from '@udecode/plate-basic-marks';
// import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
// import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';

import { CodeLeaf } from './components/CodeLeaf'

const plugins = createPlugins(
    [createBoldPlugin(),createCodePlugin()

    ],
    {
        components: {
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_CODE]: CodeLeaf,
        },
    }
);

const initialValue = [
    {
        id: '1',
        type: 'p',
        children: [{ text: 'Hello, World!' }],
    },
];

export default function Editor() {
    return (
        <Plate plugins={plugins} initialValue={initialValue}>
            {/*<FixedToolbar>*/}
            {/*    <FixedToolbarButtons />*/}
            {/*</FixedToolbar>*/}
            <PlateContent />
        </Plate>
    );
}
