import type { AnimationControls } from "@/shared/types";
import { Button, ButtonGroup } from "@blueprintjs/core";

type AnimationContainerProps = {
    children: React.ReactNode;
    controls: AnimationControls;
    debug?: boolean;
};

export default function AnimationContainer({ children, controls, debug }: AnimationContainerProps) {
    debug = debug ?? false;
    return (
        <>
            {debug && (
                <div className="flex m-5 gap-x-4">
                    <ButtonGroup>
                        <Button text="Play" disabled={!controls.canPlay()} onClick={controls.play} />
                        <Button text="Next" disabled={!controls.canNext()} onClick={controls.next} />
                        <Button text="Stop" disabled={!controls.canStop()} onClick={controls.stop} />
                        <Button text="Blank" intent="danger" onClick={controls.blank} />
                    </ButtonGroup>
                </div>
            )}
            <div style={{ position: 'absolute', width: 1920, height: 1080, backgroundColor: 'transparent', visibility: controls.ready() ? 'visible' : 'hidden' }}>
                {children}
            </div>
        </>
    );
}