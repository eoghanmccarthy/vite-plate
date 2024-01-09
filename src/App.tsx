import { TooltipProvider } from '@/components/plate-ui/tooltip';
import Editor from "./Editor.tsx";

function App() {
    return (
        <TooltipProvider
            disableHoverableContent
            delayDuration={500}
            skipDelayDuration={0}
        >
            <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                <Editor />
            </section>
        </TooltipProvider>
    )
}

export default App
