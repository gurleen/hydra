import AnimationContainer from "@/frontend/components/animation-container";
import { Rect } from "@/frontend/components/rect";
import useGraphic from "@/frontend/util/use-graphic";
import type { GraphicDefinition } from "@/shared/graphic-definition";
import type { AnimationDefinition } from "@/shared/types";
import { z } from "zod";


export function BasketballScorebugComponent() {
  const { scope, controls, props } = useGraphic(BasketballScorebug);

  return (
    <div ref={scope}>
      <AnimationContainer controls={controls}>
        <div id="scorebug" className="w-full h-full flex">
          <Rect width={357} height={80} color={props.homeColor}></Rect>
        </div>
      </AnimationContainer>
    </div>
  );
}

type BasketballScorebugSchema = {
  homeColor: string;
}


const BasketballScorebug: GraphicDefinition<BasketballScorebugSchema> = {
  name: "BasketballScorebug",
  component: BasketballScorebugComponent,
  animation: {
    setup: [],
    stages: []
  },
  props: {
    homeColor: {
      id: "homeColor",
      displayName: "Home Color",
      type: "string",
      defaultValue: "#ffffff"
    }
  }
};

export default BasketballScorebug;
